"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
* @Author: Pawan Gujral <goofyCoder>
* @Date:   2018-08-08T05:47:42-04:00
* @Email:  goofyCoder.com
* @Last modified by:   codedoodler
* @Last modified time: 2018-08-11T04:29:19-04:00
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
  /*
  * Folder code
  */
  "use strict";

  var _this = this;

  var app = {
    validate: function () {
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
                  if (isAuth_Data[0].Logged) {
                    document.querySelector(".header-menu").innerHTML = "<p>\n          <span class=\"user-name\">Woof, <em>" + isAuth_Data[0].Name + "</em></span>\n          <img src=\"" + JSON.parse(isAuth_Data[0].Avatar) + "\" class=\"user-avatar\" alt=\"\" />\n          </p>";
                    // ON Load / refresh detch Folder Data
                    folder.Render();
                  } else {
                    window.location = "index.html";
                  }
                } else {
                  window.location = "index.html";
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      function validate() {
        return _ref.apply(this, arguments);
      }

      return validate;
    }(),
    Quit: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var isLogged_Out;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return __update_DB("Auth", {
                  Id: 1
                }, {
                  Logged: false
                });

              case 2:
                isLogged_Out = _context2.sent;

                if (isLogged_Out) {
                  window.location = "index.html";
                } else {
                  notify("Something went wrong", "error");
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      function Quit() {
        return _ref2.apply(this, arguments);
      }

      return Quit;
    }()
  };

  app.validate();

  /*
  * Folder code
  */

  var folder_block = document.querySelector("#folder_block");
  var folder_Block_List = folder_block.querySelector(".folder_block_articles");
  var folder_Modal_Btn = folder_block.querySelector(".show_folder_modal");
  var folder_Submit_Btn = document.querySelector("#btn_add_folder");
  var group_label = document.querySelector(".label-group");
  var task_Modal_Btn = document.querySelector(".show_task_modal");

  var folder = {
    Render: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var folders_Data, isFolder_Rendered, today_Date;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return __read_DB("Product", { "Type": "Folder" });

              case 2:
                folders_Data = _context3.sent;

                if (!folders_Data.length) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 6;
                return folder.Set(folders_Data);

              case 6:
                isFolder_Rendered = _context3.sent;

                folder_block.querySelector(".help-message").style.display = "none";
                if (isFolder_Rendered) {
                  folder_Block_List.querySelector('P').click();
                }
                _context3.next = 19;
                break;

              case 11:
                folder_Block_List.innerHTML = "";
                task_List.innerHTML = "";
                todo_List.innerHTML = "";
                notes_List.innerHTML = "";
                todo_Block.style.display = "none";
                notes_Block.style.display = "none";
                folder_block.querySelector(".help-message").style.display = "block";
                folder_Modal_Btn.click();

              case 19:
                today_Date = parseToday(new Date());

                document.body.setAttribute("data-today", today_Date);

              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }));

      function Render() {
        return _ref3.apply(this, arguments);
      }

      return Render;
    }(),
    Set: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
        var filtered_Data, parsedDate, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref5, _ref6, index, a, isListExist, list, _folder, title, _list;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log(data);
                folder_Block_List.innerHTML = "";
                filtered_Data = data.filter(function (value, index, arr) {
                  if (value.Type == "Folder") return value;
                });
                parsedDate = void 0;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context4.prev = 7;
                _iterator = filtered_Data.entries()[Symbol.iterator]();

              case 9:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context4.next = 38;
                  break;
                }

                _ref5 = _step.value;
                _ref6 = _slicedToArray(_ref5, 2);
                index = _ref6[0];
                a = _ref6[1];
                isListExist = document.querySelector("[data-group-name=\"" + a.Group + "\"]");

                if (!(isListExist != null)) {
                  _context4.next = 23;
                  break;
                }

                list = document.createElement("ol");
                _context4.next = 19;
                return parseDate(a.Date);

              case 19:
                parsedDate = _context4.sent;

                isListExist.querySelector('ol').innerHTML += "<li data-id=\"" + a.Id + "\" data-group=\"" + a.Group + "\" data-folder=\"" + a.Folder + "\" data-type=\"folder\"><p>" + a.Folder + "</p>\n          <span class=\"edit_Folder\"></span>\n          <span class=\"delete_Task\"></span>\n          <small>" + parsedDate + "</small></li>";
                _context4.next = 35;
                break;

              case 23:
                _folder = document.createElement("article");
                title = document.createElement("h4");
                _list = document.createElement("ol");

                _folder.setAttribute("data-group-name", a.Group);
                title.textContent = a.Group;
                _context4.next = 30;
                return parseDate(a.Date);

              case 30:
                parsedDate = _context4.sent;

                _list.innerHTML += "<li data-id=\"" + a.Id + "\" data-group=\"" + a.Group + "\" data-folder=\"" + a.Folder + "\" data-type=\"folder\" data-text=\"" + a.Folder + "\">\n          <p>" + a.Folder + " </p>\n          <span class=\"edit_Folder\"></span>\n          <span class=\"delete_Task\"></span>\n          <small>" + parsedDate + "</small></li>";
                _folder.appendChild(title);
                _folder.appendChild(_list);
                folder_Block_List.appendChild(_folder);

              case 35:
                _iteratorNormalCompletion = true;
                _context4.next = 9;
                break;

              case 38:
                _context4.next = 44;
                break;

              case 40:
                _context4.prev = 40;
                _context4.t0 = _context4["catch"](7);
                _didIteratorError = true;
                _iteratorError = _context4.t0;

              case 44:
                _context4.prev = 44;
                _context4.prev = 45;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 47:
                _context4.prev = 47;

                if (!_didIteratorError) {
                  _context4.next = 50;
                  break;
                }

                throw _iteratorError;

              case 50:
                return _context4.finish(47);

              case 51:
                return _context4.finish(44);

              case 52:
                return _context4.abrupt("return", true);

              case 53:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this, [[7, 40, 44, 52], [45,, 47, 51]]);
      }));

      function Set(_x) {
        return _ref4.apply(this, arguments);
      }

      return Set;
    }(),
    Add: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var group_Input, folder_Input, isFolder_Exists, isAdded, isUpdated;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                group_Input = document.querySelector("#group_Input");
                folder_Input = document.querySelector("#folder_Input");

                if (!(group_Input.value != "" && folder_Input.value != "")) {
                  _context5.next = 25;
                  break;
                }

                if (!(folder_Submit_Btn.getAttribute("data-type") == "create")) {
                  _context5.next = 17;
                  break;
                }

                _context5.next = 6;
                return __read_DB("Product", {
                  "Group": group_Input.value.toLowerCase().trim(),
                  "Folder": folder_Input.value.toLowerCase().trim()
                });

              case 6:
                isFolder_Exists = _context5.sent;

                if (!(isFolder_Exists.length == 0)) {
                  _context5.next = 14;
                  break;
                }

                _context5.next = 10;
                return __add_Item_DB("Product", [{
                  "Group": group_Input.value.toLowerCase().trim(),
                  "Folder": folder_Input.value.toLowerCase().trim(),
                  "Type": "Folder",
                  "Date": new Date()
                }]);

              case 10:
                isAdded = _context5.sent;


                if (isAdded) {
                  clear_Modal();
                  folder.Render();
                }
                _context5.next = 15;
                break;

              case 14:
                notify("Folder already exists", "error");

              case 15:
                _context5.next = 23;
                break;

              case 17:
                if (!(folder_Submit_Btn.getAttribute("data-type") == "update")) {
                  _context5.next = 23;
                  break;
                }

                _context5.next = 20;
                return __update_DB("Product", {
                  "Group": folder_Submit_Btn.getAttribute("data-group"),
                  "Folder": folder_Submit_Btn.getAttribute("data-folder")
                }, {
                  "Group": group_Input.value.toLowerCase().trim(),
                  "Folder": folder_Input.value.toLowerCase().trim()
                });

              case 20:
                isUpdated = _context5.sent;


                console.log(isUpdated);

                if (isUpdated) {
                  clear_Modal();
                  folder.Render();
                }

              case 23:
                _context5.next = 26;
                break;

              case 25:
                notify("Fields can't be empty", "error");

              case 26:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, _this);
      }));

      function Add() {
        return _ref7.apply(this, arguments);
      }

      return Add;
    }(),
    Clicked: function Clicked(e) {
      var $this = e.target;
      if ($this.nodeName == "P" || $this.nodeName == "SMALL") {
        var data_Group = $this.parentElement.getAttribute("data-group");
        var data_Folder = $this.parentElement.getAttribute("data-folder");
        // Set attribute to body element
        document.body.setAttribute("data-group", data_Group);
        document.body.setAttribute("data-folder", data_Folder);

        var all_Folder_Items = folder_block.querySelectorAll("li");

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = all_Folder_Items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var a = _step2.value;

            a.classList.remove("active");
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

        $this.parentElement.classList.add("active");

        task_Modal_Btn.style.display = "block";

        task.Render(data_Group, data_Folder);
      } else if ($this.className == "delete_Task") {
        var _data_Group = $this.parentElement.getAttribute("data-group");
        var _data_Folder = $this.parentElement.getAttribute("data-folder");
        var data_Name = $this.parentElement.children[0].textContent;
        folder.Remove(data_Name, _data_Group, _data_Folder);
      } else if ($this.className == "edit_Folder") {
        var $this_value = $this.parentElement.getAttribute("data-text");
        folder_Modal_Btn.click();
        document.querySelector("#folder_Input").value = $this_value;
        document.querySelector("#group_Input").value = $this.parentElement.getAttribute("data-group");
        folder_Submit_Btn.textContent = "Update Folder";
        folder_Submit_Btn.setAttribute("data-type", "update");
        folder_Submit_Btn.setAttribute("data-id", $this.parentElement.getAttribute("data-id"));
        folder_Submit_Btn.setAttribute("data-group", $this.parentElement.getAttribute("data-group"));
        folder_Submit_Btn.setAttribute("data-folder", $this.parentElement.getAttribute("data-folder"));
        group_label.querySelector("[data-label=" + $this.parentElement.getAttribute("data-group") + "]").classList.add("selected");
      }
    },
    Remove: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(text, groupName, folderName) {
        var conf, isRemove_Done;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                conf = confirm("Do you really want to delete " + text + "?");

                if (!conf) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 4;
                return __remove_Item_DB("Product", {
                  "Group": groupName,
                  "Folder": folderName
                });

              case 4:
                isRemove_Done = _context6.sent;

                if (isRemove_Done) {
                  folder.Render();
                  notify("Successfully Deleled", "info");
                }

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, _this);
      }));

      function Remove(_x2, _x3, _x4) {
        return _ref8.apply(this, arguments);
      }

      return Remove;
    }()
  };

  folder_Submit_Btn.addEventListener("click", folder.Add);
  folder_Block_List.addEventListener("click", folder.Clicked);
  folder_Modal_Btn.addEventListener("click", folder_Modal_Trigger);
  group_label.addEventListener("click", toggle_label_Input);
  // Show folder Modal
  function folder_Modal_Trigger() {
    document.body.classList.add("overlay");
    document.body.addEventListener("click", overlay_clicked);
    document.body.addEventListener("keyup", esc_trigger);
    document.querySelector(".folder_Modal").style.display = "block";
    document.querySelector(".folder_Modal .btn-close").addEventListener("click", close_Modal_Trigger);
    document.querySelector("#folder_Input").focus();
    // document.querySelector("#group_Input").addEventListener("keypress", submit_Folder_Form_OnEnter);
  }
  // On Enter Trigger
  var submit_Folder_Form_OnEnter = function submit_Folder_Form_OnEnter(e) {
    if (e.keyCode == 13) {
      folder_Submit_Btn.click();
    }
  };
  // Fetch group label
  function toggle_label_Input(e) {
    if (e.target.nodeName == "SPAN") {
      if (e.target.textContent != "Other") {
        document.querySelector("#group_Input").setAttribute("type", "hidden");
        document.querySelector("#group_Input").value = e.target.textContent;
      } else {
        document.querySelector("#group_Input").value = "";
        document.querySelector("#group_Input").setAttribute("type", "text");
      }

      var all_Label_Span = document.querySelectorAll(".label-Value");
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = all_Label_Span[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var a = _step3.value;

          a.classList.remove("selected");
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

      e.target.classList.add("selected");
    }
  }

  /*
  * Task Code
  */
  var Task_block = document.querySelector("#task_block");
  var task_List = Task_block.querySelector("#task_list");
  var task_Submit_Btn = document.querySelector("#btn_add_task");
  var todo_Block = document.querySelector(".todo_Block_Todo_List");
  var notes_Block = document.querySelector('.notes_Block_Content');

  var task = {
    Render: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(group, folder) {
        var tasks_Data, filtered_Data, isTask_Rendered;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return __read_DB("Product", {
                  "Group": group,
                  "Folder": folder
                });

              case 2:
                tasks_Data = _context7.sent;

                if (!(tasks_Data.length > 1)) {
                  _context7.next = 11;
                  break;
                }

                filtered_Data = tasks_Data.filter(function (value, index, arr) {
                  if (value.Task != undefined) {
                    return value;
                  }
                });
                _context7.next = 7;
                return task.Set(filtered_Data);

              case 7:
                isTask_Rendered = _context7.sent;

                task_List.querySelector('P').click();
                _context7.next = 17;
                break;

              case 11:
                task_List.innerHTML = "";
                todo_List.innerHTML = "";
                notes_List.innerHTML = "";
                todo_Block.style.display = "none";
                notes_Block.style.display = "none";
                task_block.querySelector(".help-message").style.display = "block";

              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, _this);
      }));

      function Render(_x5, _x6) {
        return _ref9.apply(this, arguments);
      }

      return Render;
    }(),
    Set: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(data) {
        var list, today, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, a, timeLine;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                task_block.querySelector(".help-message").style.display = "none";
                list = Task_block.querySelector("ol");

                list.innerHTML = '';
                today = document.body.getAttribute("data-today");
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context8.prev = 7;
                _iterator4 = data[Symbol.iterator]();

              case 9:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context8.next = 18;
                  break;
                }

                a = _step4.value;
                _context8.next = 13;
                return timeScheduler(today, a.Timeline.startDate, a.Timeline.endDate);

              case 13:
                timeLine = _context8.sent;


                list.innerHTML += "<li data-id=\"" + a.Id + "\" class=\"" + (today == a.Timeline.endDate ? "attention" : "normal") + " " + a.Type + "\" data-status=\"" + a.Type + "\"  data-group=\"" + a.Group + "\" data-folder=\"" + a.Folder + "\" data-type=\"task\" data-startDate=\"" + a.Timeline.startDate + "\"  data-endDate=\"" + a.Timeline.endDate + "\" data-text=\"" + a.Task + "\" data-repeat=\"" + a.Timeline.Repeat + "\">\n        <p>" + a.Task + "</p>\n        <span class=\"edit_Task\"></span>\n        <span class=\"delete_Task\"></span>\n        <small><em>" + timeLine + "</em></small>\n        </li>";

              case 15:
                _iteratorNormalCompletion4 = true;
                _context8.next = 9;
                break;

              case 18:
                _context8.next = 24;
                break;

              case 20:
                _context8.prev = 20;
                _context8.t0 = _context8["catch"](7);
                _didIteratorError4 = true;
                _iteratorError4 = _context8.t0;

              case 24:
                _context8.prev = 24;
                _context8.prev = 25;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 27:
                _context8.prev = 27;

                if (!_didIteratorError4) {
                  _context8.next = 30;
                  break;
                }

                throw _iteratorError4;

              case 30:
                return _context8.finish(27);

              case 31:
                return _context8.finish(24);

              case 32:
                return _context8.abrupt("return", true);

              case 33:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, _this, [[7, 20, 24, 32], [25,, 27, 31]]);
      }));

      function Set(_x7) {
        return _ref10.apply(this, arguments);
      }

      return Set;
    }(),
    Add: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var task_Folder, task_Group, task_Input, startDate_Input, endDate_Input, isExist, isAdded, task_Completed_Checkbox, isUpdated;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                task_Folder = document.body.getAttribute("data-folder");
                task_Group = document.body.getAttribute("data-group");
                task_Input = document.querySelector("#task_Input");
                startDate_Input = document.querySelector("#startDate_Input"); // YYYY-MM-DD

                endDate_Input = document.querySelector("#endDate_Input"); // YYYY-MM-DD

                if (!(task_Input.value != "")) {
                  _context9.next = 16;
                  break;
                }

                if (!(task_Submit_Btn.getAttribute("data-type") == "create")) {
                  _context9.next = 13;
                  break;
                }

                _context9.next = 9;
                return __read_DB("Product", {
                  "Group": task_Group.toLowerCase().trim(),
                  "Folder": task_Folder.toLowerCase().trim(),
                  "Task": task_Input.value.toLowerCase().trim()
                });

              case 9:
                isExist = _context9.sent;


                if (isExist.length == 0) {
                  isAdded = __add_Item_DB("Product", [{
                    "Group": task_Group.toLowerCase().trim(),
                    "Folder": task_Folder.toLowerCase().trim(),
                    "Task": task_Input.value.toLowerCase().trim(),
                    "Date": new Date(),
                    "Type": "Pending",
                    "Timeline": {
                      "startDate": startDate_Input.value,
                      "endDate": endDate_Input.value,
                      "Repeat": false
                    }
                  }]);


                  if (isAdded) {
                    clear_Modal();
                    task.Render(task_Group, task_Folder);
                  }
                } else {
                  notify("Task already exit", "error");
                }
                _context9.next = 14;
                break;

              case 13:
                if (task_Submit_Btn.getAttribute("data-type") == "update") {
                  task_Completed_Checkbox = document.querySelector("#type_Input").checked;
                  isUpdated = __update_DB("Product", {
                    Id: parseInt(task_Submit_Btn.getAttribute("data-id"))
                  }, {
                    "Task": task_Input.value.toLowerCase().trim(),
                    "Type": task_Completed_Checkbox ? "Completed" : "Pending",
                    "Timeline": {
                      "startDate": task_Completed_Checkbox ? "" : startDate_Input.value,
                      "endDate": task_Completed_Checkbox ? "" : endDate_Input.value
                    }
                  });

                  if (isUpdated) {
                    clear_Modal();
                    task.Render(task_Group, task_Folder);
                  }
                }

              case 14:
                _context9.next = 17;
                break;

              case 16:
                notify("Enter Task name", "error");

              case 17:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, _this);
      }));

      function Add() {
        return _ref11.apply(this, arguments);
      }

      return Add;
    }(),
    Clicked: function Clicked(e) {
      var $this = e.target;
      if ($this.nodeName == "P") {
        var task_Id = $this.parentElement.getAttribute("data-id");
        var task_Items = task_block.querySelectorAll("li");

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = task_Items[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var a = _step5.value;

            a.classList.remove("active");
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        $this.parentElement.classList.add("active");
        document.body.setAttribute("data-task-id", task_Id);
        todo_Block.style.display = "block";
        notes_Block.style.display = "block";
        todo.Set(parseInt(task_Id));
        notes.Set(parseInt(task_Id));
      } else if (e.target.className == "delete_Task") {
        task.Remove($this.parentElement.getAttribute("data-group"), $this.parentElement.getAttribute("data-folder"), $this.parentElement.getAttribute("data-id"), $this.parentElement.children[0].textContent);
      } else if (e.target.className == "edit_Task") {
        var $this_value_txt = $this.parentElement.getAttribute("data-text");
        var $this_value_start = $this.parentElement.getAttribute("data-startdate");
        var $this_value_end = $this.parentElement.getAttribute("data-enddate");
        var $this_Status = $this.parentElement.getAttribute("data-status");

        task_Modal_Btn.click();
        document.querySelector("#task_Input").value = $this_value_txt;
        document.querySelector("#startDate_Input").value = $this_value_start;
        document.querySelector("#endDate_Input").value = $this_value_end;
        task_Submit_Btn.textContent = "Update Task";
        task_Submit_Btn.setAttribute("data-type", "update");
        task_Submit_Btn.setAttribute("data-id", $this.parentElement.getAttribute("data-id"));
        document.querySelector("#startDate_Input").addEventListener("change", function (e) {
          document.querySelector("#endDate_Input").setAttribute('min', e.target.value);
        });

        if ($this_Status == "Completed") {
          document.querySelector("#type_Input").checked = true;
        } else {
          document.querySelector("#type_Input").checked = false;
        }
        document.querySelector(".task_Modal .checkbox-group").style.display = "flex";
      }
    },
    Remove: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(group, folder, id, name) {
        var conf, isDeleted;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                conf = confirm("Do you really want to delete " + name + "?");

                if (!conf) {
                  _context10.next = 6;
                  break;
                }

                _context10.next = 4;
                return __remove_Item_DB("Product", {
                  Id: parseInt(id)
                });

              case 4:
                isDeleted = _context10.sent;


                if (isDeleted) {
                  task.Render(group, folder);
                  todo.Set(parseInt(document.body.getAttribute("data-task-Id")));
                  notes.Set(parseInt(document.body.getAttribute("data-task-Id")));
                }

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, _this);
      }));

      function Remove(_x8, _x9, _x10, _x11) {
        return _ref12.apply(this, arguments);
      }

      return Remove;
    }()
  };

  task_Modal_Btn.addEventListener("click", task_Modal_Trigger);
  task_Submit_Btn.addEventListener("click", task.Add);
  task_List.addEventListener("click", task.Clicked);

  // Show Task Modal
  function task_Modal_Trigger() {
    document.body.classList.add("overlay");
    document.body.addEventListener("click", overlay_clicked);
    document.body.addEventListener("keyup", esc_trigger);
    document.querySelector(".task_Modal").style.display = "block";
    document.querySelector(".task_Modal .btn-close").addEventListener("click", close_Modal_Trigger);
    document.querySelector("#task_Input").focus();
    document.querySelector("#task_Input").addEventListener("keypress", submit_Task_Form_OnEnter);

    var currentDate = new Date();
    currentDate = currentDate.getFullYear() + "-" + (currentDate.getMonth().toString().length == 1 ? "0" + currentDate.getMonth() : currentDate.getMonth()) + "-" + (currentDate.getDate().toString().length == 1 ? "0" + currentDate.getDate() : currentDate.getDate());
    document.querySelector("#startDate_Input").setAttribute('min', currentDate);
    document.querySelector("#endDate_Input").setAttribute('min', currentDate);
    document.querySelector("#startDate_Input").value = currentDate;
    document.querySelector("#startDate_Input").addEventListener("change", function (e) {
      document.querySelector("#endDate_Input").setAttribute('min', e.target.value);
    });
  }
  // Submit Task from enter keyboard
  var submit_Task_Form_OnEnter = function submit_Task_Form_OnEnter(e) {
    if (e.keyCode == 13) {
      task_Submit_Btn.click();
    }
  };
  // Timeline Schedule
  function timeScheduler(today, start, end) {
    // YYYY-MM-DD
    // console.log(today, start, end);
    var today_Arr = today.split("-");
    var start_Arr = start.split("-");
    var end_Arr = end.split("-");
    if (start != "" && end != "" && today != "") {
      if (end == today) {
        chrome.runtime.sendMessage({ type: "badge" });
        return "Task Ending Today";
      } else if (end > today) {
        if (start == today) {
          return "Starting Today";
        } else if (end_Arr[1] != today_Arr[1]) {
          return "Starting coming month";
        } else {
          return "Ending in " + (end_Arr[2] - today_Arr[2]) + " days";
        }
      } else if (end < today) {
        if (end_Arr[1] != today_Arr[1]) {
          return "Pending over a month";
        } else {
          return "Pending since " + (today_Arr[2] - end_Arr[2]) + " days";
        }
      }
    } else {
      return "Time not scheduled";
    }
  }

  /*
  * Todo List
  */

  var todo_Input = todo_Block.querySelector("#todo_Item_Add_Input");
  var todo_List = todo_Block.querySelector("#todo_List");
  var todo_Clear_Btn = document.querySelector('.remove_Completed_Todo');

  var todo = {
    Set: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(id) {
        var todo_Data, todo_Data_Parsed, ongoing_Tasks, completed_Task, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, a;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                todo_List.innerHTML = "";
                document.querySelector(".todo_stats_ongoing").textContent = 0;
                document.querySelector(".todo_stats_complete").textContent = 0;

                _context11.next = 5;
                return __read_DB("Product", {
                  Id: id
                });

              case 5:
                todo_Data = _context11.sent;

                if (!todo_Data.length) {
                  _context11.next = 39;
                  break;
                }

                if (!(todo_Data[0].Todo != undefined)) {
                  _context11.next = 38;
                  break;
                }

                todo_Data_Parsed = todo_Data[0].Todo;

                if (!todo_Data_Parsed.length) {
                  _context11.next = 35;
                  break;
                }

                todo_Block.querySelector(".help-message").style.display = "none";
                todo_List.innerHTML = "";
                ongoing_Tasks = 0;
                completed_Task = 0;
                _iteratorNormalCompletion6 = true;
                _didIteratorError6 = false;
                _iteratorError6 = undefined;
                _context11.prev = 17;

                for (_iterator6 = todo_Data_Parsed[Symbol.iterator](); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                  a = _step6.value;

                  todo_List.innerHTML += "<li data-id=\"" + a.Id + "\" class=\"" + a.Status + "\"><span></span><p>" + a.Data + "</p><em></em></li>";
                  if (a.Status == "ongoing") {
                    ongoing_Tasks++;
                    document.querySelector(".todo_stats_ongoing").textContent = ongoing_Tasks;
                  } else {
                    completed_Task++;
                    document.querySelector(".todo_stats_complete").textContent = completed_Task;
                  }
                }
                _context11.next = 25;
                break;

              case 21:
                _context11.prev = 21;
                _context11.t0 = _context11["catch"](17);
                _didIteratorError6 = true;
                _iteratorError6 = _context11.t0;

              case 25:
                _context11.prev = 25;
                _context11.prev = 26;

                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                  _iterator6.return();
                }

              case 28:
                _context11.prev = 28;

                if (!_didIteratorError6) {
                  _context11.next = 31;
                  break;
                }

                throw _iteratorError6;

              case 31:
                return _context11.finish(28);

              case 32:
                return _context11.finish(25);

              case 33:
                _context11.next = 36;
                break;

              case 35:
                todo_Block.querySelector(".help-message").style.display = "block";

              case 36:
                _context11.next = 39;
                break;

              case 38:
                todo_Block.querySelector(".help-message").style.display = "block";

              case 39:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, _this, [[17, 21, 25, 33], [26,, 28, 32]]);
      }));

      function Set(_x12) {
        return _ref13.apply(this, arguments);
      }

      return Set;
    }(),
    Add: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var todo_Items, todo_Items_Data, isAdded;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                todo_Items = todo_List.querySelectorAll("li");
                _context12.next = 3;
                return collect_Todo_Items(todo_Items);

              case 3:
                todo_Items_Data = _context12.sent;
                _context12.next = 6;
                return __update_DB("Product", {
                  Id: parseInt(document.body.getAttribute("data-task-id"))
                }, {
                  "Todo": todo_Items_Data
                });

              case 6:
                isAdded = _context12.sent;


                if (isAdded) {
                  todo_Input.value = "";
                  if (todo_List.querySelectorAll("li").length) {
                    todo_Block.querySelector(".help-message").style.display = "none";
                  } else {
                    todo_Block.querySelector(".help-message").style.display = "block";
                  }
                }

              case 8:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, _this);
      }));

      function Add() {
        return _ref14.apply(this, arguments);
      }

      return Add;
    }(),
    Clicked: function Clicked(e) {
      if (e.target.nodeName == "SPAN") {
        var elem_Parent = e.target.parentElement;
        if (elem_Parent.className == "ongoing") {
          elem_Parent.classList.remove("ongoing");
          elem_Parent.classList.add("complete");
          var current_ongoing_count = document.querySelector(".todo_stats_ongoing").textContent;
          var current_complete_count = document.querySelector(".todo_stats_complete").textContent;

          document.querySelector(".todo_stats_ongoing").textContent = parseInt(current_ongoing_count) - 1;
          document.querySelector(".todo_stats_complete").textContent = parseInt(current_complete_count) + 1;
        } else {
          elem_Parent.classList.add("ongoing");
          elem_Parent.classList.remove("complete");

          var _current_ongoing_count = document.querySelector(".todo_stats_ongoing").textContent;
          var _current_complete_count = document.querySelector(".todo_stats_complete").textContent;

          document.querySelector(".todo_stats_ongoing").textContent = parseInt(_current_ongoing_count) + 1;
          document.querySelector(".todo_stats_complete").textContent = parseInt(_current_complete_count) - 1;
        }
        todo.Add();
      } else if (e.target.nodeName == "EM") {
        if (e.target.parentElement.className == "ongoing") {
          var _current_ongoing_count2 = document.querySelector(".todo_stats_ongoing").textContent;
          document.querySelector(".todo_stats_ongoing").textContent = parseInt(_current_ongoing_count2) - 1;
        } else {
          var _current_complete_count2 = document.querySelector(".todo_stats_complete").textContent;
          document.querySelector(".todo_stats_complete").textContent = parseInt(_current_complete_count2) - 1;
        }
        e.target.parentElement.remove();
        notify("Successfully deleted.", "info");

        todo.Add();
      }
    },
    RemoveCompletedTodo: function RemoveCompletedTodo() {
      todo_Clear_Promise().then(function (response) {
        notify(response, "success");
        todo.Add();
      }).catch(function (error) {
        notify(error, "error");
      });
    }
  };

  todo_List.addEventListener("click", todo.Clicked);
  todo_Clear_Btn.addEventListener("click", todo.RemoveCompletedTodo);
  todo_Input.addEventListener("keypress", todo_Input_Submit);
  // Collect todo items
  var collect_Todo_Items = function collect_Todo_Items(items) {
    var todo_Items = [];
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = items.entries()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var _ref15 = _step7.value;

        var _ref16 = _slicedToArray(_ref15, 2);

        var index = _ref16[0];
        var a = _ref16[1];

        todo_Items.push({
          "Id": index,
          "Status": a.className,
          "Data": a.textContent
        });
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7.return) {
          _iterator7.return();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }

    return todo_Items;
  };
  // Submit todo Item
  function todo_Input_Submit(e) {
    if (e.keyCode == 13 && this.value != '') {
      var li_Node = document.createElement("LI");
      li_Node.classList.add("ongoing");
      li_Node.innerHTML = "<span></span><p>" + this.value + "</p><em></em>";
      todo_List.insertBefore(li_Node, todo_List.childNodes[0]);
      var current_ongoing_count = document.querySelector(".todo_stats_ongoing").textContent;
      document.querySelector(".todo_stats_ongoing").textContent = parseInt(current_ongoing_count) + 1;
      todo.Add();
    }
  }
  // todo list promise
  var todo_Clear_Promise = function todo_Clear_Promise() {
    return new Promise(function (resolve, reject) {
      var todo_Items = todo_List.querySelectorAll("li");
      var completed_Count = 0;
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = todo_Items[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var a = _step8.value;

          if (a.className == "complete") {
            a.remove();
            completed_Count++;
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      if (completed_Count) {
        resolve("All completed task(s) deleted");
        document.querySelector(".todo_stats_complete").textContent = 0;
      } else {
        reject("No completed task(s) found.");
      }
    });
  };

  /*
  * Notes
  */

  var notes_Add_Input = notes_Block.querySelector("#notes_Add_Input");
  var notes_List = notes_Block.querySelector("#notes_List");
  var notes_Remove = notes_Block.querySelector(".remove_Notes");

  var notes = {
    Set: function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(id) {
        var notes_Data, notes_Data_Parsed, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, a, txt_arr;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return __read_DB("Product", {
                  Id: id
                });

              case 2:
                notes_Data = _context13.sent;

                notes_List.innerHTML = '';

                if (!notes_Data.length) {
                  _context13.next = 34;
                  break;
                }

                if (!(notes_Data[0].Notes != undefined)) {
                  _context13.next = 33;
                  break;
                }

                notes_Data_Parsed = notes_Data[0].Notes;

                if (!notes_Data_Parsed.length) {
                  _context13.next = 30;
                  break;
                }

                notes_Block.querySelector(".help-message").style.display = "none";

                _iteratorNormalCompletion9 = true;
                _didIteratorError9 = false;
                _iteratorError9 = undefined;
                _context13.prev = 12;
                for (_iterator9 = notes_Data_Parsed[Symbol.iterator](); !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                  a = _step9.value;

                  if (a.search("@") != -1) {
                    txt_arr = a.split(" ");

                    txt_arr = txt_arr.map(function (value, index) {
                      if (value.search("@") != -1) {
                        return "<span>" + value + "</span>";
                      } else {
                        return value;
                      }
                    });
                    txt_arr = txt_arr.join(" ");
                    notes_List.innerHTML += "<li><p>" + txt_arr + "</p><em></em></li>";
                  } else {
                    notes_List.innerHTML += "<li><p>" + a + "</p><em></em></li>";
                  }
                }
                _context13.next = 20;
                break;

              case 16:
                _context13.prev = 16;
                _context13.t0 = _context13["catch"](12);
                _didIteratorError9 = true;
                _iteratorError9 = _context13.t0;

              case 20:
                _context13.prev = 20;
                _context13.prev = 21;

                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                  _iterator9.return();
                }

              case 23:
                _context13.prev = 23;

                if (!_didIteratorError9) {
                  _context13.next = 26;
                  break;
                }

                throw _iteratorError9;

              case 26:
                return _context13.finish(23);

              case 27:
                return _context13.finish(20);

              case 28:
                _context13.next = 31;
                break;

              case 30:
                notes_Block.querySelector(".help-message").style.display = "block";

              case 31:
                _context13.next = 34;
                break;

              case 33:
                notes_Block.querySelector(".help-message").style.display = "block";

              case 34:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, _this, [[12, 16, 20, 28], [21,, 23, 27]]);
      }));

      function Set(_x13) {
        return _ref17.apply(this, arguments);
      }

      return Set;
    }(),
    Add: function () {
      var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(e) {
        var task_Id, li_Node, txt_arr, notes_Data, isNote_Exists, isAdded;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (!(e.keyCode == 13 && notes_Add_Input.value != '')) {
                  _context14.next = 24;
                  break;
                }

                task_Id = parseInt(document.body.getAttribute("data-task-id"));

                notes_Block.querySelector(".help-message").style.display = "none";

                li_Node = document.createElement("LI");

                if (notes_Add_Input.value.search("@") != -1) {
                  txt_arr = notes_Add_Input.value.split(" ");

                  txt_arr = txt_arr.map(function (value, index) {
                    if (value.search("@") != -1) {
                      return "<span>" + value + "</span>";
                    } else {
                      return value;
                    }
                  });
                  txt_arr = txt_arr.join(" ");
                  li_Node.innerHTML = "<p>" + txt_arr + "</p><em></em>";
                } else {
                  li_Node.innerHTML = "<p>" + notes_Add_Input.value + "</p><em></em>";
                }

                notes_List.insertBefore(li_Node, notes_List.childNodes[0]);

                _context14.next = 8;
                return collect_Notes_Items();

              case 8:
                notes_Data = _context14.sent;
                _context14.next = 11;
                return __read_DB("Product", {
                  Id: task_Id
                });

              case 11:
                isNote_Exists = _context14.sent;
                isAdded = false;

                if (!isNote_Exists.length) {
                  _context14.next = 20;
                  break;
                }

                _context14.next = 16;
                return __update_DB("Product", {
                  Id: task_Id
                }, {
                  Notes: notes_Data
                });

              case 16:
                isAdded = _context14.sent;


                if (isAdded) {
                  notes_Add_Input.value = "";
                }
                _context14.next = 24;
                break;

              case 20:
                _context14.next = 22;
                return __add_Item_DB("Product", [{
                  Id: task_Id,
                  Notes: notes_Data
                }]);

              case 22:
                isAdded = _context14.sent;


                if (isAdded) {
                  notes_Add_Input.value = "";
                }

              case 24:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, _this);
      }));

      function Add(_x14) {
        return _ref18.apply(this, arguments);
      }

      return Add;
    }(),
    Clicked: function () {
      var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(e) {
        var task_Id, notes_Data, isNote_Updated;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (!(e.target.nodeName == "EM")) {
                  _context15.next = 10;
                  break;
                }

                task_Id = parseInt(document.body.getAttribute("data-task-id"));


                e.target.parentElement.remove();
                _context15.next = 5;
                return collect_Notes_Items();

              case 5:
                notes_Data = _context15.sent;
                _context15.next = 8;
                return __update_DB("Product", {
                  Id: task_Id
                }, {
                  Notes: notes_Data
                });

              case 8:
                isNote_Updated = _context15.sent;


                if (isNote_Updated) {
                  notify("Successfully deleted.", "info");
                  notes.Set(task_Id);
                }

              case 10:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, _this);
      }));

      function Clicked(_x15) {
        return _ref19.apply(this, arguments);
      }

      return Clicked;
    }(),
    RemoveAll: function () {
      var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        var task_Id, isRemoved;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                task_Id = parseInt(document.body.getAttribute("data-task-id"));
                _context16.next = 3;
                return __update_DB("Product", {
                  Id: task_Id
                }, {
                  Notes: []
                });

              case 3:
                isRemoved = _context16.sent;

                if (isRemoved) {
                  notify("All notes deleted.", "error");
                  notes_List.innerHTML = "";
                }

              case 5:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, _this);
      }));

      function RemoveAll() {
        return _ref20.apply(this, arguments);
      }

      return RemoveAll;
    }()
  };

  notes_Add_Input.addEventListener("keypress", notes.Add);
  notes_Remove.addEventListener("click", notes.RemoveAll);
  notes_List.addEventListener("click", notes.Clicked);

  // Collect Notes list
  var collect_Notes_Items = function collect_Notes_Items() {
    var notes_Items_Data = [];
    var notes_Items = notes_List.querySelectorAll("li");

    var _iteratorNormalCompletion10 = true;
    var _didIteratorError10 = false;
    var _iteratorError10 = undefined;

    try {
      for (var _iterator10 = notes_Items[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
        var a = _step10.value;

        notes_Items_Data.push(a.textContent.trim());
      }
    } catch (err) {
      _didIteratorError10 = true;
      _iteratorError10 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion10 && _iterator10.return) {
          _iterator10.return();
        }
      } finally {
        if (_didIteratorError10) {
          throw _iteratorError10;
        }
      }
    }

    return notes_Items_Data;
  };

  /*
  * Log out
  */

  // Log out
  var log_Out_Btn = document.querySelector("#log_Out");
  log_Out_Btn.addEventListener("click", app.Quit);

  // overlay trigger
  var overlay_clicked = function overlay_clicked(e) {
    if (e.target.nodeName == "BODY") {
      clear_Modal();
    }
  };
  // ESC Trigger
  var esc_trigger = function esc_trigger(e) {
    if (e.keyCode == 27) {
      clear_Modal();
    }
  };
  // clearModal
  var clear_Modal = function clear_Modal() {
    document.querySelector("#group_Input").value = "";
    document.querySelector("#folder_Input").value = "";
    document.querySelector("#task_Input").value = "";
    var all_Label_Span = document.querySelectorAll(".label-Value");
    var _iteratorNormalCompletion11 = true;
    var _didIteratorError11 = false;
    var _iteratorError11 = undefined;

    try {
      for (var _iterator11 = all_Label_Span[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
        var a = _step11.value;

        a.classList.remove("selected");
      }
    } catch (err) {
      _didIteratorError11 = true;
      _iteratorError11 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion11 && _iterator11.return) {
          _iterator11.return();
        }
      } finally {
        if (_didIteratorError11) {
          throw _iteratorError11;
        }
      }
    }

    document.querySelector(".folder_Modal").style.display = "none";
    document.querySelector(".task_Modal").style.display = "none";
    document.body.classList.remove("overlay");
  };
  // Date Parsers
  var parseDate = function parseDate(date) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sun", "Mon", "Tues", "Wed", "Thru", "Fri", "Sat"];
    var week = days[date.getDay()];
    var day = date.getDate();
    var month = months[date.getMonth()];
    return week + ", " + day + " " + month;
  };
  // parse Today
  var parseToday = function parseToday(date) {
    return date.getFullYear() + "-" + (date.getMonth().toString().length == 1 ? "0" + date.getMonth() : date.getMonth()) + "-" + (date.getDate().toString().length == 1 ? "0" + date.getDate() : date.getDate());
  };
  // close modal
  var close_Modal_Trigger = function close_Modal_Trigger() {
    clear_Modal();
  };
  /*
  * Background Message Passing
  */

  chrome.commands.onCommand.addListener(function (command) {
    console.log('Command:', command);
    if (command == "quit-dog") {
      log_Out_Btn.click();
    } else if (command == "open-folder") {
      folder_Modal_Btn.click();
    } else if (command == "open-task") {
      task_Modal_Btn.click();
    }
  });
})();
//# sourceMappingURL=application.js.map
