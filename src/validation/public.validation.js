const Joi = require('joi');

const importDataValidation = {
  body: Joi.object().keys({
    data: Joi.array().items(Joi.object({
      maHP: Joi.string().trim().required(),
      maIn: Joi.string().trim().required(),
      tenHP: Joi.string().trim().required(),
      hocKy: Joi.any(),
      soTinChi: Joi.number().required().min(1).integer(),
      tbKtraTX: Joi.any(),
      diemThi: Joi.any(),
      diemTB: Joi.any(),
      isValueSubject: Joi.boolean().default(true),
    })),
  })
}

module.exports = {
  importDataValidation,
}