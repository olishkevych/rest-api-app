const { isValidObjectId } = require("mongoose");

const { ApiError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(ApiError(400, `${contactId} is not valid`));
  }
  next();
};

module.exports = isValidId;
