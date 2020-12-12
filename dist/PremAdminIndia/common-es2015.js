(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/angular-web-storage/fesm2015/angular-web-storage.js":
/*!**************************************************************************!*\
  !*** ./node_modules/angular-web-storage/fesm2015/angular-web-storage.js ***!
  \**************************************************************************/
/*! exports provided: AngularWebStorageModule, LocalStorage, LocalStorageService, SessionStorage, SessionStorageService, StorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularWebStorageModule", function() { return AngularWebStorageModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalStorage", function() { return LocalStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalStorageService", function() { return LocalStorageService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionStorage", function() { return SessionStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionStorageService", function() { return SessionStorageService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageService", function() { return StorageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


/**
 * 判断是否在浏览器中渲染Angular应用
 * `decorator` 无法直接使用Angular `PLATFORM_ID` 标识
 * 这带来的好处是当服务端自行填充 Document 时也能很好的识别
 */
const isBrowser = typeof document === 'object' && !!document;
class StorageUtil {
    static get(storage, key) {
        if (storage == null) {
            return null;
        }
        const value = StorageUtil.parse(storage.getItem(key) || 'null') || null;
        if (value === null)
            return null;
        if (typeof value === 'object' &&
            typeof value._expired !== 'undefined' &&
            value._expired !== 0 &&
            +new Date() > value._expired) {
            StorageUtil.remove(storage, key);
            return null;
        }
        return value._value || null;
    }
    static set(storage, key, value, expiredAt = 0, expiredUnit = 't') {
        if (storage == null) {
            return;
        }
        storage.setItem(key, StorageUtil.stringify({
            _expired: StorageUtil.getExpired(expiredAt, expiredUnit),
            _value: value,
        }));
    }
    static remove(storage, key) {
        if (storage == null) {
            return;
        }
        storage.removeItem(key);
    }
    static key(storage, index) {
        return storage == null ? '' : storage.key(index);
    }
    static getExpired(val, unit) {
        if (val <= 0)
            return 0;
        const now = +new Date();
        switch (unit) {
            case 's': // 秒
                return now + 1000 * val;
            case 'm': // 分
                return now + 1000 * 60 * val;
            case 'h': // 时
                return now + 1000 * 60 * 60 * val;
            case 'd': // 天
                return now + 1000 * 60 * 60 * 24 * val;
            case 'w': // 周
                return now + 1000 * 60 * 60 * 24 * 7 * val;
            case 'y': // 年
                return now + 1000 * 60 * 60 * 24 * 365 * val;
            case 't': // 自定义
                return now + val;
        }
        return 0;
    }
    static stringify(value) {
        return JSON.stringify(value);
    }
    static parse(text) {
        try {
            return JSON.parse(text) || null;
        }
        catch (e) {
            return text;
        }
    }
}

const cache = {};
function WebStorage(storage, key, expiredAt = 0, expiredUnit = 'd') {
    return (target, propertyName) => {
        key = key || propertyName;
        Object.defineProperty(target, propertyName, {
            get: () => {
                return StorageUtil.get(storage, key);
            },
            set: (value) => {
                if (!cache[key]) {
                    const storedValue = StorageUtil.get(storage, key);
                    if (storedValue === null) {
                        StorageUtil.set(storage, key, value, expiredAt, expiredUnit);
                    }
                    cache[key] = true;
                    return;
                }
                StorageUtil.set(storage, key, value, expiredAt, expiredUnit);
            },
            enumerable: true,
            configurable: true,
        });
    };
}
/**
 * `localStorage` Decorator
 *
 * @param [expiredAt=0] Expiration time, 0 means forever
 * @param [expiredUnit='t'] Expiration time unit (default: custom [unit: ms])
 */
function LocalStorage(key, expiredAt = 0, expiredUnit = 't') {
    return WebStorage(isBrowser ? localStorage : null, key, expiredAt, expiredUnit);
}
/**
 * `sessionStorage` Decorator
 *
 * @param [expiredAt=0] Expiration time, 0 means forever
 * @param [expiredUnit='t'] Expiration time unit (default: custom [unit: ms])
 */
function SessionStorage(key, expiredAt = 0, expiredUnit = 't') {
    return WebStorage(isBrowser ? sessionStorage : null, key, expiredAt, expiredUnit);
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class StorageService {
    constructor(storage) {
        this.storage = storage;
    }
    get(key) {
        return StorageUtil.get(this.storage, key);
    }
    set(key, value, expiredAt = 0, expiredUnit = 'd') {
        return StorageUtil.set(this.storage, key, value, expiredAt, expiredUnit);
    }
    /**
     * 删除指定key，如：
     * - `remove('key')` 删除 `key` 键
     * - `remove(/BMap_\w+/)` 批量删除所有 BMap_ 开头的键
     * @param key 键名或正则表达式
     */
    remove(key) {
        if (typeof key === 'string') {
            StorageUtil.remove(this.storage, key);
            return;
        }
        let index = 0;
        let next = StorageUtil.key(this.storage, index);
        const ls = [];
        while (next) {
            if (key.test(next))
                ls.push(next);
            next = StorageUtil.key(this.storage, ++index);
        }
        ls.forEach(v => StorageUtil.remove(this.storage, v));
    }
    clear() {
        this.storage.clear();
    }
}
let LocalStorageService = class LocalStorageService extends StorageService {
    constructor() {
        super(isBrowser ? localStorage : null);
    }
};
LocalStorageService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["defineInjectable"])({ factory: function LocalStorageService_Factory() { return new LocalStorageService(); }, token: LocalStorageService, providedIn: "root" });
LocalStorageService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
    __metadata("design:paramtypes", [])
], LocalStorageService);
let SessionStorageService = class SessionStorageService extends StorageService {
    constructor() {
        super(isBrowser ? sessionStorage : null);
    }
};
SessionStorageService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["defineInjectable"])({ factory: function SessionStorageService_Factory() { return new SessionStorageService(); }, token: SessionStorageService, providedIn: "root" });
SessionStorageService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
    __metadata("design:paramtypes", [])
], SessionStorageService);

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let AngularWebStorageModule = class AngularWebStorageModule {
};
AngularWebStorageModule = __decorate$1([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])()
], AngularWebStorageModule);

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=angular-web-storage.js.map


/***/ }),

/***/ "./src/app/b2c/requests/login-body.ts":
/*!********************************************!*\
  !*** ./src/app/b2c/requests/login-body.ts ***!
  \********************************************/
/*! exports provided: LoginBody, SuperAdminBody */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginBody", function() { return LoginBody; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuperAdminBody", function() { return SuperAdminBody; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

class LoginBody {
    constructor() {
        this.type = 'b2c';
        this.country = "kuwait";
    }
}
class SuperAdminBody {
}


/***/ })

}]);
//# sourceMappingURL=common-es2015.js.map