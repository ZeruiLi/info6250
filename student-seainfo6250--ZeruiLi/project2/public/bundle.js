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
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_TASK: 'required-task',
  TASK_MISSING: 'noSuchId'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network.  Please try again'), SERVER.AUTH_INSUFFICIENT, 'Your username/password combination does not match any records, please try again.'), SERVER.REQUIRED_USERNAME, 'Please enter a valid (letters and/or numbers) username'), SERVER.REQUIRED_TASK, 'Please enter the task to do'), "default", 'Something went wrong.  Please try again');

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addLoginListener: () => (/* binding */ addLoginListener),
/* harmony export */   addLogoutListener: () => (/* binding */ addLogoutListener),
/* harmony export */   addPostMessageListener: () => (/* binding */ addPostMessageListener)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "./src/state.js");





function addLoginListener(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl,
    chatEl = _ref.chatEl;
  appEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("login-form")) {
      return;
    }
    var username = appEl.querySelector(".login-username").value;
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.waitOnChat)();
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
      state: state,
      appEl: appEl,
      chatEl: chatEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function () {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.login)(username);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl,
        chatEl: chatEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl,
        chatEl: chatEl
      });
    });
  });
}
function addLogoutListener(_ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl,
    chatEl = _ref2.chatEl;
  appEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("logout-form")) {
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.logout)();
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
      state: state,
      appEl: appEl,
      chatEl: chatEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)()["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl,
        chatEl: chatEl
      });
    });
  });
}
function addPostMessageListener(_ref3) {
  var state = _ref3.state,
    appEl = _ref3.appEl,
    chatEl = _ref3.chatEl;
  appEl.addEventListener("submit", function (e) {
    if (!e.target.classList.contains("chat-form")) {
      return;
    }
    var message = appEl.querySelector(".message").value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchPostMessage)(message).then(function (messages) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setMessages)(messages);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl,
        chatEl: chatEl
      });
    })["catch"](function (err) {
      console.log(err);
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl,
        chatEl: chatEl
      });
    });
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
    appEl = _ref.appEl,
    chatEl = _ref.chatEl;
  var html = "\n      ".concat(generateErrorHtml(state), "\n      <div class=\"login-info\">\n        ").concat(generateLoginHtml(state), "\n        ").concat(generateLogoutHtml(state), "\n      </div>\n      ").concat(generateOutgoingHtml(state), "\n      ").concat(generateLoadingHtml(state), "\n    ");
  appEl.innerHTML = html;
  var chatHtml = "\n      ".concat(generateUserListHtml(state), "\n      ").concat(generateMessageListHtml(state), "\n    ");
  chatEl.innerHTML = chatHtml;
  scrollToBottom(chatEl);
}
function generateErrorHtml(state) {
  if (!state.error) {
    return "";
  }
  return "<div class=\"error\">".concat(state.error, "</div>");
}
function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return "<div class=\"waiting\">Loading user...</div>";
  }
  if (state.isLoggedIn) {
    return "<div class=\"login-user\">".concat(state.username, "</div>");
  }
  return "\n      <div class=\"login\">\n        <form class=\"login-form\" action=\"#/login\">\n          <label class=\"form-label\">\n            <span>Username:</span>\n            <input class=\"login-username\" name=\"username\"/>\n          </label>\n          <button type=\"submit\" class=\"form-btn\">Submit</button>\n        </form>\n      </div>\n    ";
}
function generateLogoutHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n      <div class=\"logout\">\n        <form class=\"logout-form\" action=\"#/logout\">\n          <button type=\"submit\" class=\"logout-btn\">Logout</button>\n        </form>\n      </div>\n    ";
}
function generateOutgoingHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n      <div class=\"outgoing\">\n        <form class=\"chat-form\" action=\"/chat\" method=\"POST\">\n          <input class=\"message\" name=\"message\" value=\"\" placeholder=\"Enter message to send\"/>\n          <button type=\"submit\">Send</button>\n        </form>\n      </div>\n    ";
}
function generateLoadingHtml(state) {
  if (state.isChatPending) {
    return "<div class=\"waiting\">Loading Chat...</div>";
  }
  return "";
}
function generateUserListHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n      <ul class=\"users\">\n        <h1>Current Login Users</h2>\n        ".concat(Object.values(state.users).map(function (user) {
    return "\n              <li>\n                <div class=\"user\">\n                  <img class=\"avatar\" alt=\"avatar of ".concat(user, "\" src=\"http://placekitten.com/150/150\"/>\n                  <span class=\"username\">").concat(user, "</span>\n                </div>\n              </li>\n            ");
  }).join(""), "\n      </ul>\n    ");
}
function generateMessageListHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n      <ol class=\"messages\">\n        <h1>Messages</h2>\n        ".concat(state.messages.map(function (message) {
    return "\n              <li>\n                <div class=\"message\">\n                  <div class=\"sender-info\">\n                    <img class=\"avatar\" alt=\"avatar of ".concat(message.sender, "\" src=\"http://placekitten.com/150/150\"/>\n                    <span class=\"username\">").concat(message.sender, "</span>\n                  </div>\n                  <p class=\"message-text\">").concat(message.text, "</p>\n                </div>\n              </li>\n            ");
  }).join(""), "\n      </ol>\n    ");
}
function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight;
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
/* harmony export */   fetchLoginUsers: () => (/* binding */ fetchLoginUsers),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchMessages: () => (/* binding */ fetchMessages),
/* harmony export */   fetchPostMessage: () => (/* binding */ fetchPostMessage),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");



