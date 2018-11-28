const Contact = require('./contact.model');

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  Contact.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {Contact}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {Contact}
 */
function create(req, res, next) {
  const user = new Contact({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email
  });

  user.save()
    .then(savedContact => res.json(savedContact))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {Contact}
 */
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then(savedContact => res.json(savedContact))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Contact[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Contact.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {Contact}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedContact => res.json(deletedContact))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
