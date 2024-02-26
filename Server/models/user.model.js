// // user.model.js

// const { Schema, model } = require("mongoose");

// const userSchema = new Schema(
//   {
//     id_user: { type: Number, required: true },
//     first_name: { type: String, required: true },
//     last_name: { type: String, required: true },
//     phone: { type: String, required: true },
//     type_user: { type: String, required: true },
//     password: { type: String, required: true },
//     status_ability: { type: String, required: true },
//     certifications: { type: String },
//     image: { type: String },
//   },
//   // { versionKey: false }
//   {collation: 'coll-ems-user', versionKey: false}
//   ); 

// module.exports = model("user", userSchema);

// user.model.js


const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    id_use: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true },
    type_user: { type: String, required: true },
    password: { type: String, required: true },
    status_ability: { type: String, required: true },
    certifications: { type: String },
    image: { type: String },
  },{
  
   collection: "coll-ems-user",versionKey: false  },); 


module.exports = model("user", userSchema);



// this is work my test!!
// const { Schema, model } = require('mongoose');

// const userSchema = new Schema({
//     id: { type: Number, required: true },
//     firstname: { type: String, required: true },
//     lastname: { type: String, required: true },
//     password: { type: String, required: true }
// },
// {
//   collection: "collUser", // Specify the collection name explicitly
// });

// const User = model('User', userSchema);

// module.exports = User;

