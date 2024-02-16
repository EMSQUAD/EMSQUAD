const UserRepository = require("../repository/user.repository");
const userRepository = new UserRepository();
const{
    ServerError,
    BadRequestError,
    NotFoundError,
  } = require("../errors/error");

  exports.userController = {    
async getAllUsers(req, res) {
    try {
      const users = await userRepository.find();
      
      if(!users || users.length === 0){
        throw new NotFoundError("No users found");
      }
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(new ServerError(error));
    }
  },

async getUserById(req, res) {
    try {
      const user = await userRepository.retrieve(req.params.id);
      if(!user){
        throw new NotFoundError("User not found");
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(new ServerError(error));
    }
  },

async createUser(req, res) {
    try {
      const user = await userRepository.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(new ServerError(error));
    }
  },

async updateUser(req, res) {
    try {
      const user = await userRepository.update(req.params.id, req.body);
      if(!user){
        throw new NotFoundError("User not found");
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(new ServerError(error));
    }
  },

async deleteUser(req, res) {
    try {
      const user = await userRepository.delete(req.params.id);
      if(!user){
        throw new NotFoundError("User not found");
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(new ServerError(error));
    }
  }


};
