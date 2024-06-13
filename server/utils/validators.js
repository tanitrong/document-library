const Joi = require("joi");

const userValidator = Joi.object({
  name: Joi.string()
    .min(2)
    .max(25)
    .regex(/^[a-zA-Z\s]+$/)
    .trim()
    .optional(),
  email: Joi.string()
    .email()
    .regex(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required()
    .messages({
      "string.email": "Email không hợp lệ",
      "any.required": "Email là bắt buộc",
    }),
  password: Joi.string()
    .min(6)
    .max(30)
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,30}$/
    )
    .required()
    .messages({
      "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
      "string.max": "Mật khẩu không được vượt quá {#limit} ký tự",
      "string.pattern.base":
        "Mật khẩu phải chứa ít nhất một số, một chữ cái viết hoa, một chữ cái viết thường và một ký tự đặc biệt",
      "any.required": "Mật khẩu là bắt buộc",
    }),
  phoneNumber: Joi.number().optional(),
  address: Joi.string().optional(),
  career: Joi.string().optional(),
  role: Joi.string().valid("user", "admin").optional(),
  balance: Joi.number().optional(),
  plan: Joi.string().valid("basic", "saving", "value", "premium").optional(),
  planStartDate: Joi.date().optional(),
  planExpirationDate: Joi.date().optional(),
  avatar: Joi.string().optional(),
  dateOfBirth: Joi.date().optional(),
  gender: Joi.string().optional(),
});

module.exports = {
  userValidator,
};
