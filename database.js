const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize('myDatabase3', 'userName', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    pool: 10000
  },
  storage: path.join(__dirname, '/myDatabase')
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });

const db = {};
let Location;
let Tag;

db.initialize = (req, res, next) => {
  Location = sequelize.define('location', {
    location: {
      type: Sequelize.STRING
    }
  });
  
  Tag = sequelize.define('tag', {
    tag: {
      type: Sequelize.STRING
    }
  });
  console.log('Database initialized');
  next();
}

db.sync = (req, res, next) => {
  Location.sync()
    .then(Tag.sync());
  console.log('Database synced');
  next();
}

db.addLocation = (req, res, next) => {
  let locationName = 'Codesmith';
  Location.create({
    location: locationName
  });
  console.log('Added', locationName);
  next();
};

db.addTags = (req, res, next) => {
  let tagArray = ['fun', 'coding', 'databases']
  for (let tagName of tagArray) {
    Tag.create({
      tag: tagName
    });
  };
  console.log('Added', tagArray);
  next();
}

db.addRelationships = () => {
  
};

db.viewLocations = (req, res, next) => {
  console.log('Locations below: ______________________________________')
  Location.findAll().then(locations => {
    console.log(locations);
  })
  next();
};

db.viewTags = (req, res, next) => {
  console.log('Tags below: ______________________________________')
  Tag.findAll().then(tags => {
    console.log(tags);
  })
  next();
}

db.test = (req, res, next) => {
  console.log('Connected to controller');
  next();
}

module.exports = db;


// const Sequelize = require('sequelize');
// //database wide options
// var opts = {
//   define: {
//       //prevent sequelize from pluralizing table names
//       freezeTableName: true
//   }
// }


// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'sqlite',
//   operatorsAliases: false,

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },

//   // SQLite only
//   storage: path.join(__dirname, '/myDatabase')
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// const User = sequelize.define('user', {
//   firstName: {
//     type: Sequelize.STRING
//   },
//   lastName: {
//     type: Sequelize.STRING
//   }
// }, {
//   freezeTableName: true
// });

// // force: true will drop the table if it already exists
// User.sync().then(() => {
//   // Table created
//   User.create({
//     firstName: 'Johntest',
//     lastName: 'Hancock'
//   });
// });

// User.findAll().then(users => {
//   console.log(users);
// })