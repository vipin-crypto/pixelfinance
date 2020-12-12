function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-login-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/login/forgot-password-modal/forgot-password-modal.component.html":
  /*!************************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login/forgot-password-modal/forgot-password-modal.component.html ***!
    \************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppLoginForgotPasswordModalForgotPasswordModalComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"modal\" id=\"forgotPasswordModal\" data-backdrop=\"static\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\">Forgot Password</h5>\n            </div>\n            <div class=\"modal-body\">\n                <form #forgotForm=\"ngForm\">\n                    <div class=\"form-group\">\n                        <label>Email</label>\n                        <input type=\"text\" name=\"email\" ngModel class=\"form-control\" maxlength=\"50\"\n                            pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$\" required />\n                    </div>\n                </form>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"!forgotForm.valid\" (click)=\"forgotPassword(forgotForm)\"> Submit</button>\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"forgotForm.reset()\" id=\"closeForgotModal\"\n                    data-dismiss=\"modal\">Cancel</button>\n            </div>\n        </div>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.component.html":
  /*!**********************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.component.html ***!
    \**********************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppLoginLoginComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"container login-center\">\n\n    <!-- Outer Row -->\n    <div class=\"row justify-content-center\">\n\n        <div class=\"col-lg-6\">\n\n            <div class=\"card o-hidden border-0 shadow-lg my-5\">\n                <div class=\"card-body p-0\">\n                    <!-- Nested Row within Card Body -->\n                    <div class=\"row\">\n                        <!-- <div class=\"col-lg-6 d-none d-lg-block bg-login-image\">\n                            <div class=\"p-5\">\n                                <img src=\"assets/img/login-img.png\" width=\"100%\">\n                            </div>\n                        </div> -->\n                        <div class=\"col-lg-12\">\n                            <div class=\"p-5\">\n                                <div class=\"text-center\">\n                                    <h1 class=\"h4 text-gray-900 mb-4\">Welcome To Pixel Finance!</h1>\n                                </div>\n                                <!-- <div class=\"form-group\">\n                                    <select name=\"type\" class=\"form-control\" [(ngModel)]=\"loginBody.type\" required>\n                                        <option value=\"\">--Select Login Type--</option>\n                                        <option value='b2c'>b2c</option>\n                                        <option value='b2b'>b2b</option>\n                                    </select>\n                                </div> -->\n                                <form class=\"user\" #loginForm=\"ngForm\" name=\"form\"\n                                    (ngSubmit)=\"loginForm.form.valid && login()\">\n                                    <div class=\"form-group\">\n                                        <input type=\"email\" class=\"form-control form-control-user\" name=\"email\"\n                                            id=\"exampleInputEmail\" [(ngModel)]=\"loginBody.email\"\n                                            aria-describedby=\"emailHelp\"\n                                            pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$\"\n                                            placeholder=\"Enter Email Address...\" required />\n\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <input type=\"password\" class=\"form-control form-control-user\" name=\"password\"\n                                            [(ngModel)]=\"loginBody.password\" id=\"exampleInputPassword\"\n                                            placeholder=\"Password\" required />\n                                    </div>\n\n\n\n\n                                    <!-- <button type=\"submit\" class=\"btn btn-primary btn-user btn-block\">Login</button> -->\n                                    <button class=\"btn btn-primary btn-user btn-block\" type=\"submit\"\n                                        [disabled]=\"!loginForm.valid || flags.isError || flags.isLogin\">\n                                        {{flags.isError?errorMessage:flags.isLogin?'Hold on...': 'Login'}}\n                                    </button>\n                                    <div style=\"display: flex;\">\n                                        <a href=\"javascript:void(0)\" data-toggle=\"modal\"\n                                        data-target=\"#forgotPasswordModal\">Forgot password</a>\n                                        <a href=\"#\" class=\"super\" (click)=\"movetosuperadmin()\">As a Super-Admin</a>\n                                    </div>\n                                  \n                                </form>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n\n    </div>\n\n</div>\n\n<app-forgot-password-modal></app-forgot-password-modal>";
    /***/
  },

  /***/
  "./src/app/login/forgot-password-modal/forgot-password-modal.component.scss":
  /*!**********************************************************************************!*\
    !*** ./src/app/login/forgot-password-modal/forgot-password-modal.component.scss ***!
    \**********************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppLoginForgotPasswordModalForgotPasswordModalComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 553px;\n    margin: 12.75rem auto; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vZm9yZ290LXBhc3N3b3JkLW1vZGFsL1Y6XFxTdXBlckFkbWluLUxvY2FsY2xpZW50IHByb2plY3Qvc3JjXFxhcHBcXGxvZ2luXFxmb3Jnb3QtcGFzc3dvcmQtbW9kYWxcXGZvcmdvdC1wYXNzd29yZC1tb2RhbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNBO0lBQ0ksZ0JBQWdCO0lBQ2hCLHFCQUFxQixFQUFBLEVBQ3hCIiwiZmlsZSI6InNyYy9hcHAvbG9naW4vZm9yZ290LXBhc3N3b3JkLW1vZGFsL2ZvcmdvdC1wYXNzd29yZC1tb2RhbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBtZWRpYSAobWluLXdpZHRoOiA1NzZweCl7XG4ubW9kYWwtZGlhbG9nIHtcbiAgICBtYXgtd2lkdGg6IDU1M3B4O1xuICAgIG1hcmdpbjogMTIuNzVyZW0gYXV0bztcbn1cbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/login/forgot-password-modal/forgot-password-modal.component.ts":
  /*!********************************************************************************!*\
    !*** ./src/app/login/forgot-password-modal/forgot-password-modal.component.ts ***!
    \********************************************************************************/

  /*! exports provided: ForgotPasswordModalComponent */

  /***/
  function srcAppLoginForgotPasswordModalForgotPasswordModalComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ForgotPasswordModalComponent", function () {
      return ForgotPasswordModalComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _commonservice_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../commonservice/api.service */
    "./src/app/commonservice/api.service.ts");
    /* harmony import */


    var ng6_toastr_notifications__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ng6-toastr-notifications */
    "./node_modules/ng6-toastr-notifications/fesm2015/ng6-toastr-notifications.js");

    var ForgotPasswordModalComponent = /*#__PURE__*/function () {
      function ForgotPasswordModalComponent(api, toaster) {
        _classCallCheck(this, ForgotPasswordModalComponent);

        this.api = api;
        this.toaster = toaster;
      }

      _createClass(ForgotPasswordModalComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "forgotPassword",
        value: function forgotPassword(f) {
          var _this = this;

          console.log(f.value);
          this.api.forgotPassword(f.value).subscribe(function (response) {
            if (!response.success) _this.errorToast(response.message);else {
              _this.successToast(response.message);

              document.getElementById('closeForgotModal').click();
              f.reset();
            }
          });
        }
      }, {
        key: "successToast",
        value: function successToast(message) {
          this.toaster.successToastr(message, '', {
            maxShown: 1
          });
        }
      }, {
        key: "errorToast",
        value: function errorToast(message) {
          this.toaster.errorToastr(message);
        }
      }]);

      return ForgotPasswordModalComponent;
    }();

    ForgotPasswordModalComponent.ctorParameters = function () {
      return [{
        type: _commonservice_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]
      }, {
        type: ng6_toastr_notifications__WEBPACK_IMPORTED_MODULE_3__["ToastrManager"]
      }];
    };

    ForgotPasswordModalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-forgot-password-modal',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./forgot-password-modal.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/login/forgot-password-modal/forgot-password-modal.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./forgot-password-modal.component.scss */
      "./src/app/login/forgot-password-modal/forgot-password-modal.component.scss"))["default"]]
    })], ForgotPasswordModalComponent);
    /***/
  },

  /***/
  "./src/app/login/login-routing.module.ts":
  /*!***********************************************!*\
    !*** ./src/app/login/login-routing.module.ts ***!
    \***********************************************/

  /*! exports provided: LoginRoutingModule */

  /***/
  function srcAppLoginLoginRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginRoutingModule", function () {
      return LoginRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./login.component */
    "./src/app/login/login.component.ts");

    var routes = [{
      path: '',
      component: _login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]
    }];

    var LoginRoutingModule = function LoginRoutingModule() {
      _classCallCheck(this, LoginRoutingModule);
    };

    LoginRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], LoginRoutingModule);
    /***/
  },

  /***/
  "./src/app/login/login.component.scss":
  /*!********************************************!*\
    !*** ./src/app/login/login.component.scss ***!
    \********************************************/

  /*! exports provided: default */

  /***/
  function srcAppLoginLoginComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "form.user .btn-user {\n  padding: .75rem 4rem !important;\n  margin: auto !important; }\n\n.btn-block {\n  width: auto !important; }\n\n.login-center {\n  position: absolute;\n  left: 50%;\n  top: 40%;\n  transform: translate(-50%, -38%); }\n\n.super {\n  margin-left: 143px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vVjpcXFN1cGVyQWRtaW4tTG9jYWxjbGllbnQgcHJvamVjdC9zcmNcXGFwcFxcbG9naW5cXGxvZ2luLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksK0JBQStCO0VBQy9CLHVCQUF1QixFQUFBOztBQUczQjtFQUNJLHNCQUFzQixFQUFBOztBQUcxQjtFQUNJLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsUUFBUTtFQUNSLGdDQUFnQyxFQUFBOztBQUlwQztFQUNJLGtCQUFrQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJmb3JtLnVzZXIgLmJ0bi11c2VyIHtcbiAgICBwYWRkaW5nOiAuNzVyZW0gNHJlbSAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogYXV0byAhaW1wb3J0YW50O1xufVxuXG4uYnRuLWJsb2NrIHtcbiAgICB3aWR0aDogYXV0byAhaW1wb3J0YW50O1xufVxuXG4ubG9naW4tY2VudGVye1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgdG9wOiA0MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTM4JSk7XG59XG5cblxuLnN1cGVyIHtcbiAgICBtYXJnaW4tbGVmdDogMTQzcHg7XG59XG4iXX0= */";
    /***/
  },

  /***/
  "./src/app/login/login.component.ts":
  /*!******************************************!*\
    !*** ./src/app/login/login.component.ts ***!
    \******************************************/

  /*! exports provided: LoginComponent */

  /***/
  function srcAppLoginLoginComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginComponent", function () {
      return LoginComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _b2c_requests_login_body__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../b2c/requests/login-body */
    "./src/app/b2c/requests/login-body.ts");
    /* harmony import */


    var _commonservice_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../commonservice/api.service */
    "./src/app/commonservice/api.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var angular_web_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! angular-web-storage */
    "./node_modules/angular-web-storage/fesm2015/angular-web-storage.js");
    /* harmony import */


    var ng6_toastr_notifications__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ng6-toastr-notifications */
    "./node_modules/ng6-toastr-notifications/fesm2015/ng6-toastr-notifications.js");

    var LoginComponent = /*#__PURE__*/function () {
      function LoginComponent(api, localStorage, router, toaster) {
        _classCallCheck(this, LoginComponent);

        this.api = api;
        this.localStorage = localStorage;
        this.router = router;
        this.toaster = toaster;
        this.loginBody = new _b2c_requests_login_body__WEBPACK_IMPORTED_MODULE_2__["LoginBody"]();
        this.errorMessage = "Error";
        this.flags = {
          isLogin: false,
          isError: false
        };
      }

      _createClass(LoginComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "login",
        value: function login() {
          var _this2 = this;

          var query;
          this.flags.isLogin = true;
          query = this.api.signInb2c(this.loginBody);
          query.subscribe(function (response) {
            _this2.flags.isLogin = false; // console.log(response);

            if (response.statusCode != 200) {
              _this2.flags.isLogin = false;
              _this2.errorMessage = response.message;
              return _this2.errorToast(_this2.errorMessage);
            } // this.api.sendToken(response.admin)
            // this.api.getSubAdminDetail(response.admin._id).subscribe((response:any)=>{
            //   let detail=response.data.permission;
            //   localStorage.setItem('permission',JSON.stringify(detail));
            //   this.flags.isLogin = false;
            //   console.log('dayfresh');
            //   
            // })


            localStorage.setItem("email", response.data.email);
            localStorage.setItem("role", 'Admin');
            localStorage.setItem("supertoken", response.data.accessToken);

            _this2.router.navigate(['/b2c/dashboard']);
          }, function (error) {
            _this2.flags.isLogin = false;
          });
        }
      }, {
        key: "successToast",
        value: function successToast(message) {
          this.toaster.successToastr(message, '', {
            maxShown: 1
          });
        }
      }, {
        key: "errorToast",
        value: function errorToast(message) {
          this.toaster.errorToastr(message);
        }
      }, {
        key: "movetosuperadmin",
        value: function movetosuperadmin() {
          this.router.navigate(['/super-login']);
        }
      }]);

      return LoginComponent;
    }();

    LoginComponent.ctorParameters = function () {
      return [{
        type: _commonservice_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"]
      }, {
        type: angular_web_storage__WEBPACK_IMPORTED_MODULE_5__["LocalStorageService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
      }, {
        type: ng6_toastr_notifications__WEBPACK_IMPORTED_MODULE_6__["ToastrManager"]
      }];
    };

    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-login',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./login.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./login.component.scss */
      "./src/app/login/login.component.scss"))["default"]]
    })], LoginComponent);
    /***/
  },

  /***/
  "./src/app/login/login.module.ts":
  /*!***************************************!*\
    !*** ./src/app/login/login.module.ts ***!
    \***************************************/

  /*! exports provided: LoginModule */

  /***/
  function srcAppLoginLoginModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginModule", function () {
      return LoginModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _login_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./login-routing.module */
    "./src/app/login/login-routing.module.ts");
    /* harmony import */


    var _login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./login.component */
    "./src/app/login/login.component.ts");
    /* harmony import */


    var _forgot_password_modal_forgot_password_modal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./forgot-password-modal/forgot-password-modal.component */
    "./src/app/login/forgot-password-modal/forgot-password-modal.component.ts");

    var LoginModule = function LoginModule() {
      _classCallCheck(this, LoginModule);
    };

    LoginModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"], _forgot_password_modal_forgot_password_modal_component__WEBPACK_IMPORTED_MODULE_6__["ForgotPasswordModalComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _login_routing_module__WEBPACK_IMPORTED_MODULE_4__["LoginRoutingModule"]]
    })], LoginModule);
    /***/
  }
}]);
//# sourceMappingURL=login-login-module-es5.js.map