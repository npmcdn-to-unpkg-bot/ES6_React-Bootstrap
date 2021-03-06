/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactDom = require('react-dom');
var _reactDom2 = _interopRequireDefault(_reactDom);
var _stylePropable = require('../mixins/style-propable');
var _stylePropable2 = _interopRequireDefault(_stylePropable);
var _getMuiTheme = require('../styles/getMuiTheme');
var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);
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
var Table = _react2.default.createClass({
  displayName: 'Table',
  propTypes: {
    allRowsSelected: _react2.default.PropTypes.bool,
    bodyStyle: _react2.default.PropTypes.object,
    children: _react2.default.PropTypes.node,
    className: _react2.default.PropTypes.string,
    fixedFooter: _react2.default.PropTypes.bool,
    fixedHeader: _react2.default.PropTypes.bool,
    footerStyle: _react2.default.PropTypes.object,
    headerStyle: _react2.default.PropTypes.object,
    height: _react2.default.PropTypes.string,
    multiSelectable: _react2.default.PropTypes.bool,
    onCellClick: _react2.default.PropTypes.func,
    onCellHover: _react2.default.PropTypes.func,
    onCellHoverExit: _react2.default.PropTypes.func,
    onRowHover: _react2.default.PropTypes.func,
    onRowHoverExit: _react2.default.PropTypes.func,
    onRowSelection: _react2.default.PropTypes.func,
    selectable: _react2.default.PropTypes.bool,
    style: _react2.default.PropTypes.object,
    wrapperStyle: _react2.default.PropTypes.object
  },
  contextTypes: {muiTheme: _react2.default.PropTypes.object},
  childContextTypes: {muiTheme: _react2.default.PropTypes.object},
  mixins: [_stylePropable2.default],
  getDefaultProps: function getDefaultProps() {
    return {
      allRowsSelected: false,
      fixedFooter: true,
      fixedHeader: true,
      height: 'inherit',
      multiSelectable: false,
      selectable: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme || (0, _getMuiTheme2.default)(),
      allRowsSelected: this.props.allRowsSelected
    };
  },
  getChildContext: function getChildContext() {
    return {muiTheme: this.state.muiTheme};
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },
  getTheme: function getTheme() {
    return this.state.muiTheme.table;
  },
  getStyles: function getStyles() {
    var styles = {
      root: {
        backgroundColor: this.getTheme().backgroundColor,
        padding: '0 ' + this.state.muiTheme.rawTheme.spacing.desktopGutter + 'px',
        width: '100%',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        tableLayout: 'fixed',
        fontFamily: this.state.muiTheme.rawTheme.fontFamily
      },
      bodyTable: {
        height: this.props.fixedHeader || this.props.fixedFooter ? this.props.height : 'auto',
        overflowX: 'hidden',
        overflowY: 'auto'
      },
      tableWrapper: {
        height: this.props.fixedHeader || this.props.fixedFooter ? 'auto' : this.props.height,
        overflow: 'auto'
      }
    };
    return styles;
  },
  isScrollbarVisible: function isScrollbarVisible() {
    var tableDivHeight = _reactDom2.default.findDOMNode(this.refs.tableDiv).clientHeight;
    var tableBodyHeight = _reactDom2.default.findDOMNode(this.refs.tableBody).clientHeight;
    return tableBodyHeight > tableDivHeight;
  },
  _createTableHeader: function _createTableHeader(base) {
    return _react2.default.cloneElement(base, {
      enableSelectAll: base.props.enableSelectAll && this.props.selectable && this.props.multiSelectable,
      onSelectAll: this._onSelectAll,
      selectAllSelected: this.state.allRowsSelected
    });
  },
  _createTableBody: function _createTableBody(base) {
    return _react2.default.cloneElement(base, {
      allRowsSelected: this.state.allRowsSelected,
      multiSelectable: this.props.multiSelectable,
      onCellClick: this._onCellClick,
      onCellHover: this._onCellHover,
      onCellHoverExit: this._onCellHoverExit,
      onRowHover: this._onRowHover,
      onRowHoverExit: this._onRowHoverExit,
      onRowSelection: this._onRowSelection,
      selectable: this.props.selectable,
      style: this.mergeStyles({height: this.props.height}, base.props.style)
    });
  },
  _createTableFooter: function _createTableFooter(base) {
    return base;
  },
  _onCellClick: function _onCellClick(rowNumber, columnNumber) {
    if (this.props.onCellClick)
      this.props.onCellClick(rowNumber, columnNumber);
  },
  _onCellHover: function _onCellHover(rowNumber, columnNumber) {
    if (this.props.onCellHover)
      this.props.onCellHover(rowNumber, columnNumber);
  },
  _onCellHoverExit: function _onCellHoverExit(rowNumber, columnNumber) {
    if (this.props.onCellHoverExit)
      this.props.onCellHoverExit(rowNumber, columnNumber);
  },
  _onRowHover: function _onRowHover(rowNumber) {
    if (this.props.onRowHover)
      this.props.onRowHover(rowNumber);
  },
  _onRowHoverExit: function _onRowHoverExit(rowNumber) {
    if (this.props.onRowHoverExit)
      this.props.onRowHoverExit(rowNumber);
  },
  _onRowSelection: function _onRowSelection(selectedRows) {
    if (this.state.allRowsSelected)
      this.setState({allRowsSelected: false});
    if (this.props.onRowSelection)
      this.props.onRowSelection(selectedRows);
  },
  _onSelectAll: function _onSelectAll() {
    if (this.props.onRowSelection) {
      if (!this.state.allRowsSelected) {
        this.props.onRowSelection('all');
      } else {
        this.props.onRowSelection('none');
      }
    }
    this.setState({allRowsSelected: !this.state.allRowsSelected});
  },
  render: function render() {
    var _this = this;
    var _props = this.props;
    var children = _props.children;
    var className = _props.className;
    var fixedFooter = _props.fixedFooter;
    var fixedHeader = _props.fixedHeader;
    var style = _props.style;
    var wrapperStyle = _props.wrapperStyle;
    var headerStyle = _props.headerStyle;
    var bodyStyle = _props.bodyStyle;
    var footerStyle = _props.footerStyle;
    var other = _objectWithoutProperties(_props, ['children', 'className', 'fixedFooter', 'fixedHeader', 'style', 'wrapperStyle', 'headerStyle', 'bodyStyle', 'footerStyle']);
    var styles = this.getStyles();
    var tHead = undefined;
    var tFoot = undefined;
    var tBody = undefined;
    _react2.default.Children.forEach(children, function(child) {
      if (!_react2.default.isValidElement(child))
        return;
      var displayName = child.type.displayName;
      if (displayName === 'TableBody') {
        tBody = _this._createTableBody(child);
      } else if (displayName === 'TableHeader') {
        tHead = _this._createTableHeader(child);
      } else if (displayName === 'TableFooter') {
        tFoot = _this._createTableFooter(child);
      }
    });
    if (!tBody && !tHead)
      return null;
    var mergedTableStyle = this.mergeStyles(styles.root, style);
    var headerTable = undefined;
    var footerTable = undefined;
    var inlineHeader = undefined;
    var inlineFooter = undefined;
    if (fixedHeader) {
      headerTable = _react2.default.createElement('div', {style: this.prepareStyles(headerStyle)}, _react2.default.createElement('table', {
        className: className,
        style: mergedTableStyle
      }, tHead));
    } else {
      inlineHeader = tHead;
    }
    if (tFoot !== undefined) {
      if (fixedFooter) {
        footerTable = _react2.default.createElement('div', {style: this.prepareStyles(footerStyle)}, _react2.default.createElement('table', {
          className: className,
          style: this.prepareStyles(mergedTableStyle)
        }, tFoot));
      } else {
        inlineFooter = tFoot;
      }
    }
    return _react2.default.createElement('div', {style: this.prepareStyles(styles.tableWrapper, wrapperStyle)}, headerTable, _react2.default.createElement('div', {
      style: this.prepareStyles(styles.bodyTable, bodyStyle),
      ref: 'tableDiv'
    }, _react2.default.createElement('table', {
      className: className,
      style: mergedTableStyle,
      ref: 'tableBody'
    }, inlineHeader, inlineFooter, tBody)), footerTable);
  }
});
exports.default = Table;
module.exports = exports['default'];
