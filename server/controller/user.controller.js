const bcrypt = require('bcrypt');
const UserRepository = require('../repository/user.repository');
const { ServerError, BadRequestError, NotFoundError } = require('../errors/error');

const userRepository = new UserRepository();

exports.userController = {
  async getAllUsers(req, res) {
    try {
      const users = await userRepository.find();
      if (!users || users.length === 0) {
        throw new NotFoundError('Users not found');
      }
      res.status(200).json({
        status: 200,
        message: 'Users retrieved successfully',
        data: users,
      });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      if (error instanceof ServerError) {
        res.status(500).json({
          status: 500,
          message: 'Internal Server Error',
        });
      } else {
        res.status(error.status || 500).json({
          status: error.status || 500,
          message: error.message,
        });
      }
    }
  },

  async getUserById(req, res) {
    try {
      const user = await userRepository.retrieve(req.params.id);
      if (!user) {
        throw new NotFoundError('User not found');
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
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(new ServerError(error));
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await userRepository.delete(req.params.id);
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(new ServerError(error));
    }
  },

  async loginUser(req, res) {
    try {
      const { id_use, password } = req.body;

      // Find the user by id_use
      const user = await userRepository.findByUserId(id_use);

      if (!user) {
        throw new NotFoundError('User not found');
      }

      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new BadRequestError('Incorrect password');
      }

      // Return a success response if login is successful
      res.status(200).json({
        status: 200,
        message: 'Login successful',
        data: user,
      });
    } catch (error) {
      console.error(`Error during login: ${error.message}`);
      res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message || 'An error occurred during login',
      });
    }
  },
};
