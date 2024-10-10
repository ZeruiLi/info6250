/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLIENT: () => (/* binding */ CLIENT),
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),
/* harmony export */   SERVER: () => (/* binding */ SERVER)
/* harmony export */ });


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SERVER = {
  AUTH_MISSING: 'auth-missing'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, CLIENT.NETWORK_ERROR, 'Network problems. Please try again'), CLIENT.NO_SESSION, 'No login session. Please login'), CLIENT.AUTH_MISSING, 'Auth missing. Please login again'), "default", 'Something went wrong. Please try again');


/***/ }),

/***/ "./src/listener.js":
/*!*************************!*\
  !*** ./src/listener.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addLoginListener: () => (/* binding */ addLoginListener),
/* harmony export */   addLogoutListener: () => (/* binding */ addLogoutListener),
/* harmony export */   addWordListenser: () => (/* binding */ addWordListenser)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");






function addLoginListener(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  appEl.addEventListener("submit", function (e) {
    return handleLoginSubmit(e, {
      state: state,
      appEl: appEl
    });
  });
}
function handleLoginSubmit(e, _ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl;
  e.preventDefault();
  if (!e.target.classList.contains("login-form")) return;
  var username = appEl.querySelector(".login-username").value;
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (_ref3) {
    var username = _ref3.username;
    return handleLoginSuccess({
      username: username,
      state: state,
      appEl: appEl
    });
  })["catch"](function (err) {
    return handleError(err, {
      state: state,
      appEl: appEl
    });
  });
}
function handleLoginSuccess(_ref4) {
  var username = _ref4.username,
    state = _ref4.state,
    appEl = _ref4.appEl;
  (0,_state__WEBPACK_IMPORTED_MODULE_2__.login)(username);
  (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
    state: state,
    appEl: appEl
  });
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchWord)().then(function (response) {
    return handleFetchWordSuccess(response, {
      state: state,
      appEl: appEl
    });
  })["catch"](function (err) {
    return handleFetchWordError(err, {
      state: state,
      appEl: appEl
    });
  });
}
function handleFetchWordSuccess(response, _ref5) {
  var state = _ref5.state,
    appEl = _ref5.appEl;
  (0,_state__WEBPACK_IMPORTED_MODULE_2__.setWord)(response.storedWord);
  (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
    state: state,
    appEl: appEl
  });
}
function handleFetchWordError(err, _ref6) {
  var state = _ref6.state,
    appEl = _ref6.appEl;
  if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_3__.SERVER.AUTH_MISSING) {
    handleError({
      error: _constants__WEBPACK_IMPORTED_MODULE_3__.CLIENT.NO_SESSION
    }, {
      state: state,
      appEl: appEl
    });
    return;
  }
  handleError(err, {
    state: state,
    appEl: appEl
  });
}
function addLogoutListener(_ref7) {
  var state = _ref7.state,
    appEl = _ref7.appEl;
  appEl.addEventListener("submit", function (e) {
    return handleLogoutSubmit(e, {
      state: state,
      appEl: appEl
    });
  });
}
function handleLogoutSubmit(e, _ref8) {
  var state = _ref8.state,
    appEl = _ref8.appEl;
  e.preventDefault();
  if (!e.target.classList.contains("logout-form")) return;
  (0,_state__WEBPACK_IMPORTED_MODULE_2__.logout)();
  (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
    state: state,
    appEl: appEl
  });
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)()["catch"](function (err) {
    return handleError(err, {
      state: state,
      appEl: appEl
    });
  });
}
function addWordListenser(_ref9) {
  var state = _ref9.state,
    appEl = _ref9.appEl;
  appEl.addEventListener("submit", function (e) {
    return handleWordSubmit(e, {
      state: state,
      appEl: appEl
    });
  });
}
function handleWordSubmit(e, _ref10) {
  var state = _ref10.state,
    appEl = _ref10.appEl;
  e.preventDefault();
  if (!e.target.classList.contains("word-form")) return;
  var word = appEl.querySelector(".word-input").value;
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUpdateWord)(word).then(function (_ref11) {
    var storedWord = _ref11.storedWord;
    return handleUpdateWordSuccess({
      storedWord: storedWord,
      state: state,
      appEl: appEl
    });
  })["catch"](function (err) {
    return handleError(err, {
      state: state,
      appEl: appEl
    });
  });
}
function handleUpdateWordSuccess(_ref12) {
  var storedWord = _ref12.storedWord,
    state = _ref12.state,
    appEl = _ref12.appEl;
  (0,_state__WEBPACK_IMPORTED_MODULE_2__.setWord)(storedWord);
  (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
    state: state,
    appEl: appEl
  });
}
function handleError(err, _ref13) {
  var state = _ref13.state,
    appEl = _ref13.appEl;
  var error = (err === null || err === void 0 ? void 0 : err.error) || 'ERROR';
  var message = _constants__WEBPACK_IMPORTED_MODULE_3__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_3__.MESSAGES["default"];
  (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)(message);
  (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
    state: state,
    appEl: appEl
  });
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function render(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n    ".concat(getErrorHtml(state), "\n    ").concat(getLoginHtml(state), "\n    ").concat(getLogoutHtml(state), "\n    ").concat(getWordHtml(state), "\n    ");
  appEl.innerHTML = html;
}
function getLoginHtml(state) {
  if (state.isLoggedIn) {
    return "";
  }
  return "\n    <div class=\"login\">\n        <form class=\"login-form\" action=\"#/login\">\n            <label class=\"form-label\">\n                <span>Username:</span>\n                <input class=\"login-username\" name=\"username\"/>\n            </label>\n            <button type=\"submit\" class=\"form-btn\">Submit</button>\n        </form>\n    </div>\n    ";
}
function getLogoutHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n    <div class=\"logout\">\n        <form class=\"logout-form\" action=\"#/logout\">\n            <button type=\"submit\" class=\"logout-btn\">Logout</button>\n        </form>\n    </div>\n    ";
}
function getWordHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n    <div class=\"word\">\n        <p>Username: ".concat(state.username, "</p>\n        <p>Stored Word: ").concat(state.word, "</p>\n        <form class=\"word-form\" action=\"#/store\">\n            <label>\n                <span>Update your stored word: </span>\n                <input class=\"word-input\" name=\"storedWord\"/>\n            </label>\n            <button class=\"form-btn\" type=\"submit\">Submit</button>\n        </form>\n    </div>\n    ");
}
function getErrorHtml(state) {
  return "\n    <div class=\"error\">".concat(state.error, "</div>\n");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchUpdateWord: () => (/* binding */ fetchUpdateWord),
/* harmony export */   fetchWord: () => (/* binding */ fetchWord)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions
function fetchSession() {
  return _fetchSession.apply(this, arguments);
}
function _fetchSession() {
  _fetchSession = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var response, err;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return fetch('/api/session', {
            method: "GET"
          });
        case 3:
          response = _context.sent;
          _context.next = 11;
          break;
        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          _context.next = 10;
          return Promise.reject({
            error: "networkError"
          });
        case 10:
          response = _context.sent;
        case 11:
          if (!response.ok) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", response.json());
        case 13:
          _context.prev = 13;
          _context.next = 16;
          return response.json();
        case 16:
          err = _context.sent;
          _context.next = 24;
          break;
        case 19:
          _context.prev = 19;
          _context.t1 = _context["catch"](13);
          _context.next = 23;
          return Promise.reject({
            error: _context.t1
          });
        case 23:
          err = _context.sent;
        case 24:
          _context.next = 26;
          return Promise.reject(err);
        case 26:
          return _context.abrupt("return", _context.sent);
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 6], [13, 19]]);
  }));
  return _fetchSession.apply(this, arguments);
}
function fetchLogin(_x) {
  return _fetchLogin.apply(this, arguments);
}
function _fetchLogin() {
  _fetchLogin = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(username) {
    var response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return fetch('/api/session/', {
            method: 'POST',
            headers: {
              'content-type': 'application/json' // set this header when sending JSON in the body of request
            },
            body: JSON.stringify({
              username: username
            })
          });
        case 3:
          response = _context2.sent;
          _context2.next = 11;
          break;
        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 10;
          return Promise.reject({
            error: 'network-error'
          });
        case 10:
          response = _context2.sent;
        case 11:
          if (response.ok) {
            _context2.next = 13;
            break;
          }
          return _context2.abrupt("return", response.json().then(function (err_1) {
            return Promise.reject(err_1);
          }));
        case 13:
          _context2.next = 15;
          return response.json();
        case 15:
          return _context2.abrupt("return", _context2.sent);
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 6]]);
  }));
  return _fetchLogin.apply(this, arguments);
}
function fetchLogout() {
  return _fetchLogout.apply(this, arguments);
}
function _fetchLogout() {
  _fetchLogout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var response;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return fetch('/api/session', {
            method: 'DELETE'
          });
        case 3:
          response = _context3.sent;
          _context3.next = 11;
          break;
        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 10;
          return Promise.reject({
            error: 'netword-error'
          });
        case 10:
          response = _context3.sent;
        case 11:
          if (response.ok) {
            _context3.next = 13;
            break;
          }
          return _context3.abrupt("return", response.json().then(function (err_1) {
            return Promise.reject(err_1);
          }));
        case 13:
          _context3.next = 15;
          return response.json();
        case 15:
          return _context3.abrupt("return", _context3.sent);
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 6]]);
  }));
  return _fetchLogout.apply(this, arguments);
}
function fetchWord() {
  return _fetchWord.apply(this, arguments);
}
function _fetchWord() {
  _fetchWord = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var response;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return fetch('/api/word', {
            method: "GET"
          });
        case 3:
          response = _context4.sent;
          _context4.next = 11;
          break;
        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          _context4.next = 10;
          return Promise.reject({
            error: "networkError"
          });
        case 10:
          response = _context4.sent;
        case 11:
          if (response.ok) {
            _context4.next = 13;
            break;
          }
          return _context4.abrupt("return", response.json().then(function (err) {
            return Promise.reject(err);
          }));
        case 13:
          _context4.next = 15;
          return response.json();
        case 15:
          return _context4.abrupt("return", _context4.sent);
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 6]]);
  }));
  return _fetchWord.apply(this, arguments);
}
function fetchUpdateWord(_x2) {
  return _fetchUpdateWord.apply(this, arguments);
}
function _fetchUpdateWord() {
  _fetchUpdateWord = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(word) {
    var dataToSend, response;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          dataToSend = word === '' ? undefined : {
            word: word
          };
          _context5.prev = 1;
          _context5.next = 4;
          return fetch('/api/word', {
            method: 'PUT',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
          });
        case 4:
          response = _context5.sent;
          _context5.next = 12;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](1);
          _context5.next = 11;
          return Promise.reject({
            error: 'networkError'
          });
        case 11:
          response = _context5.sent;
        case 12:
          if (response.ok) {
            _context5.next = 14;
            break;
          }
          return _context5.abrupt("return", response.json().then(function (err_1) {
            return Promise.reject(err_1);
          }));
        case 14:
          _context5.next = 16;
          return response.json();
        case 16:
          return _context5.abrupt("return", _context5.sent);
        case 17:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 7]]);
  }));
  return _fetchUpdateWord.apply(this, arguments);
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setWord: () => (/* binding */ setWord)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");



