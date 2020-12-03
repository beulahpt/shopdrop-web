import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {matchPath} from 'react-router';

import Sidebar, {SidebarContent} from '../sidebar';
import Tooltip from '../tooltip';

export default class Menu extends Component {
  static propTypes = {
    /** Leave all sub-menu's open */
    open: PropTypes.bool,
    /** Current Location stack */
    location: PropTypes.object.isRequired,
    /** Application Routes */
    routes: PropTypes.array.isRequired,
    /** Roles for current User */
    roles: PropTypes.array
  };

  static defaultProps = {
    open: false,
    roles: []
  }

  componentWillMount() {
    this.setNormalizedRoutes(this.props.routes, this.props.location);
  }

  componentWillReceiveProps(nextProps) {
    this.setNormalizedRoutes(nextProps.routes, nextProps.location);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.location.key !== nextProps.location.key;
  }

  setNormalizedRoutes(routes, location) {
    this.setState({
      routes: this.normalizeRoutes(routes, location)
    });
  }

  normalizeRoutes = (routes, location) => {
    return routes.reduce((acc, route) => {
      if (!route || !route.path) {
        return acc;
      }

      const selectedRoute = matchPath(location.pathname, route);
      const nestedRoutes = route.routes ? this.normalizeRoutes(route.routes, location) : null;
      let disabledSelected = false;
      let nestedSelected = false;

      if (nestedRoutes) {
        disabledSelected = nestedRoutes.filter((r) => {
          if (r.selected) {
            nestedSelected = true;
          }

          if (r.hasOwnProperty('menu')) {
            //Disabled but yet selected
            return !r.menu && r.selected;
          }

          return false;
        });
      }

      // Don't show route if route is protected and you don't have the role
      if (route.roles && !this.props.roles.some((r) => route.roles.includes(r))) {
        route.menu = false;
      }

      acc.push({
        ...route,
        enabled: route.hasOwnProperty('menu') ? route.menu : true,
        selected: disabledSelected.length > 0 || (selectedRoute ? selectedRoute.isExact : false),
        nestedSelected,
        routes: nestedRoutes
      });

      return acc;
    }, []);
  }

  render() {
    const {open} = this.props;
    const {routes} = this.state;

    return (
      <Sidebar>
        <SidebarContent primary>
          { // Build Expanded Menu
            routes.map(function(route) {
              if (route.enabled) {
                return (
                  <ul key={route.path} className="menu">
                    <li className={`menu-item ${route.selected ? "menu-selected" : ""}`}>
                      <Link to={route.index ? route.index.path : route.path}>
                        <div className="header text-truncate">
                          <i className={`${route.icon} px-2`} />
                          <span className={`text-smaller ${route.selected ? "text-dark" : "text-primary"}`} title={route.label}>{route.label}</span>
                        </div>
                      </Link>
                    </li>
                    {
                      route.routes ?
                        <ul className={`text-smaller nested-menu ${open || route.selected || route.nestedSelected ? "open" : ""}`}>
                          {
                            route.routes.map(function(nested) {
                              if (nested.enabled) {
                                return (
                                  nested.index ?
                                    null :
                                    <li key={nested.path} className={`p-relative text-primary nested-menu-item ${nested.roles ? 'nested-menu-protected' : ''} ${nested.selected ? 'nested-menu-selected' : ''}`}>
                                      <Link to={nested.path}>
                                        {nested.label}
                                      </Link>
                                      {
                                        nested.roles ?
                                          <span className="text-success text-large mr-2">
                                            <Tooltip position="right" trigger="hover" content={`${nested.roles.join(', ')}`}>
                                              <i className="fal fa-lock fa-pull-right"/>
                                            </Tooltip>
                                          </span>
                                          : null
                                      }
                                    </li>
                                );
                              }
                            })
                          }

                        </ul>
                        : null
                    }
                  </ul>
                );
              }
            })
          }
        </SidebarContent>
        <SidebarContent>
          { // Build Collapsed Menu
            routes.map(function(route) {
              if (route.enabled) {
                return (
                  <ul className="menu" key={route.path}>
                    <li className={`menu-item ${route.roles ? 'nested-menu-protected' : ''} ${route.selected || route.nestedSelected ? 'menu-selected' : ''}`}>
                      <div className="header text-center">
                        <Link to={route.path}>
                          {
                            route.tooltip ?
                              <Tooltip trigger="hover" content={route.tooltip}>
                                <i className={`${route.icon} px-2`} />
                              </Tooltip> : <i className={`${route.icon} px-2`} />
                          }
                        </Link>
                      </div>
                    </li>
                  </ul>
                );
              }
            })
          }
        </SidebarContent>
      </Sidebar>
    );
  }
}
