/**
 * @Author: Pawan Gujral <codedoodler>
 * @Date:   2018-08-08T05:47:35-04:00
 * @Email:  goofyCoder.com
 * @Last modified by:   codedoodler
 * @Last modified time: 2018-08-10T12:30:04-04:00
 */

'use strict';

var initJsStore = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.isDbExist(Db_Name).then(function (isExist) {
              if (isExist) {
                connection.openDb(Db_Name);
              } else {
                var database = get_Db_Schema();
                connection.createDb(database);
                console.log(database);
              }
            }).catch(function (err) {
              console.error(err);
            });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function initJsStore() {
    return _ref.apply(this, arguments);
  };
}();

// read DB
var __read_DB = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(FROM, WHERE) {
    var results;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            results = [];
            _context2.next = 3;
            return connection.select({
              from: FROM,
              where: WHERE
            }).then(function (response) {
              //TODO : Row updated message
              console.info(response.length + ' Item exists');
              results = response;
            }).catch(function (error) {
              // TODO: Error message
              console.error(error);
            });

          case 3:
            return _context2.abrupt('return', results);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function __read_DB(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

// Update DB


var __update_DB = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(IN, WHERE, SET) {
    var isUpdated;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isUpdated = false;
            _context3.next = 3;
            return connection.update({ in: IN,
              where: WHERE,
              set: SET
            }).then(function (rowsUpdated) {
              //TODO : Row updated message
              console.info(rowsUpdated + ' rows updated');
              isUpdated = true;
            }).catch(function (error) {
              //TODO: Error message
              console.error(error);
            });

          case 3:
            return _context3.abrupt('return', isUpdated);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function __update_DB(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

// add Item DB


var __add_Item_DB = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(INTO, VALUES) {
    var isAdded;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(INTO, VALUES);
            isAdded = false;
            _context4.next = 4;
            return connection.insert({
              into: INTO,
              values: VALUES
            }).then(function (rowsInserted) {
              if (rowsInserted > 0) {
                //TODO : Data added message
                console.info(rowsInserted + ' successfully  added');
                isAdded = true;
              }
            }).catch(function (error) {
              //TODO: Error message
              console.error(error.message, "error");
            });

          case 4:
            return _context4.abrupt('return', isAdded);

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function __add_Item_DB(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

// Remove Item DB


var __remove_Item_DB = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(FROM, WHERE) {
    var isRemoved;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            isRemoved = false;
            _context5.next = 3;
            return connection.remove({
              from: FROM,
              where: WHERE
            }).then(function (rowsDeleted) {
              //TODO : Data deleted message
              console.warn(rowsDeleted + ' deleted!');
              isRemoved = true;
            }).catch(function (err) {
              //TODO: Error message
              console.error(err);
            });

          case 3:
            return _context5.abrupt('return', isRemoved);

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function __remove_Item_DB(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

// Drop DB


var __drop_DB = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var DB_Erased;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            DB_Erased = false;
            _context6.next = 3;
            return connection.dropDb().then(function () {
              //TODO : DB deleted message
              console.info('Db deleted successfully');
              DB_Erased = true;
            }).catch(function (error) {
              console.error(error);
            });

          case 3:
            return _context6.abrupt('return', DB_Erased);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function __drop_DB() {
    return _ref6.apply(this, arguments);
  };
}();

var __refresh_DB = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var authData, productData, isTable_Refresh, isAuth_Table_Update, isProduct_Table_Update;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return __read_DB("Auth");

          case 2:
            authData = _context7.sent;
            _context7.next = 5;
            return __read_DB("Product");

          case 5:
            productData = _context7.sent;
            _context7.next = 8;
            return __drop_DB();

          case 8:
            isTable_Refresh = _context7.sent;

            console.log(isTable_Refresh);

            if (!isTable_Refresh) {
              _context7.next = 21;
              break;
            }

            _context7.next = 13;
            return initJsStore();

          case 13:
            _context7.next = 15;
            return __add_Item_DB("Auth", authData);

          case 15:
            isAuth_Table_Update = _context7.sent;
            _context7.next = 18;
            return __add_Item_DB("Product", productData);

          case 18:
            isProduct_Table_Update = _context7.sent;
            _context7.next = 22;
            break;

          case 21:
            console.error("Something went wrong");

          case 22:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function __refresh_DB() {
    return _ref7.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Db_Name = 'Dog_Db';

function get_Db_Schema() {
  var tblProduct = {
    name: 'Product',
    columns: [{
      name: 'Id',
      primaryKey: true,
      autoIncrement: true
    }, {
      name: 'Group',
      notNull: true,
      dataType: JsStore.DATA_TYPE.String
    }, {
      name: 'Folder',
      notNull: true,
      dataType: JsStore.DATA_TYPE.String
    }, {
      name: 'Task',
      dataType: JsStore.DATA_TYPE.String
    }, {
      name: 'Timeline',
      dateType: JsStore.DATA_TYPE.Object
    }, {
      name: 'Type',
      dateType: JsStore.DATA_TYPE.String
    }, {
      name: 'Date',
      notNull: true,
      dataType: JsStore.DATA_TYPE.DateTime
    }, {
      name: 'Todo',
      dataType: JsStore.DATA_TYPE.Array
    }, {
      name: 'Notes',
      dataType: JsStore.DATA_TYPE.Array
    }]
  };

  var tblAuth = {
    name: "Auth",
    columns: [{
      name: 'Id',
      primaryKey: true,
      autoIncrement: true
    }, {
      name: 'Name',
      notNull: true,
      dataType: JsStore.DATA_TYPE.String
    }, {
      name: 'Email',
      notNull: true,
      dataType: JsStore.DATA_TYPE.String
    }, {
      name: 'Avatar',
      notNull: true,
      dataType: JsStore.DATA_TYPE.String
    }, {
      name: 'Pin',
      notNull: true,
      dataType: JsStore.DATA_TYPE.Array
    }, {
      name: "Logged",
      notNull: true,
      dataType: JsStore.DATA_TYPE.Boolean,
      default: false
    }]
  };

  var tblWallpaper = {
    name: 'wallpaper',
    columns: [{
      name: "Id",
      primaryKey: true,
      autoIncrement: true
    }, {
      name: "Blob",
      dataType: JsStore.DATA_TYPE.String
    }, {
      name: "Author",
      dataType: JsStore.DATA_TYPE.String
    }, {
      name: "Link",
      dataType: JsStore.DATA_TYPE.String
    }]
  };

  var db = {
    name: Db_Name,
    tables: [tblProduct, tblAuth, tblWallpaper]
  };
  return db;
}

// init
var connection = new JsStore.Instance(new Worker('./libs/db/jsstore.worker.min.js'));

initJsStore();
//# sourceMappingURL=Db.js.map