var state = {
  word: "",
  isLoggedIn: false,
  username: "",
  error: ""
};
function login(username) {
  state.isLoggedIn = true;
  state.username = username;
  state.error = "";
}
function logout() {
  state.isLoggedIn = false;
  state.username = "";
  state.word = "";
  state.error = "";
}
function setWord(word) {
  state.word = word;
  state.error = "";
}
function setError(error) {
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _listener__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listener */ "./src/listener.js");







var appEl = document.querySelector('#app');
function initApp() {
  (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
    state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
    appEl: appEl
  });
  (0,_listener__WEBPACK_IMPORTED_MODULE_4__.addLoginListener)({
    state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
    appEl: appEl
  });
  (0,_listener__WEBPACK_IMPORTED_MODULE_4__.addLogoutListener)({
    state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
    appEl: appEl
  });
  (0,_listener__WEBPACK_IMPORTED_MODULE_4__.addWordListenser)({
    state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
    appEl: appEl
  });
  checkSession();
}
function checkSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchSession)().then(handleSessionSuccess)["catch"](handleSessionError);
}
function handleSessionSuccess(session) {
  (0,_state__WEBPACK_IMPORTED_MODULE_0__.login)(session.username);
  (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
    state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
    appEl: appEl
  });
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchWord)().then(handleWordSuccess)["catch"](handleError);
}
function handleSessionError(err) {
  handleError(err);
}
function handleWordSuccess(response) {
  (0,_state__WEBPACK_IMPORTED_MODULE_0__.setWord)(response.storedWord);
  (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
    state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
    appEl: appEl
  });
}
function handleError(err) {
  var error = (err === null || err === void 0 ? void 0 : err.error) || 'ERROR';
  var message = _constants__WEBPACK_IMPORTED_MODULE_2__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_2__.MESSAGES["default"];
  if (error === _constants__WEBPACK_IMPORTED_MODULE_2__.CLIENT.NO_SESSION) {
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.logout)();
  } else {
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)(message);
  }
  (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
    state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
    appEl: appEl
  });
}
initApp();
})();

/******/ })()
;
//# sourceMappingURL=app.js.map