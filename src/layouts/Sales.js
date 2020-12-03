import {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {renderRoutes} from 'react-router-config';

export default class SalesLayout extends PureComponent {
  static propTypes = {
    route: PropTypes.object.isRequired,
    sales: PropTypes.object.isRequired,
    getSales: PropTypes.func.isRequired,
    sale: PropTypes.object.isRequired,
    getSale: PropTypes.func.isRequired,
    submitSale: PropTypes.func.isRequired
  }

  render() {
    const {route, sales, sale, getSales, getSale, submitSale} = this.props;
    return (
      renderRoutes(route.routes, {
        sales,
		sale,
		getSale,
        getSales,
        submitSale
      })
    );
  }
}
