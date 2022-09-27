const Joi = require('joi');

const importDataValidation = {
  body: Joi.object().keys({
    data: Joi.array().items(Joi.object().keys({
      maHP: Joi.string().trim().required(),
      maIn: Joi.string().trim().required(),
      tenHP: Joi.string().trim().required(),
      hocKy: Joi.number().integer().min(1),
      soTinChi: Joi.number().required().min(1).integer(),
      tbKtraTX: Joi.number().min(0).max(10),
      diemThi: Joi.number().min(0).max(10),
      diemTB: Joi.number().min(0).max(10),
      isValueSubject: Joi.boolean().default(true),
    })),
  })
}

module.exports = {
  importDataValidation,
}