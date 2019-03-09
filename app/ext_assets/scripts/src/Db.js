/**
 * @Author: Pawan Gujral <codedoodler>
 * @Date:   2018-08-08T05:47:35-04:00
 * @Email:  goofyCoder.com
 * @Last modified by:   codedoodler
 * @Last modified time: 2018-08-10T12:30:04-04:00
 */



'use strict';

var Db_Name = 'Dog_Db';

function get_Db_Schema() {
  var tblProduct = {
    name: 'Product',
    columns: [{
        name: 'Id',
        primaryKey: true,
        autoIncrement: true
      },
      {
        name: 'Group',
        notNull: true,
        dataType: JsStore.DATA_TYPE.String
      },
      {
        name: 'Folder',
        notNull: true,
        dataType: JsStore.DATA_TYPE.String
      },
      {
        name: 'Task',
        dataType: JsStore.DATA_TYPE.String
      },
      {
        name: 'Timeline',
        dateType: JsStore.DATA_TYPE.Object
      },
      {
        name: 'Type',
        dateType: JsStore.DATA_TYPE.String
      },
      {
        name: 'Date',
        notNull: true,
        dataType: JsStore.DATA_TYPE.DateTime
      },
      {
        name: 'Todo',
        dataType: JsStore.DATA_TYPE.Array
      },
      {
        name: 'Notes',
        dataType: JsStore.DATA_TYPE.Array
      }
    ]
  };

  var tblAuth = {
    name: "Auth",
    columns: [{
        name: 'Id',
        primaryKey: true,
        autoIncrement: true
      },
      {
        name: 'Name',
        notNull: true,
        dataType: JsStore.DATA_TYPE.String
      },
      {
        name: 'Email',
        notNull: true,
        dataType: JsStore.DATA_TYPE.String
      },
      {
        name: 'Avatar',
        notNull: true,
        dataType: JsStore.DATA_TYPE.String
      },
      {
        name: 'Pin',
        notNull: true,
        dataType: JsStore.DATA_TYPE.Array
      },
      {
        name: "Logged",
        notNull: true,
        dataType: JsStore.DATA_TYPE.Boolean,
        default: false
      }
    ]
  }

  var tblWallpaper = {
    name: 'wallpaper',
    columns: [{
        name: "Id",
        primaryKey: true,
        autoIncrement: true
      }, {
        name: "Blob",
        dataType: JsStore.DATA_TYPE.String
      },
      {
        name: "Author",
        dataType: JsStore.DATA_TYPE.String
      },
      {
        name: "Link",
        dataType: JsStore.DATA_TYPE.String
      }
    ]
  };

  var db = {
    name: Db_Name,
    tables: [tblProduct, tblAuth, tblWallpaper]
  }
  return db;
}

// init
var connection = new JsStore.Instance(new Worker('./libs/db/jsstore.worker.min.js'));

async function initJsStore() {
  await connection.isDbExist(Db_Name).then(function(isExist) {
    if (isExist) {
      connection.openDb(Db_Name);
    } else {
      var database = get_Db_Schema();
      connection.createDb(database);
      console.log(database);
    }
  }).catch(function(err) {
    console.error(err);
  })
}
initJsStore();

// read DB
async function __read_DB(FROM, WHERE) {
  let results = [];
  await connection.select({
      from: FROM,
      where: WHERE,
    })
    .then((response) => {
      //TODO : Row updated message
      console.info(`${response.length} Item exists`);
      results = response;
    })
    .catch((error) => {
      // TODO: Error message
      console.error(error);
    });

  return results;
}

// Update DB
async function __update_DB(IN, WHERE, SET) {
  let isUpdated = false;
  await connection.update({ in: IN,
      where: WHERE,
      set: SET
    })
    .then((rowsUpdated) => {
      //TODO : Row updated message
      console.info(`${rowsUpdated} rows updated`);
      isUpdated = true;
    })
    .catch((error) => {
      //TODO: Error message
      console.error(error);
    });

  return isUpdated;
}

// add Item DB
async function __add_Item_DB(INTO, VALUES) {
  console.log(INTO, VALUES);
  let isAdded = false;
  await connection.insert({
      into: INTO,
      values: VALUES
    })
    .then((rowsInserted) => {
      if (rowsInserted > 0) {
        //TODO : Data added message
        console.info(`${rowsInserted} successfully  added`);
        isAdded = true;
      }
    })
    .catch((error) => {
      //TODO: Error message
      console.error(error.message, "error");
    });
  return isAdded;
}

// Remove Item DB
async function __remove_Item_DB(FROM, WHERE) {
  let isRemoved = false;
  await connection.remove({
      from: FROM,
      where: WHERE,
    })
    .then((rowsDeleted) => {
      //TODO : Data deleted message
      console.warn(`${rowsDeleted} deleted!`);
      isRemoved = true;
    })
    .catch((err) => {
      //TODO: Error message
      console.error(err);
    });

  return isRemoved;
}

// Drop DB
async function __drop_DB() {
  let DB_Erased = false;
  await connection.dropDb()
    .then(function() {
      //TODO : DB deleted message
      console.info('Db deleted successfully');
      DB_Erased = true;
    }).catch(function(error) {
      console.error(error);
    });
    return DB_Erased;
}


async function __refresh_DB() {
  let authData = await __read_DB("Auth");
  let productData = await __read_DB("Product");

  let isTable_Refresh = await __drop_DB();
  console.log(isTable_Refresh);
  if (isTable_Refresh) {
    await initJsStore();
    let isAuth_Table_Update = await __add_Item_DB("Auth", authData);
    let isProduct_Table_Update = await __add_Item_DB("Product", productData);
  } else {
    console.error("Something went wrong");
  }


}
