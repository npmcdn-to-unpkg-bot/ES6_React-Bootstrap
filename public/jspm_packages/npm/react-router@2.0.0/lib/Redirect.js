/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  var _invariant = require('invariant');
  var _invariant2 = _interopRequireDefault(_invariant);
  var _RouteUtils = require('./RouteUtils');
  var _PatternUtils = require('./PatternUtils');
  var _PropTypes = require('./PropTypes');
  var _React$PropTypes = _react2['default'].PropTypes;
  var string = _React$PropTypes.string;
  var object = _React$PropTypes.object;
  var Redirect = _react2['default'].createClass({
    displayName: 'Redirect',
    statics: {
      createRouteFromReactElement: function createRouteFromReactElement(element) {
        var route = _RouteUtils.createRouteFromReactElement(element);
        if (route.from)
          route.path = route.from;
        route.onEnter = function(nextState, replace) {
          var location = nextState.location;
          var params = nextState.params;
          var pathname = undefined;
          if (route.to.charAt(0) === '/') {
            pathname = _PatternUtils.formatPattern(route.to, params);
          } else if (!route.to) {
            pathname = location.pathname;
          } else {
            var routeIndex = nextState.routes.indexOf(route);
            var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
            var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
            pathname = _PatternUtils.formatPattern(pattern, params);
          }
          replace({
            pathname: pathname,
            query: route.query || location.query,
            state: route.state || location.state
          });
        };
        return route;
      },
      getRoutePattern: function getRoutePattern(routes, routeIndex) {
        var parentPattern = '';
        for (var i = routeIndex; i >= 0; i--) {
          var route = routes[i];
          var pattern = route.path || '';
          parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;
          if (pattern.indexOf('/') === 0)
            break;
        }
        return '/' + parentPattern;
      }
    },
    propTypes: {
      path: string,
      from: string,
      to: string.isRequired,
      query: object,
      state: object,
      onEnter: _PropTypes.falsy,
      children: _PropTypes.falsy
    },
    render: function render() {
      !false ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, '<Redirect> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
    }
  });
  exports['default'] = Redirect;
  module.exports = exports['default'];
})(require('process'));
