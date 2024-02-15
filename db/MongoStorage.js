const mongoose = require("mongoose");
const path = require("path");
const { EventEmitter } = require("events");

module.exports = class MongoStorage extends EventEmitter {
  constructor(userSchema) {
    super();
    this.userSchema = userSchema;
    this.model = require(path.join)(__dirname, `../models/${userSchema}.model`);
    this.connect();
  }

  connect() {
    const connectionUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    mongoose
      .connect(connectionUrl)
      .then(() =>
        console.log(`Connected to ${this.userSchema} collection in MongoDB`)
      )
      .catch((err) => console.log(`Error connecting to MongoDB ${err}`));
  }

  find() {
    return this.model.find({});
  }

  retrieve(id) {
    return this.model.findOne({ id: Number(id) });
  }

  create(userSchema) {
    const newUser = new this.model(userSchema);
    return newUser.save();
  }

  update(id, userSchema) {
    return this.model.updateOne({ id }, userSchema);
  }

  delete(id) {
    return this.model.findOneAndDelete({ id }).then((deletedUser) => {
      if (!deletedUser) {
        throw new Error(`User with id ${id} not found`);
      }
      return deletedUser;
    });
  }
};
