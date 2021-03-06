/* */ 
'use strict';
exports.__esModule = true;
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
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
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
var _ExecutionEnvironment = require('./ExecutionEnvironment');
var _PathUtils = require('./PathUtils');
var _runTransitionHook = require('./runTransitionHook');
var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
var _deprecate = require('./deprecate');
var _deprecate2 = _interopRequireDefault(_deprecate);
function useBasename(createHistory) {
  return function() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var basename = options.basename;
    var historyOptions = _objectWithoutProperties(options, ['basename']);
    var history = createHistory(historyOptions);
    if (basename == null && _ExecutionEnvironment.canUseDOM) {
      var base = document.getElementsByTagName('base')[0];
      if (base)
        basename = _PathUtils.extractPath(base.href);
    }
    function addBasename(location) {
      if (basename && location.basename == null) {
        if (location.pathname.indexOf(basename) === 0) {
          location.pathname = location.pathname.substring(basename.length);
          location.basename = basename;
          if (location.pathname === '')
            location.pathname = '/';
        } else {
          location.basename = '';
        }
      }
      return location;
    }
    function prependBasename(location) {
      if (!basename)
        return location;
      if (typeof location === 'string')
        location = _PathUtils.parsePath(location);
      var pname = location.pathname;
      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
      var pathname = normalizedBasename + normalizedPathname;
      return _extends({}, location, {pathname: pathname});
    }
    function listenBefore(hook) {
      return history.listenBefore(function(location, callback) {
        _runTransitionHook2['default'](hook, addBasename(location), callback);
      });
    }
    function listen(listener) {
      return history.listen(function(location) {
        listener(addBasename(location));
      });
    }
    function push(location) {
      history.push(prependBasename(location));
    }
    function replace(location) {
      history.replace(prependBasename(location));
    }
    function createPath(location) {
      return history.createPath(prependBasename(location));
    }
    function createHref(location) {
      return history.createHref(prependBasename(location));
    }
    function createLocation(location) {
      for (var _len = arguments.length,
          args = Array(_len > 1 ? _len - 1 : 0),
          _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
    }
    function pushState(state, path) {
      if (typeof path === 'string')
        path = _PathUtils.parsePath(path);
      push(_extends({state: state}, path));
    }
    function replaceState(state, path) {
      if (typeof path === 'string')
        path = _PathUtils.parsePath(path);
      replace(_extends({state: state}, path));
    }
    return _extends({}, history, {
      listenBefore: listenBefore,
      listen: listen,
      push: push,
      replace: replace,
      createPath: createPath,
      createHref: createHref,
      createLocation: createLocation,
      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
    });
  };
}
exports['default'] = useBasename;
module.exports = exports['default'];
