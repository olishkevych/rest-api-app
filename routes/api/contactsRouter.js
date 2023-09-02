const express = require("express");

const router = express.Router();
const { validateContacts, isValidId } = require("../../middlewares");
const { joiSchemas } = require("../../models/contact");

const ctrl = require("../../controllers/contactsController");

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post(
  "/",
  validateContacts(joiSchemas.newContactSchema),
  ctrl.addContact
);

router.delete("/:contactId", isValidId, ctrl.removeContactById);

router.put(
  "/:contactId",
  isValidId,
  validateContacts(joiSchemas.existingContactSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateContacts(joiSchemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
