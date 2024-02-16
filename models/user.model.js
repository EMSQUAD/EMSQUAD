// user.model.js

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    id_user: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    type_user: { type: String, required: true },
    password: { type: String, required: true },
    status_ability: { type: String, required: true },
    Image: { type: String, required: true },
  },
  { collation: "coll-ems-user", versionKey: false }
  ); 

module.exports = model("User-ems", userSchema);
