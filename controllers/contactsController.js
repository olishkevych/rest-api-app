const { Contact } = require("../models/contact");

const { ApiError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    favorite === undefined ? { owner: _id } : { owner: _id, favorite },
    "name email phone favorite",
    {
      skip,
      limit,
    }
  ).populate("owner", "name, email");
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw ApiError(404, "Not found");
  }
  res.json(result);
};

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw ApiError(404, "Not found");
  }
  res.json({ message: "Deleted successfully" });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { name, email, phone, favorite },
    {
      new: true,
    }
  );
  if (!result) {
    throw ApiError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw ApiError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  removeContactById: ctrlWrapper(removeContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
