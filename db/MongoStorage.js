const { EventEmitter } = require("events");
const mongoose = require("mongoose");
const path = require("path");

// module.exports = class MongoStorage extends EventEmitter {
//   constructor(entity) {
//     super();
//     this.entityName = entity.charAt(0).toUpperCase() + entity.slice(1);
//     this.Model = require(path.join(
//       __dirname,
//       `../models/${this.entityName}.model.js`
//     ));
//     this.connect();
//   }

module.exports = class MongoStorage extends EventEmitter {
    constructor(user) {
      super();
      this.user = user;
      this.model = require(path.join(__dirname, `../models/${user}.model`));
      this.connect();
    }



  connect() {
    const connectionUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    mongoose
      .connect(connectionUrl)
      .then(() =>
        console.log(`Connected to ${this.entityName} collection in MongoDB`)
      )
      .catch((err) => console.log(`Error connecting to MongoDB ${err}`));
  }

  find() {
    return this.Model.find();
  }

  retrieve(id) {
    return this.Model.retrieve({id});
  }

  create(data) {
    return this.Model.create(data); 
  }

  update(id, data) {
    return this.Model.update({id}, data);
  }

  delete(id) {
    return this.Model.delete(id);
  }
};

