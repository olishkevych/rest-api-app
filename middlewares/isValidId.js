const { isValidObjectId } = require("mongoose");

const { ApiError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(ApiError(400, `${id} is not valid`));
  }
  next();
};

module.exports = isValidId;
