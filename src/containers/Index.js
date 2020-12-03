import {connect} from 'react-redux';

import IndexLayout from '../layouts/Index';

export const mapStateToProps = (state) => {
  return {};
};

const getData = () => {
  return (dispatch) => {
    //
  };
};

const IndexContainer = connect(
  mapStateToProps,
  {
    getData
  }
)(IndexLayout);

export default IndexContainer;
