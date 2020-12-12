function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"], {
  /***/
  "./node_modules/angular-web-storage/fesm2015/angular-web-storage.js":
  /*!**************************************************************************!*\
    !*** ./node_modules/angular-web-storage/fesm2015/angular-web-storage.js ***!
    \**************************************************************************/

  /*! exports provided: AngularWebStorageModule, LocalStorage, LocalStorageService, SessionStorage, SessionStorageService, StorageService */

  /***/
  function node_modulesAngularWebStorageFesm2015AngularWebStorageJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AngularWebStorageModule", function () {
      return AngularWebStorageModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LocalStorage", function () {
      return LocalStorage;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LocalStorageService", function () {
      return LocalStorageService;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SessionStorage", function () {
      return SessionStorage;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SessionStorageService", function () {
      return SessionStorageService;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "StorageService", function () {
      return StorageService;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /**
     * 判断是否在浏览器中渲染Angular应用
     * `decorator` 无法直接使用Angular `PLATFORM_ID` 标识
     * 这带来的好处是当服务端自行填充 Document 时也能很好的识别
     */


    var isBrowser = typeof document === 'object' && !!document;

    var StorageUtil = /*#__PURE__*/function () {
      function StorageUtil() {
        _classCallCheck(this, StorageUtil);
      }

      _createClass(StorageUtil, null, [{
        key: "get",
        value: function get(storage, key) {
          if (storage == null) {
            return null;
          }

          var value = StorageUtil.parse(storage.getItem(key) || 'null') || null;
          if (value === null) return null;

          if (typeof value === 'object' && typeof value._expired !== 'undefined' && value._expired !== 0 && +new Date() > value._expired) {
            StorageUtil.remove(storage, key);
            return null;
          }

          return value._value || null;
        }
      }, {
        key: "set",
        value: function set(storage, key, value) {
          var expiredAt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
          var expiredUnit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 't';

          if (storage == null) {
            return;
          }

          storage.setItem(key, StorageUtil.stringify({
            _expired: StorageUtil.getExpired(expiredAt, expiredUnit),
            _value: value
          }));
        }
      }, {
        key: "remove",
        value: function remove(storage, key) {
          if (storage == null) {
            return;
          }

          storage.removeItem(key);
        }
      }, {
        key: "key",
        value: function key(storage, index) {
          return storage == null ? '' : storage.key(index);
        }
      }, {
        key: "getExpired",
        value: function getExpired(val, unit) {
          if (val <= 0) return 0;
          var now = +new Date();

          switch (unit) {
            case 's':
              // 秒
              return now + 1000 * val;

            case 'm':
              // 分
              return now + 1000 * 60 * val;

            case 'h':
              // 时
              return now + 1000 * 60 * 60 * val;

            case 'd':
              // 天
              return now + 1000 * 60 * 60 * 24 * val;

            case 'w':
              // 周
              return now + 1000 * 60 * 60 * 24 * 7 * val;

            case 'y':
              // 年
              return now + 1000 * 60 * 60 * 24 * 365 * val;

            case 't':
              // 自定义
              return now + val;
          }

          return 0;
        }
      }, {
        key: "stringify",
        value: function stringify(value) {
          return JSON.stringify(value);
        }
      }, {
        key: "parse",
        value: function parse(text) {
          try {
            return JSON.parse(text) || null;
          } catch (e) {
            return text;
          }
        }
      }]);

      return StorageUtil;
    }();

    var cache = {};

    function WebStorage(storage, key) {
      var expiredAt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var expiredUnit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'd';
      return function (target, propertyName) {
        key = key || propertyName;
        Object.defineProperty(target, propertyName, {
          get: function get() {
            return StorageUtil.get(storage, key);
          },
          set: function set(value) {
            if (!cache[key]) {
              var storedValue = StorageUtil.get(storage, key);

              if (storedValue === null) {
                StorageUtil.set(storage, key, value, expiredAt, expiredUnit);
              }

              cache[key] = true;
              return;
            }

            StorageUtil.set(storage, key, value, expiredAt, expiredUnit);
          },
          enumerable: true,
          configurable: true
        });
      };
    }
    /**
     * `localStorage` Decorator
     *
     * @param [expiredAt=0] Expiration time, 0 means forever
     * @param [expiredUnit='t'] Expiration time unit (default: custom [unit: ms])
     */


    function LocalStorage(key) {
      var expiredAt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var expiredUnit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 't';
      return WebStorage(isBrowser ? localStorage : null, key, expiredAt, expiredUnit);
    }
    /**
     * `sessionStorage` Decorator
     *
     * @param [expiredAt=0] Expiration time, 0 means forever
     * @param [expiredUnit='t'] Expiration time unit (default: custom [unit: ms])
     */


    function SessionStorage(key) {
      var expiredAt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var expiredUnit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 't';
      return WebStorage(isBrowser ? sessionStorage : null, key, expiredAt, expiredUnit);
    }

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var __metadata = undefined && undefined.__metadata || function (k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };

    var StorageService = /*#__PURE__*/function () {
      function StorageService(storage) {
        _classCallCheck(this, StorageService);

        this.storage = storage;
      }

      _createClass(StorageService, [{
        key: "get",
        value: function get(key) {
          return StorageUtil.get(this.storage, key);
        }
      }, {
        key: "set",
        value: function set(key, value) {
          var expiredAt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          var expiredUnit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'd';
          return StorageUtil.set(this.storage, key, value, expiredAt, expiredUnit);
        }
        /**
         * 删除指定key，如：
         * - `remove('key')` 删除 `key` 键
         * - `remove(/BMap_\w+/)` 批量删除所有 BMap_ 开头的键
         * @param key 键名或正则表达式
         */

      }, {
        key: "remove",
        value: function remove(key) {
          var _this = this;

          if (typeof key === 'string') {
            StorageUtil.remove(this.storage, key);
            return;
          }

          var index = 0;
          var next = StorageUtil.key(this.storage, index);
          var ls = [];

          while (next) {
            if (key.test(next)) ls.push(next);
            next = StorageUtil.key(this.storage, ++index);
          }

          ls.forEach(function (v) {
            return StorageUtil.remove(_this.storage, v);
          });
        }
      }, {
        key: "clear",
        value: function clear() {
          this.storage.clear();
        }
      }]);

      return StorageService;
    }();

    var LocalStorageService = /*#__PURE__*/function (_StorageService) {
      _inherits(LocalStorageService, _StorageService);

      var _super = _createSuper(LocalStorageService);

      function LocalStorageService() {
        _classCallCheck(this, LocalStorageService);

        return _super.call(this, isBrowser ? localStorage : null);
      }

      return LocalStorageService;
    }(StorageService);

    LocalStorageService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["defineInjectable"])({
      factory: function LocalStorageService_Factory() {
        return new LocalStorageService();
      },
      token: LocalStorageService,
      providedIn: "root"
    });
    LocalStorageService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
      providedIn: 'root'
    }), __metadata("design:paramtypes", [])], LocalStorageService);

    var SessionStorageService = /*#__PURE__*/function (_StorageService2) {
      _inherits(SessionStorageService, _StorageService2);

      var _super2 = _createSuper(SessionStorageService);

      function SessionStorageService() {
        _classCallCheck(this, SessionStorageService);

        return _super2.call(this, isBrowser ? sessionStorage : null);
      }

      return SessionStorageService;
    }(StorageService);

    SessionStorageService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["defineInjectable"])({
      factory: function SessionStorageService_Factory() {
        return new SessionStorageService();
      },
      token: SessionStorageService,
      providedIn: "root"
    });
    SessionStorageService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
      providedIn: 'root'
    }), __metadata("design:paramtypes", [])], SessionStorageService);

    var __decorate$1 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var AngularWebStorageModule = function AngularWebStorageModule() {
      _classCallCheck(this, AngularWebStorageModule);
    };

    AngularWebStorageModule = __decorate$1([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])()], AngularWebStorageModule);
    /**
     * Generated bundle index. Do not edit.
     */
    //# sourceMappingURL=angular-web-storage.js.map

    /***/
  },

  /***/
  "./src/app/b2c/requests/login-body.ts":
  /*!********************************************!*\
    !*** ./src/app/b2c/requests/login-body.ts ***!
    \********************************************/

  /*! exports provided: LoginBody, SuperAdminBody */

  /***/
  function srcAppB2cRequestsLoginBodyTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginBody", function () {
      return LoginBody;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SuperAdminBody", function () {
      return SuperAdminBody;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");

    var LoginBody = function LoginBody() {
      _classCallCheck(this, LoginBody);

      this.type = 'b2c';
      this.country = "kuwait";
    };

    var SuperAdminBody = function SuperAdminBody() {
      _classCallCheck(this, SuperAdminBody);
    };
    /***/

  }
}]);
//# sourceMappingURL=common-es5.js.map