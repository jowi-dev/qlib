/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domQuery = __webpack_require__(1).default;

module.exports = domQuery;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dec, _dec2, _desc, _value, _class;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/*
The options:
.querySelector()
.querySelectorAll()
.getElementById() //SINGULAR
.getElementsByClassName()
.getElementsByTagName()
*/
var _default = (_dec = reqParam('selectorString'), _dec2 = reqParam('selectorString'), (_class = function () {
  function _default() {
    _classCallCheck(this, _default);
  }

  //this is the only 


  _default.find = function find(selectorString) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    //check for singular queries
    if (limit == 1) return this.one(selectorString);

    var _selectorHandler2 = this._selectorHandler(selectorString),
        methodCall = _selectorHandler2.methodCall,
        selector = _selectorHandler2.selector;

    switch (methodCall) {
      case 'class':
        return this._getByClass(selector, parent, limit);

      case 'tag':
        return this._getByTagName(selector, parent, limit);

      case 'generic':
        return this._generic(selectorString, parent, null);

      default:
        return null;
    }
  };

  //one is the same as domQuery.find where limit = 1


  _default.one = function one(selectorString) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    var _selectorHandlerSingu = this._selectorHandlerSingular(selectorString),
        methodCall = _selectorHandlerSingu.methodCall,
        selector = _selectorHandlerSingu.selector;

    switch (methodCall) {
      case 'id':
        return this._getById(selector, parent);

      case 'generic':
        return this._genericSingular(selectorString, parent);

      default:
        return null;
    }
  };

  //Split the selection string handlers into two seperate functions to reduce the noise of the non-singular


  _default._selectorHandlerSingular = function _selectorHandlerSingular(selectorString) {
    //search for id's since there is a more performant option
    var byId = selectorString.match(/^[#]/);
    byId = selectorString.includes('[id=') || byId;

    var optimized = byId ? 'id' : 'generic';
    return {
      methodCall: optimized,
      selector: ''
    };
  };

  //@reqParam('selectorString')


  _default._selectorHandler = function _selectorHandler(selectorString) {
    //search for classes and tagnames since there is a more performant option
    var byClass = selectorString.match(/^[.]/);
    byClass = selectorString.includes('[class=') || byClass;
    var byTag = selectorString.match(/^[] /);

    var optimized = byClass ? 'class' : byTag ? 'tag' : 'generic';
    return {
      methodCall: optimized,
      selector: ''
    };
  };

  //for singular queries that aren't specified by id


  _default._genericSingular = function _genericSingular(selectorString) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    return parent.querySelector(selectorString);
  };

  //for #idName queries


  _default._getById = function _getById(selectorString) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    return parent.getElementById(selectorString);
  };

  //this is the route to take when there aren't any qualified selectors e.g. .className or #idName


  _default._generic = function _generic(selectorString) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    return [].concat(_toConsumableArray(parent.querySelectorAll(selectorString)));
  };

  //when the user does a .className queries 


  _default._getByClass = function _getByClass(selectorString) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    return [].concat(_toConsumableArray(parent.getElementsByClassName(selectorString)));
  };

  //when the user passes in a string with no special characters


  _default._getByTagName = function _getByTagName(selectorString) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    return [].concat(_toConsumableArray(parent.getElementsByTagName(selectorString)));
  };

  return _default;
}(), (_applyDecoratedDescriptor(_class, 'find', [_dec], Object.getOwnPropertyDescriptor(_class, 'find'), _class), _applyDecoratedDescriptor(_class, 'one', [_dec2], Object.getOwnPropertyDescriptor(_class, 'one'), _class)), _class));

exports.default = _default;


function reqParam(value) {
  return function (target, name, descriptor) {
    var original = descriptor.value;
    if (typeof original == "function") {
      descriptor.value = function () {
        try {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return args[value] != null ? original.apply(this, args) : null;
        } catch (e) {
          console.log(e);
          throw e;
        }
      };
    }
    return descriptor;
  };
}

//module.exports = new domQuery();

/***/ })
/******/ ]);