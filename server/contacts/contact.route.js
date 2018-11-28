const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const contactCtrl = require('./contact.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/contacts - Get list of users */
  .get(contactCtrl.list)

  /** POST /api/contacts - Create new user */
  .post(validate(paramValidation.createContact), contactCtrl.create);

router.route('/:contactId')
  /** GET /api/contacts/:contactId - Get user */
  .get(contactCtrl.get)

  /** PUT /api/contacts/:contactId - Update user */
  .put(validate(paramValidation.updateContact), contactCtrl.update)

  /** DELETE /api/contacts/:contactId - Delete user */
  .delete(contactCtrl.remove);

/** Load user when API with contactId route parameter is hit */
router.param('contactId', contactCtrl.load);

module.exports = router;
