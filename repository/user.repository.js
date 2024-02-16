const MongoStorage = require('../db/mongostorage');


module.exports = class UserRepository{
  constructor() {
    
    if(
    process.env.DB_HOST &&
    process.env.DB_USERNAME &&
    process.env.DB_PASSWORD
    ){
        this.storage = new MongoStorage('user');
    }
  }

async find() {
  return this.storage.find();
}

async retrieve(id) {
  return this.storage.retrieve(id);
}

async create(user) {
  return this.storage.create(user);
}

async update(id, user) {
  return this.storage.update(id, user);
}

async delete(id) {
  return this.storage.delete(id);
//       const result = await this.storage.delete(id);
    // return result ? result : null;
}

};










  
