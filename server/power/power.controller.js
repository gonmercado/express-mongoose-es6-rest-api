const Power = require('./power.model');

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  Power.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {Power}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {Power}
 */
function create(req, res, next) {
  const user = new Power({
    name: req.body.name,
    description: req.body.description
  });

  user.save()
    .then(savedPower => res.json(savedPower))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {Power}
 */
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then(savedPower => res.json(savedPower))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Power[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Power.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {Power}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedPower => res.json(deletedPower))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
