const Joi = require('joi');

module.exports = {
  createPower: {
    body: {
      name: Joi.string().required(),
      description: Joi.string().required()
    }
  },
  updatePower: {
    body: {
      name: Joi.string().required(),
      description: Joi.string().required()
    },
    params: {
      powerId: Joi.string().hex().required()
    }
  },
  createContact: {
    body: {
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required()
    }
  },
  updateContact: {
    body: {
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required
    },
    params: {
      contactId: Joi.string().hex().required()
    }
  },
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
