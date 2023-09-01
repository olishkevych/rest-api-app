const { ApiError } = require("../helpers");

const validateContacts = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(ApiError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateContacts;
