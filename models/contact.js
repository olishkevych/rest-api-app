const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const newContactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  favorite: Joi.boolean(),
  owner: Joi.object().required,
});

const existingContactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  favorite: Joi.boolean(),
  owner: Joi.object().required,
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

const joiSchemas = {
  newContactSchema,
  existingContactSchema,
  updateFavoriteSchema,
};

module.exports = { Contact, joiSchemas };
