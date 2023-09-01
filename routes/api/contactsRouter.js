const express = require("express");

const router = express.Router();
const { validateContacts } = require("../../middlewares");
const schemas = require("../../schemas/contactsSchema");

const ctrl = require("../../controllers/contactsController");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateContacts(schemas.newContactSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContactById);

router.put(
  "/:contactId",
  validateContacts(schemas.existingContactSchema),
  ctrl.updateContactById
);

module.exports = router;
