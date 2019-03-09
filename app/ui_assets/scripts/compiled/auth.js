"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
* @Author: Pawan Gujral <codedoodler>
* @Date:   2018-08-08T05:47:42-04:00
* @Email:  goofyCoder.com
* @Last modified by:   codedoodler
* @Last modified time: 2018-08-10T12:49:36-04:00
*/

//e:g notify("PIN is incorrect", "error");
function notify(text, type) {
  var notify_Block = document.createElement("DIV");
  notify_Block.classList.add("notification");
  notify_Block.style.display = "block";
  notify_Block.innerHTML = "<p class=\"" + type + "\">" + text + "</p>";
  document.body.appendChild(notify_Block);

  setTimeout(function () {
    notify_Block.remove();
  }, 3000);
}

(function () {
  "use strict";

  var _this = this;

  // Keyboard trigger
  var auth_trigger_keyboard = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(e) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (e.keyCode == 13) {
                if (signIn_Block.style.display == "block") {
                  if (key_counter <= 4) {
                    notify("Enter all 4 digits", "error");
                  } else {
                    user.SignIn(e);
                  }
                } else if (signUp_Block.style.display == "block") {
                  signUp_Submit.click();
                }
              } else if (e.keyCode >= 48 && e.keyCode <= 57) {
                passcode_Trigger(e);
              }

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function auth_trigger_keyboard(_x3) {
      return _ref6.apply(this, arguments);
    };
  }();

  var signIn_Block = document.querySelector("#signIn_Block");
  var signIn_Block_Codes = signIn_Block.querySelector(".auth_code");
  var allSpan = signIn_Block_Codes.querySelectorAll("span");
  var avatar_Block = document.querySelector(".avatar-Block");
  var signUp_Block = document.querySelector("#signUp_Block");
  var signUp_Submit = document.querySelector("#signUp_Submit");

  var user = {
    Auth: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var isAuth_Data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return __read_DB("Auth");

              case 2:
                isAuth_Data = _context.sent;


                if (isAuth_Data.length) {
                  signIn_Block.style.display = "block";
                  document.querySelector(".user_name").textContent = isAuth_Data[0].Name;
                } else {
                  signUp_Block.style.display = "block";
                  document.querySelector("#name_Input").focus();
                }
                __render_Wallpaper();

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      function Auth() {
        return _ref.apply(this, arguments);
      }

      return Auth;
    }(),
    SignUp: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
        var all_Inputs;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e.preventDefault();
                all_Inputs = signUp_Block.querySelectorAll("input");

                validateForm(all_Inputs).then(function (res) {
                  console.log(res);
                  if (document.querySelector(".selected")) {
                    var avatar = document.querySelector(".selected img").getAttribute("src");
                    res.Avatar = JSON.stringify(avatar);
                    return res;
                  } else {
                    notify("Don't forget to select your avatar", "error");
                    return false;
                  }
                }).then(function (data) {
                  console.log(data);
                  if (data) {
                    add_User_To_DB(data);
                  }
                }).catch(function (err) {
                  notify(err, "error");
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      function SignUp(_x) {
        return _ref2.apply(this, arguments);
      }

      return SignUp;
    }(),
    SignIn: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
        var isRecord_Exists, auth_Pin, isAuth_Valided, isLogged_Out;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return __read_DB("Auth");

              case 2:
                isRecord_Exists = _context3.sent;

                if (!isRecord_Exists.length) {
                  _context3.next = 14;
                  break;
                }

                auth_Pin = isRecord_Exists[0].Pin;
                _context3.next = 7;
                return check_Auth(user_Entered_Code, auth_Pin);

              case 7:
                isAuth_Valided = _context3.sent;

                if (!isAuth_Valided) {
                  _context3.next = 14;
                  break;
                }

                _context3.next = 11;
                return __update_DB("Auth", {
                  Id: 1
                }, {
                  Logged: true
                });

              case 11:
                isLogged_Out = _context3.sent;

                if (isLogged_Out) {
                  window.location = "work.html";
                } else {
                  notify("Something went wrong error, Try again.", "error");
                }
                window.location = "work.html";

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }));

      function SignIn(_x2) {
        return _ref3.apply(this, arguments);
      }

      return SignIn;
    }(),
    UpcomingTasks: function UpcomingTasks() {}
  };

  document.addEventListener("keypress", auth_trigger_keyboard);
  signUp_Submit.addEventListener("click", user.SignUp);
  avatar_Block.addEventListener("click", avatar_Select);

  function avatar_Select(e) {
    if (e.target.nodeName == "IMG") {
      var all_Avatar = avatar_Block.querySelectorAll("LI");
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = all_Avatar[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var a = _step.value;

          a.classList.remove("selected");
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      e.target.parentElement.classList.add("selected");
    }
  };

  var check_Auth = function check_Auth(user_Input, db_Input) {
    var count = 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = user_Input.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _ref4 = _step2.value;

        var _ref5 = _slicedToArray(_ref4, 2);

        var index = _ref5[0];
        var a = _ref5[1];

        if (user_Input[index] == db_Input[index]) {
          count++;
        } else {
          notify("Incorrect PIN, Try again.", "error");
          clear();
          return false;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    if (count == 4) {
      return true;
    }
  };

  var key_counter = 1;
  var user_Entered_Code = [];

  var passcode_Trigger = function passcode_Trigger(e) {
    if (key_counter <= 4) {
      var capture_UI_Elem = signIn_Block_Codes.querySelector("[data-count=\"" + key_counter + "\"]");
      capture_UI_Elem.setAttribute("data-keyCode", e.keyCode);
      capture_UI_Elem.removeAttribute("data-animate");
      if (capture_UI_Elem.nextElementSibling) {
        capture_UI_Elem.nextElementSibling.setAttribute("data-animate", "icon");
      }
      user_Entered_Code.push(parseInt(e.key));
      key_counter++;
    }
  };
  // validate email
  var validateForm = function validateForm(Inputs) {
    return new Promise(function (resolve, reject) {
      var input_Serialize = {};
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Inputs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var a = _step3.value;

          if (a.value == "") {
            reject(a.getAttribute("data-error"));
          } else if (a.getAttribute("name") == "Email") {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(a.value)) {
              reject("Email Should be valid");
            } else {
              input_Serialize["Email"] = a.value;
            }
          } else {
            var input_Name = a.getAttribute("name");
            input_Serialize[input_Name] = a.value;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      resolve(input_Serialize);
    });
  };

  var add_User_To_DB = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(data) {
      var isUser_Added;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              console.log([parseInt(data.Pin_1), parseInt(data.Pin_2), parseInt(data.Pin_3), parseInt(data.Pin_4)]);
              _context5.next = 3;
              return __add_Item_DB("Auth", [{
                Name: data.Name,
                Email: data.Email,
                Avatar: data.Avatar,
                Pin: [parseInt(data.Pin_1), parseInt(data.Pin_2), parseInt(data.Pin_3), parseInt(data.Pin_4)],
                Logged: false
              }]);

            case 3:
              isUser_Added = _context5.sent;


              if (isUser_Added) {
                window.location.reload();
              }

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function add_User_To_DB(_x4) {
      return _ref7.apply(this, arguments);
    };
  }();
  // Check image blob
  var ImageChecker = function ImageChecker(Data) {
    var img_Blob = new Image();
    img_Blob.onload = function () {
      document.body.style.backgroundImage = "url(\"" + Data[0].Blob + "\")";
      document.querySelector(".unsplash_copyright").innerHTML = "Photo by\n      <a href=\"" + Data[0].Link + "?utm_source=DOG&utm_medium=referral\" target=\"_blank\">" + Data[0].Author + "</a>\n      on\n      <a href=\"https://unsplash.com/?utm_source=DOG&utm_medium=referral\" target=\"_blank\">Unsplash</a>\n      ";
    };
    img_Blob.onerror = function () {
      document.body.style.backgroundImage = 'url("ext_assets/images/bg.jpg")';
      document.querySelector(".unsplash_copyright").innerHTML = "Image from\n      <a href=\"https://unsplash.com/?utm_source=DOG&utm_medium=referral\" target=\"_blank\">Unsplash</a>\n      ";
    };
    img_Blob.src = Data[0].Blob;
  };
  // wallpaper render
  var __render_Wallpaper = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var img_Data;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return __read_DB("wallpaper");

            case 2:
              img_Data = _context6.sent;


              if (img_Data.length) {
                ImageChecker(img_Data);
              } else {
                document.body.style.backgroundImage = 'url("ext_assets/images/bg.jpg")';
                document.querySelector(".unsplash_copyright").innerHTML = "Photo by\n      <a href=\"https://unsplash.com/photos/n3XTxxV7qhI?utm_source=DOG&amp;utm_medium=referral\" target=\"_blank\">Faye Cornish</a>\n      on\n      <a href=\"https://unsplash.com/?utm_source=DOG&utm_medium=referral\" target=\"_blank\">Unsplash</a>\n      ";
              }

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function __render_Wallpaper() {
      return _ref8.apply(this, arguments);
    };
  }();
  // Render auth

  user.Auth();

  /*
  * extension communication
  */

  // Send Request to Background Js
  var request_Background = function request_Background(action, data, callback) {
    chrome.runtime.sendMessage({
      action: action
    }, callback);
  };

  /*
  * settings
  */

  document.addEventListener("keyup", function (e) {
    clear_PassCode_Box(e);
  });

  var clear_PassCode_Box = function clear_PassCode_Box(e) {
    if (e.keyCode == 27 || e.keyCode == 8) {
      clear();
    }
  };

  function clear() {
    if (signIn_Block.style.display == "block") {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = allSpan[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var a = _step4.value;

          a.removeAttribute("data-keycode");
          a.removeAttribute("data-animate");
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      key_counter = 1;
      user_Entered_Code = [];
    }
  }
})();
//# sourceMappingURL=auth.js.map
