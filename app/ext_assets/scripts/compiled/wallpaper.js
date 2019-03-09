"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/************
 *  Fetch Background image request from Unsplash
 * ********/

(function () {

  // Update Badge with upcoming Tasks
  var upcoming_tasks = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var data, currentDate, upcoming;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return __read_DB("Product");

            case 2:
              data = _context3.sent;
              currentDate = new Date();

              currentDate = currentDate.getFullYear() + "-" + (currentDate.getMonth().toString().length == 1 ? "0" + currentDate.getMonth() : currentDate.getMonth()) + "-" + (currentDate.getDate().toString().length == 1 ? "0" + currentDate.getDate() : currentDate.getDate());
              upcoming = data.filter(function (value, index, arr) {
                if (value.Timeline != undefined) {
                  if (value.Timeline.endDate == currentDate) {
                    return value;
                  }
                }
              });


              if (upcoming.length.toString() != 0) {
                chrome.browserAction.setBadgeText({ text: upcoming.length.toString() });
                chrome.browserAction.setBadgeBackgroundColor({ color: "#fa5252" });
              }

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function upcoming_tasks() {
      return _ref3.apply(this, arguments);
    };
  }();

  // Wallpaper config
  var wallpaperQuery = localStorage.getItem('DOG_Wallpaper_Category') || "Nature";
  var unsplashAPIConfig = {
    query: wallpaperQuery,
    featured: true,
    orientation: "landscape",
    width: 1500,
    key: "6bf5d1667179306d00b370fb1b980230b6ee65b5a4bd7de73eebd5046e30f8cb",
    count: 1

    // Covert to Blob
  };var covertToBlob = function covertToBlob(data) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", data[0].urls.custom, true);
    // Set the responseType to blob
    xhr.responseType = "blob";
    xhr.addEventListener("load", function () {
      if (xhr.status === 200) {
        // File as response
        var blob = xhr.response;
        // Put the received blob into IndexedDB
        var imgURL = URL.createObjectURL(blob);

        update_Wallpaper_DB(imgURL, data);
      }
    }, false);
    // Send XHR
    xhr.send();
  };
  // Check for DB
  var update_Wallpaper_DB = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(blob, data) {
      var isBG_There, isBG_Updated, isBG_Added;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return __read_DB("wallpaper");

            case 2:
              isBG_There = _context.sent;

              if (!isBG_There.length) {
                _context.next = 9;
                break;
              }

              _context.next = 6;
              return __update_DB("wallpaper", {
                Id: 1
              }, {
                Blob: blob,
                Author: data[0].user.name,
                Link: data[0].links.html
              });

            case 6:
              isBG_Updated = _context.sent;
              _context.next = 12;
              break;

            case 9:
              _context.next = 11;
              return __add_Item_DB("wallpaper", [{
                Blob: blob,
                Author: data[0].user.name,
                Link: data[0].links.html
              }]);

            case 11:
              isBG_Added = _context.sent;

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function update_Wallpaper_DB(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  // Request for wallpaper
  var __request_Wallpaper = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var image_URL;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              image_URL = 'https://api.unsplash.com/photos/random?query=' + unsplashAPIConfig.query + '&count=' + unsplashAPIConfig.count + '&featured=' + unsplashAPIConfig.featured + '&w=' + unsplashAPIConfig.width + '&orientation=' + unsplashAPIConfig.orientation + '&client_id=' + unsplashAPIConfig.key;

              fetch(image_URL).then(function (response) {
                return response.json();
              }).then(function (res) {
                covertToBlob(res);
              }).catch(function (error) {
                console.error(error, "error");
              });

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function __request_Wallpaper() {
      return _ref2.apply(this, arguments);
    };
  }();
  // Request for wallpaper when new tab open
  chrome.tabs.onCreated.addListener(function (tab) {
    if (tab.active) {
      __request_Wallpaper();
    }
  });

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type == "badge") {
      upcoming_tasks();
    }
  });

  upcoming_tasks();
})();
//# sourceMappingURL=wallpaper.js.map
