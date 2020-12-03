import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import {injectIntl, intlShape} from 'react-intl';
import ReactMarkdown from "react-markdown";
import {FaComments, FaHeart} from 'react-icons/fa';
import {AiOutlineHeart} from 'react-icons/ai';
import Comments from '../Comments';
//import Moment from "react-moment";

class SaleDetails extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    route: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    sale: PropTypes.object.isRequired,
    getSale: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
	this.state = {
      comments: [],
	  comment: "",
	  newRef: 0
	}
  }

  componentDidMount() {
    const {params} = this.props.match;		  
    this.request = this.props.getSale(params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sale && Object.keys(nextProps.sale).length > 0 && nextProps.sale.comments && nextProps.sale.comments.length > 0) {
      this.unflatten(nextProps.sale.comments)
	}
  }

  showReply = (id) => {
    let {comments} = this.state;
		  console.log(id);
    comments.map((comment, index) => {
      if (comment._id === id ) {
	    console.log(comment._id);
        comments[index].showReply = "show"
	  }
	});
	this.setState({comments}, () => {console.log(this.state.comments); this.forceUpdate()});
  }

  unflatten = (comments) => {
    var tree = [],
      mappedComments = {},
      commentElem,
      mappedElem; 

    // First map the nodes of the array to an object -> create a hash table.
    for(var i = 0, len = comments.length; i < len; i++) {
      commentElem = comments[i];
	  commentElem["showReply"] = "hide"
      mappedComments[commentElem._id] = commentElem;
      mappedComments[commentElem._id]['children'] = [];
    }

    for (var id in mappedComments) {
      if (mappedComments.hasOwnProperty(id)) {
        mappedElem = mappedComments[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.reply_to !== mappedElem.parent_id) {
          mappedComments[mappedElem['reply_to']]['children'].push(mappedElem);
        }
        // If the element is at the root level, add it to first level elements array.
        else {
          tree.push(mappedElem);
        }
      }
    }
    this.setState({comments: tree, newRef: 0});
    //return tree;
  } 

  handleChange = (event) => {
    this.setState({comment: event.target.value});
  }

  postComment = (e) => {
    let {newRef, comment, comments} = this.state;
    let id = newRef + 1;
	let newComment = {_id: `new_${id}`, status: 1, profile_picture: "https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg", user_name: "New User", review: comment, parent_id: `new_${id}`, reply_to: `new_${id}`, like_count: 0, children: []};
	comments = [...comments, newComment];
    comment = '';
	this.setState({comments, comment, newRef: id});
  }

  handleReply = (id, reply) => {
    let {comments} = this.state;
	console.log("rrrr");
    console.log(comments[id]);
  }

  handleLiking = (id, action) => {
    
  }

  render() {
    const {route, history, intl, sale} = this.props;
		  console.log("sssss");
		  console.log(sale);
    
	if (Object.keys(sale).length === 0) {
      return <div> Please wait... </div>
	}
    return (
    <div style={{margin: "2%"}}>
      <h2> {sale.Title} </h2>
      <div style={{display: "flex", width: "100%"}}>
        <div style={{width:"40%"}}>
		  <img src={`http://localhost:1337${sale.product_image[0].url}`} style={{width: "100%", height: "400px"}}/> 
		</div>
        <div style={{margin: "1%", display:"block", width: "60%"}}>
			<div> <span style={{fontWeight: "bold"}}>  Location: </span> {sale.Location} </div> <br />
			<div> <span style={{fontWeight: "bold"}}> When: </span> {sale.start_date} - {sale.end_date}</div> <br />
			<div> <span style={{fontWeight: "bold"}}>  What: </span> <ReactMarkdown source={sale.Description} /></div> 
			<div> 
              <FaComments style={{color: "#32cbcc", fontSize: 20, verticalAlign: "bottom"}}/> <span className="likecount"> <strong> {sale.comment_count} </strong> </span>
			  {sale.liked ? 
                <FaHeart style={{color: "#fff", borderColor: "#32cbcc", border: "1px solid #32cbcc", fontSize: 20}} onclick={(e) => this.handleLiking(sale.id, "unlike")} /> : 
			    <AiOutlineHeart style={{color: "#32cbcc", fontSize: 20, marginTop: "8px", verticalAlign: "bottom"}} onclick={(e) => this.handleLiking(sale.id, "like")}/>
			  }
			  {sale.like_count > 0 ?
			  <span className="likecount"> <strong> {sale.like_count} </strong> </span> : null}
			{/*<FaHeart style={{color: "#fff", borderColor: "#32cbcc", border: "1px solid #32cbcc", fontSize: 20}}/> <span> <strong> {sale.like_count} </strong> </span>*/}
			</div> 
		</div>
	  </div>
	  <div className="list_comment_section">
        <Comments comments={this.state.comments} handleReply={this.handleReply} showReply={this.showReply} />
	  </div>
	  <div className="add_comment_section">
	    <div className="add_comment">
		  <p> Post your comment </p>
          <textarea value={this.state.comment} onChange={(value) => this.handleChange(value) } />
		  <button className="btn-post btn-submit" onClick={(e) => this.postComment(e)}> Post </button>
		</div>
	  </div>
	</div>
	);
  }
}
export default injectIntl(SaleDetails);
