import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import {injectIntl, intlShape} from 'react-intl';
import {FaPlus} from 'react-icons/fa';

//import Moment from "react-moment";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-dropdown-timepicker';

class NewSale extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    route: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    submitSale: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
  }

  handleDateChange = (field, value) => {
	let state = this.state; 
	state[field] = value;
	this.setState(state);
  }

  handleChange = (field, event) => {
	let state = this.state;
	state[field] = event.target.value;
	this.setState(state);
  }
	
  submitSale = (e) => {
	e.preventDefault();
    const formData = new FormData();

    let state = this.state;
    let sale = {
      "Title": state.Title,
	  "Description": state.Description,
	  "Location": state.Location,
	  "Status": "Pending",
      "category": [{id: 1, name: state.category}],
	  "brand": state.brand,
	  "start_date": state.start_date,
      "end_date": state.end_date
	}

    if (state.product_image) {
       formData.append(`files.product_image`, state.product_image, state.product_image.name);
	}

    formData.append('data', JSON.stringify(sale));
	this.props.submitSale(formData);
  }

  handleFileChange = (field, e) => {
    let state = this.state;
    state[field] = e.target.files[0]
	this.setState(state);
  }

  render() {
    const {route, history, intl, sale} = this.props;
    const {Title, Location, Description, product_image, start_date, end_date, start_time, category, brand, end_time} = this.state;
    return (
    <div style={{margin: "2%"}}>
	  <form name="shopdrop_sale" id="shopdrop_sale">
	  <div style={{display: "flex", marginBottom: "1%"}}>
          <div style={{width: "90%"}}>
             <h2> Submit a Sales </h2>
           </div>
           <div style={{}}>
             <button className="btn-submit sm" onClick={(e) => {this.submitSale(e)}}> Submit Sale </button> 
            </div>
       </div>
	  <div className="col-12">
	    <div className="row" style={{marginBottom: "1%"}}>
          <div className="col-6">
            <label className="shopdrop-newsale"> Title </label> 
			<div>
              <input className="form-control" onChange={(e) => this.handleChange("Title", e)} value={this.state.Title} />
			</div>
	      </div>
	    </div>
	    <div className="row" style={{marginBottom: "1%"}}>
          <div className="col-6">
            <label className="shopdrop-newsale"> Product image </label> 
			<div>
                <input className="form-control fileinput" type="file" onChange={(e) => this.handleFileChange("product_image", e)} />
			</div>
			{/*
       	    <div>
       	      <div className="product_image">
			    <div className="file_add">
			    <div className="file_upload_icon">
                   <FaPlus />
			    </div>
			    </div>
			    <div className="file_inst"> <p className="file_inst"> Click to select an asset or drag & drop a file in this area </p> </div>
                <input className="form-control fileinput" type="file" />
			  </div>
			</div>*/}
	      </div>
          <div className="col-6">
            <label className="shopdrop-newsale"> Location </label> 
       	    <div className="">
              <input className="form-control" onChange={(e) => this.handleChange("Location", e)} value={this.state.Location} name="Location" />
			</div>
	      </div>
	    </div>
			
	    <div className="row" style={{marginBottom: "1%"}}>
          <div className="col-6">
            <label className="shopdrop-newsale"> Description </label> 
			<div className="col-12 d-flex p-0" >
              <input className="form-control" onChange={(e) => this.handleChange("Description", e)} value={this.state.Description} name="Description" />
			</div>
		  </div>
		</div>
	    <div className="row" style={{marginBottom: "1%"}}>
          <div className="col-6">
            <label className="shopdrop-newsale"> Start Date </label> 
			<div className="col-8 d-flex p-0" >
              <div className="col-6 p-0">
			    <DatePicker
			       name="start_date"
                   selected={this.state.start_date}
                   onChange={(date) => this.setState({start_date: date})}
                 />
			  </div>
              <div className="col-3">
			    <TimePicker onChange={(e) => this.handleDateChange("start_time", e)} value={this.state.start_time} name= "start_time"/>
			  </div>
			</div>
	      </div>
          <div className="col-6">
            <label className="shopdrop-newsale"> End Date </label> 
			<div className="col-8 d-flex p-0" >
              <div className="col-6 p-0">
			    <DatePicker
			       name="end_date"
                   selected={this.state.end_date}
                   onChange={(date) => this.setState({end_date: date})}
                />
			  </div>
              <div className="col-3">
			    <TimePicker onChange={(e) => this.handleDateChange("end_time", e)} time={this.state.end_time} name="end_time" />
			  </div>
			</div>
	      </div>
	    </div>

	    <div className="row" style={{marginBottom: "1%"}}>
          <div className="col-6">
            <label className="shopdrop-newsale"> Category </label> 
			<div className="col-12 d-flex p-0" >
              <input className="form-control" onChange={(e) => this.handleChange("category", e)} value={this.state.category} />
			</div>
		  </div>
          <div className="col-6">
            <label className="shopdrop-newsale"> Brand </label> 
			<div className="col-12 d-flex p-0" >
              <input className="form-control" onChange={(e) => this.handleChange("brand", e)} value={this.state.brand} name="brand"/>
			</div>
		  </div>
	    </div>
	  </div>
			</form>
	</div>
	);
  }
}
export default injectIntl(NewSale);
