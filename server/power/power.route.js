const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const powerCtrl = require('./power.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/powers - Get list of users */
  .get(powerCtrl.list)

  /** POST /api/powers - Create new user */
  .post(validate(paramValidation.createPower), powerCtrl.create);

router.route('/:powerId')
/** GET /api/powers/:powerId - Get user */
  .get(powerCtrl.get)

  /** PUT /api/powers/:powerId - Update user */
  .put(validate(paramValidation.updatePower), powerCtrl.update)

  /** DELETE /api/powers/:powerId - Delete user */
  .delete(powerCtrl.remove);

/** Load user when API with powerId route parameter is hit */
router.param('powerId', powerCtrl.load);

module.exports = router;
