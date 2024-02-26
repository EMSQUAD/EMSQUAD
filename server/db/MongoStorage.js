const { EventEmitter } = require("events");
const mongoose = require("mongoose");
const path = require("path");



// module.exports = class MongoStorage extends EventEmitter {
//     constructor(user) {
//       super();
//       this.user = user;
//       this.model = require(path.join(__dirname, `../models/${user}.model`));
//       this.connect();
//     }

// connect() {
//   const connectionUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
//   mongoose
//     .connect(connectionUrl)
//     .then(() =>
//       console.log(`Connected to ${this.user} collection in MongoDB`),
//     )
//     .catch((err) => console.log(`Error connecting to MongoDB ${err}`));
// }

module.exports = class MongoStorage extends EventEmitter {
  constructor(entity) {
    super();
    this.entityName = entity.charAt(0).toLowerCase() + entity.slice(1);
    this.model = require(path.join(
      __dirname,
      `../models/${this.entityName}.model`
      ));
      console.log(this.entityName)
    this.connect();
  }

  connect () {
  const connectionUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
      .connect(connectionUrl)
      .then(() => console.log(`connected to ${this.entityName} collection`))
      .catch(err => console.log(`connection error: ${err}`));
  }

  
    
// module.exports = class MongoStorage extends EventEmitter {
//   constructor(user) {
//       super();
//       this.user = user;
//       this.model = require(path.join(__dirname, `../models/${user}.model`));
//       this.connect();
//   }

//   connect() {
//       const connectionUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
//       mongoose
//           .connect(connectionUrl)
//           .then(() => {
//               console.log(`Connected to ${this.user} collection in MongoDB`);
//               mongoose.set('debug', (collectionName, method, query, doc) => {
//                   console.log(`Mongoose Query: ${method} ${collectionName}`);
//                   console.log(`Query: ${JSON.stringify(query)}`);
//               });
//           })
//           .catch((err) => console.log(`Error connecting to MongoDB ${err}`));
//   }



  find() {
    try {
      return this.model.find({});
    } catch (error) {
      console.error('Error in find method:', error);
      throw error;
    }
  }
  
  
  

  retrieve(id) {
    return this.model.findOne({ id_use: Number(id) });
  }
  

  create(data) {
    const newUser = new this.model(data);
    return newUser.save();
  }

  update(id, data) {
    return this.model.updateOne({id}, data);
  }

  delete(id) {
    return this.model.findOneAndDelete({ id_use: id }).then((deletedUser) => {
      if (!deletedUser) {
        throw new Error("User not found");
      }
      return deletedUser;
    });
  }
  
  
};