function fetchLogin(username) {
  return fetch("/api/v1/session", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json"
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NETWORK_ERROR
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogout() {
  return fetch("/api/v1/session", {
    method: "DELETE"
  })["catch"](function (err) {
    return Promise.reject({
      error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NETWORK_ERROR
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchSession() {
  return fetch("/api/v1/session", {
    method: "GET"
  })["catch"](function () {
    return Promise.reject({
      error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NETWORK_ERROR
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    if (response.status === 401) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_0__.SERVER.AUTH_MISSING
      });
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLoginUsers() {
  return fetch("/api/v1/users", {
    method: "GET"
  })["catch"](function (err) {
    return Promise.reject({
      error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NETWORK_ERROR
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchMessages() {
  return fetch("/api/v1/messages", {
    method: "GET"
  })["catch"](function (err) {
    return Promise.reject({
      error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NETWORK_ERROR
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchPostMessage(message) {
  return fetch("/api/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      message: message
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NETWORK_ERROR
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
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
/* harmony export */   setLoginUsers: () => (/* binding */ setLoginUsers),
/* harmony export */   setMessages: () => (/* binding */ setMessages),
/* harmony export */   waitOnChat: () => (/* binding */ waitOnChat),
/* harmony export */   waitOnLogin: () => (/* binding */ waitOnLogin)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");



var state = {
  isLoggedIn: false,
  isLoginPending: false,
  isChatPending: false,
  username: "",
  error: "",
  users: {},
  messages: []
};
function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = "";
  state.users = {};
  state.messages = [];
  state.error = "";
}
function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = "";
}
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = "";
  state.error = "";
}
function waitOnChat() {
  state.users = {};
  state.messages = [];
  state.isChatPending = true;
  state.error = "";
}
function setLoginUsers(data) {
  state.isChatPending = false;
  state.users = data;
  state.error = "";
}
function setMessages(data) {
  state.isChatPending = false;
  state.messages = data;
  state.error = "";
}
function setError(error) {
  if (!error) {
    state.error = "";
    return;
  }
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
  state.isLoginPending = false;
  state.isChatPending = false;
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
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "./src/constants.js");







var appEl = document.querySelector("#app");
var chatEl = document.querySelector("#chat");
(0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl,
  chatEl: chatEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_2__.addLoginListener)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl,
  chatEl: chatEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_2__.addLogoutListener)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl,
  chatEl: chatEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_2__.addPostMessageListener)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl,
  chatEl: chatEl
});
checkForSession();
pollData();
function pollData() {
  refreshData();
  setTimeout(pollData, 5000);
}
function refreshData() {
  if (!_state__WEBPACK_IMPORTED_MODULE_1__["default"].isLoggedIn) {
    return;
  }
  (0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchLoginUsers)().then(function (users) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setLoginUsers)(users);
    return (0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchMessages)();
  })["catch"](function (err) {
    return Promise.reject(err);
  }).then(function (messages) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
    (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl,
      chatEl: chatEl
    });
  })["catch"](function (err) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
    (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl,
      chatEl: chatEl
    });
  });
}
function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchSession)().then(function (session) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(session.username);
    (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl,
      chatEl: chatEl
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchLoginUsers)();
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_4__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_4__.CLIENT.NO_SESSION
      });
    }
    return Promise.reject(err);
  }).then(function (users) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setLoginUsers)(users);
    return (0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchMessages)();
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_4__.CLIENT.NO_SESSION) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl,
        chatEl: chatEl
      });
      return Promise.reject(err);
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
    (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl,
      chatEl: chatEl
    });
    return Promise.reject(err);
  });
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map