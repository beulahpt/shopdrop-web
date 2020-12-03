import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import {injectIntl, intlShape} from 'react-intl';

//import Moment from "react-moment";

class SalesIndex extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    route: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    sales: PropTypes.object.isRequired,
    getSales: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.request = this.props.getSales();
  }

  render() {
    const {route, history, intl, sales} = this.props;
		  console.log("sssss");
		  console.log(sales);
    return (
      <div style={{margin: "2%"}}>
        <div style={{display: "flex", marginBottom: "1%"}}>
          <div style={{width: "90%"}}>
             <h2> Sample Sales </h2>
		   </div>
           <div style={{}}>
		     <button className="btn-submit sm" onClick={(e) => {this.props.history.push(`/sales/new`);}}> New Sale </button> 
			</div>
	     </div>
		 <div className="row" >
			{sales.results.map((sale, index) =>
			   <div className="col-4" onClick={(e) => {this.props.history.push(`/sales/${sale.id}`);}} style={{padding: "0px"}}>
                <h4>{sale.Title}</h4>
					{sale.product_image.length > 0 ?
				<img src={`http://localhost:1337${sale.product_image[0].url}`} style={{width: "80%",height: "250px"}} /> : null}
				<span>
					{//<Moment format="MMM Do YYYY">{sale.start_date}</Moment>
					}
                </span>
			  </div>
			)}
		</div>
	  </div>
	);
  }
}
export default injectIntl(SalesIndex);
