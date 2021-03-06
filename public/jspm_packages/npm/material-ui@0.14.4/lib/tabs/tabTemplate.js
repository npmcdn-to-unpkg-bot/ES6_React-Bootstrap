/* */ 
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabTemplate = function (_React$Component) {
  _inherits(TabTemplate, _React$Component);

  function TabTemplate() {
    _classCallCheck(this, TabTemplate);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TabTemplate).apply(this, arguments));
  }

  _createClass(TabTemplate, [{
    key: 'render',
    value: function render() {
      var styles = {
        height: 0,
        overflow: 'hidden',
        width: '100%',
        position: 'relative',
        textAlign: 'initial'
      };

      if (this.props.selected) {
        delete styles.height;
        delete styles.overflow;
      }

      return _react2.default.createElement(
        'div',
        { style: styles },
        this.props.children
      );
    }
  }]);

  return TabTemplate;
}(_react2.default.Component);

TabTemplate.propTypes = {
  children: _react2.default.PropTypes.node,
  selected: _react2.default.PropTypes.bool
};
exports.default = TabTemplate;
module.exports = exports['default'];