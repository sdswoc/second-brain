const Joi = require("@hapi/joi");

const registerValidation = (register_req) => {
  const schema = {
    username: Joi.string().alphanum().required(),
    email: Joi.string().email(),
    password: Joi.string().min(8),
  };
  return Joi.validate(register_req, schema);
};
const loginValidation = (login_req) => {
  const schema = {
    username: Joi.string().alphanum().max(20).required(),
    email: Joi.string().email(),
    password: Joi.string().min(8),
  };
  return Joi.validate(login_req, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
