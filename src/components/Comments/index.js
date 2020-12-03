import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import {injectIntl, intlShape} from 'react-intl';
import {FaHeart} from 'react-icons/fa';
import {AiOutlineHeart} from 'react-icons/ai';
//import Moment from "react-moment";
//import {moment} from 'react-moment';
class Comments extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    route: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    comments: PropTypes.object.isRequired,
  };

  showReply = (id) => {
    console.log(id);
  }

  render() {
	const {comments, handleReply, showReply} = this.props; 
		  console.log("commentsssss");
		  console.log(comments);
	return(
    <div className="comments-output">
      {comments.length > 0 && comments.map((comment) =>
        <div id={`comment_${comment._id}`} key={comment._id}>
          <div className="comment">
            <div className="comment-from">
              <a> 
                <img src={comment.profile_picture} style={{width: "42px", height: "42px"}} />
			    <span> {comment.user_name} </span>
			  </a>
		    </div>
			<div style={{width: "50%", background: "#F2F3F5", borderRadius: "8px", marginLeft: "3%",padding: "10px"}}>
			  <span> {comment.review} </span>
			</div>
			<div className="comment-footer">
			  {/*<span> {moment("2018-09-04T18:30:00.000Z").fromNow()} </span>*/}
			  <span onClick={() => this.props.showReply(comment._id)} style={{marginLeft: "2%"}}> Reply </span>
              <span className="comment-date"> </span>
			  <a href="">
                <AiOutlineHeart style={{color: "#32cbcc", fontSize: 18, verticalAlign: "bottom"}}/>
			  </a>
			  {comment.like_count ?
                <span className="likecount"> {comment.like_count} </span>
				 : 
				 null
			  }
			</div>
			<div className={`reply_comment ${comment.showReply}`} id={`reply_${comment.parent_id}`} >
			  <div style={{width: "70%"}}>
                <textarea className="reply" id={`reply_${comment.parent_id}`} />
			  </div>
			  <div style={{marginLeft: "1%", marginTop: "1.5%"}}>
			    <button className="btn-post btn-submit" onClick={(e) => this.postComment(e)}> Post </button>
			  </div>
			</div>
		  </div>
			  {comment.children && comment.children.length > 0 ?
	    	<div className="comment-replies">
      		  <Comments comments={comment.children}  handleReply={handleReply} showReply={showReply}/> 
		    </div>
		    : null
			  }
		</div>
	  )}
	</div>
	);
  }
}
export default injectIntl(Comments);
