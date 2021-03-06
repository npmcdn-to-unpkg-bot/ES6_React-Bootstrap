/* */ 
(function(process) {
  'use strict';
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  var _reactDom = require('react-dom');
  var _reactDom2 = _interopRequireDefault(_reactDom);
  var _stylePropable = require('../mixins/style-propable');
  var _stylePropable2 = _interopRequireDefault(_stylePropable);
  var _events = require('../utils/events');
  var _events2 = _interopRequireDefault(_events);
  var _propTypes = require('../utils/prop-types');
  var _propTypes2 = _interopRequireDefault(_propTypes);
  var _menu = require('./menu');
  var _menu2 = _interopRequireDefault(_menu);
  var _getMuiTheme = require('../styles/getMuiTheme');
  var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);
  var _popover = require('../popover/popover');
  var _popover2 = _interopRequireDefault(_popover);
  var _warning = require('warning');
  var _warning2 = _interopRequireDefault(_warning);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0)
        continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
      target[i] = obj[i];
    }
    return target;
  }
  var IconMenu = _react2.default.createClass({
    displayName: 'IconMenu',
    propTypes: {
      anchorOrigin: _propTypes2.default.origin,
      children: _react2.default.PropTypes.node,
      className: _react2.default.PropTypes.string,
      closeOnItemTouchTap: _react2.default.PropTypes.bool,
      iconButtonElement: _react2.default.PropTypes.element.isRequired,
      iconStyle: _react2.default.PropTypes.object,
      menuStyle: _react2.default.PropTypes.object,
      onItemTouchTap: _react2.default.PropTypes.func,
      onKeyboardFocus: _react2.default.PropTypes.func,
      onMouseDown: _react2.default.PropTypes.func,
      onMouseEnter: _react2.default.PropTypes.func,
      onMouseLeave: _react2.default.PropTypes.func,
      onMouseUp: _react2.default.PropTypes.func,
      onRequestChange: _react2.default.PropTypes.func,
      onTouchTap: _react2.default.PropTypes.func,
      open: _react2.default.PropTypes.bool,
      style: _react2.default.PropTypes.object,
      targetOrigin: _propTypes2.default.origin,
      touchTapCloseDelay: _react2.default.PropTypes.number
    },
    contextTypes: {muiTheme: _react2.default.PropTypes.object},
    childContextTypes: {muiTheme: _react2.default.PropTypes.object},
    mixins: [_stylePropable2.default],
    getDefaultProps: function getDefaultProps() {
      return {
        closeOnItemTouchTap: true,
        open: null,
        onItemTouchTap: function onItemTouchTap() {},
        onKeyboardFocus: function onKeyboardFocus() {},
        onMouseDown: function onMouseDown() {},
        onMouseLeave: function onMouseLeave() {},
        onMouseEnter: function onMouseEnter() {},
        onMouseUp: function onMouseUp() {},
        onTouchTap: function onTouchTap() {},
        onRequestChange: function onRequestChange() {},
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'left'
        },
        targetOrigin: {
          vertical: 'top',
          horizontal: 'left'
        },
        touchTapCloseDelay: 200
      };
    },
    getInitialState: function getInitialState() {
      if (process.env.NODE_ENV !== 'production') {
        this._warningIfNeeded();
      }
      return {
        muiTheme: this.context.muiTheme || (0, _getMuiTheme2.default)(),
        iconButtonRef: this.props.iconButtonElement.props.ref || 'iconButton',
        menuInitiallyKeyboardFocused: false,
        open: false
      };
    },
    getChildContext: function getChildContext() {
      return {muiTheme: this.state.muiTheme};
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
      if (process.env.NODE_ENV !== 'production') {
        this._warningIfNeeded();
      }
      var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
      this.setState({muiTheme: newMuiTheme});
      if (nextProps.open === true || nextProps.open === false) {
        this.setState({open: nextProps.open});
      }
    },
    componentWillUnmount: function componentWillUnmount() {
      if (this._timeout)
        clearTimeout(this._timeout);
    },
    _warningIfNeeded: function _warningIfNeeded() {
      if (this.props.hasOwnProperty('open')) {
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(this.props.hasOwnProperty('closeOnItemTouchTap'), 'closeOnItemTouchTap has been deprecated in favor of open, onRequestChange') : undefined;
      }
    },
    isOpen: function isOpen() {
      return this.state.open;
    },
    close: function close(reason, isKeyboard) {
      var _this = this;
      if (!this.state.open) {
        return;
      }
      if (this.props.open !== null) {
        this.props.onRequestChange(false, reason);
      }
      this.setState({open: false}, function() {
        if (isKeyboard) {
          var iconButton = _this.refs[_this.state.iconButtonRef];
          _reactDom2.default.findDOMNode(iconButton).focus();
          iconButton.setKeyboardFocus();
        }
      });
    },
    open: function open(reason, event) {
      if (this.props.open !== null) {
        this.props.onRequestChange(true, reason);
        return this.setState({
          menuInitiallyKeyboardFocused: _events2.default.isKeyboard(event),
          anchorEl: event.currentTarget
        });
      }
      this.setState({
        open: true,
        menuInitiallyKeyboardFocused: _events2.default.isKeyboard(event),
        anchorEl: event.currentTarget
      });
      event.preventDefault();
    },
    _handleItemTouchTap: function _handleItemTouchTap(event, child) {
      var _this2 = this;
      if (this.props.closeOnItemTouchTap) {
        (function() {
          var isKeyboard = _events2.default.isKeyboard(event);
          _this2._timeout = setTimeout(function() {
            if (!_this2.isMounted()) {
              return;
            }
            _this2.close(isKeyboard ? 'enter' : 'itemTap', isKeyboard);
          }, _this2.props.touchTapCloseDelay);
        })();
      }
      this.props.onItemTouchTap(event, child);
    },
    _handleMenuEscKeyDown: function _handleMenuEscKeyDown(event) {
      this.close('escape', event);
    },
    render: function render() {
      var _this3 = this;
      var _props = this.props;
      var anchorOrigin = _props.anchorOrigin;
      var className = _props.className;
      var closeOnItemTouchTap = _props.closeOnItemTouchTap;
      var iconButtonElement = _props.iconButtonElement;
      var iconStyle = _props.iconStyle;
      var onItemTouchTap = _props.onItemTouchTap;
      var onKeyboardFocus = _props.onKeyboardFocus;
      var onMouseDown = _props.onMouseDown;
      var onMouseLeave = _props.onMouseLeave;
      var onMouseEnter = _props.onMouseEnter;
      var onMouseUp = _props.onMouseUp;
      var onTouchTap = _props.onTouchTap;
      var menuStyle = _props.menuStyle;
      var style = _props.style;
      var targetOrigin = _props.targetOrigin;
      var other = _objectWithoutProperties(_props, ['anchorOrigin', 'className', 'closeOnItemTouchTap', 'iconButtonElement', 'iconStyle', 'onItemTouchTap', 'onKeyboardFocus', 'onMouseDown', 'onMouseLeave', 'onMouseEnter', 'onMouseUp', 'onTouchTap', 'menuStyle', 'style', 'targetOrigin']);
      var _state = this.state;
      var open = _state.open;
      var anchorEl = _state.anchorEl;
      var styles = {
        root: {
          display: 'inline-block',
          position: 'relative'
        },
        menu: {position: 'relative'}
      };
      var mergedRootStyles = this.mergeStyles(styles.root, style);
      var mergedMenuStyles = this.mergeStyles(styles.menu, menuStyle);
      var iconButton = _react2.default.cloneElement(iconButtonElement, {
        onKeyboardFocus: this.props.onKeyboardFocus,
        iconStyle: this.mergeStyles(iconStyle, iconButtonElement.props.iconStyle),
        onTouchTap: function onTouchTap(e) {
          _this3.open(_events2.default.isKeyboard(e) ? 'keyboard' : 'iconTap', e);
          if (iconButtonElement.props.onTouchTap)
            iconButtonElement.props.onTouchTap(e);
        },
        ref: this.state.iconButtonRef
      });
      var menu = _react2.default.createElement(_menu2.default, _extends({}, other, {
        animateOpen: true,
        initiallyKeyboardFocused: this.state.menuInitiallyKeyboardFocused,
        onEscKeyDown: this._handleMenuEscKeyDown,
        onItemTouchTap: this._handleItemTouchTap,
        zDepth: 0,
        style: mergedMenuStyles
      }), this.props.children);
      return _react2.default.createElement('div', {
        className: className,
        onMouseDown: onMouseDown,
        onMouseLeave: onMouseLeave,
        onMouseEnter: onMouseEnter,
        onMouseUp: onMouseUp,
        onTouchTap: onTouchTap,
        style: this.prepareStyles(mergedRootStyles)
      }, iconButton, _react2.default.createElement(_popover2.default, {
        anchorOrigin: anchorOrigin,
        targetOrigin: targetOrigin,
        open: open,
        anchorEl: anchorEl,
        childContextTypes: this.constructor.childContextTypes,
        useLayerForClickAway: false,
        onRequestClose: this.close,
        context: this.context
      }, menu));
    }
  });
  exports.default = IconMenu;
  module.exports = exports['default'];
})(require('process'));
