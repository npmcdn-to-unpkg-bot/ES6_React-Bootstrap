/* */ 
'use strict';
var _extends = require('babel-runtime/helpers/extends')['default'];
var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];
exports.__esModule = true;
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _classnames = require('classnames');
var _classnames2 = _interopRequireDefault(_classnames);
var _utilsBootstrapUtils = require('./utils/bootstrapUtils');
var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);
var _reactPropTypesLibIsRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');
var _reactPropTypesLibIsRequiredForA11y2 = _interopRequireDefault(_reactPropTypesLibIsRequiredForA11y);
var Popover = _react2['default'].createClass({
  displayName: 'Popover',
  propTypes: {
    id: _reactPropTypesLibIsRequiredForA11y2['default'](_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),
    placement: _react2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    positionLeft: _react2['default'].PropTypes.number,
    positionTop: _react2['default'].PropTypes.number,
    arrowOffsetLeft: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
    arrowOffsetTop: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
    title: _react2['default'].PropTypes.node
  },
  getDefaultProps: function getDefaultProps() {
    return {
      placement: 'right',
      bsClass: 'popover'
    };
  },
  render: function render() {
    var _classes;
    var classes = (_classes = {}, _classes[_utilsBootstrapUtils2['default'].prefix(this.props)] = true, _classes[this.props.placement] = true, _classes);
    var style = _extends({
      'left': this.props.positionLeft,
      'top': this.props.positionTop,
      'display': 'block'
    }, this.props.style);
    var arrowStyle = {
      'left': this.props.arrowOffsetLeft,
      'top': this.props.arrowOffsetTop
    };
    return _react2['default'].createElement('div', _extends({role: 'tooltip'}, this.props, {
      className: _classnames2['default'](this.props.className, classes),
      style: style,
      title: null
    }), _react2['default'].createElement('div', {
      className: 'arrow',
      style: arrowStyle
    }), this.props.title ? this.renderTitle() : null, _react2['default'].createElement('div', {className: _utilsBootstrapUtils2['default'].prefix(this.props, 'content')}, this.props.children));
  },
  renderTitle: function renderTitle() {
    return _react2['default'].createElement('h3', {className: _utilsBootstrapUtils2['default'].prefix(this.props, 'title')}, this.props.title);
  }
});
exports['default'] = Popover;
module.exports = exports['default'];
