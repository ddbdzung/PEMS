const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getSubject = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  })
}

const createSubject = {
  body: Joi.object().keys({
    maHP: Joi.string().trim().required(),
    maIn: Joi.string().trim().required(),
    tenHP: Joi.string().trim().required(),
    hocKy: Joi.number().integer().min(1),
    soTinChi: Joi.number().required().min(1).integer(),
    tbKtraTX: Joi.number().min(0).max(10),
    diemThi: Joi.number().min(0).max(10),
    diemTB: Joi.number().min(0).max(10),
    isValueSubject: Joi.boolean().default(true),
  })
}

const updateSubject = {
  body: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
    maHP: Joi.string().trim().required(),
    maIn: Joi.string().trim().required(),
    tenHP: Joi.string().trim().required(),
    hocKy: Joi.number().integer().min(1),
    soTinChi: Joi.number().required().min(1).integer(),
    tbKtraTX: Joi.number().min(0).max(10),
    diemThi: Joi.number().min(0).max(10),
    diemTB: Joi.number().min(0).max(10),
    duocTinhTichLuy: Joi.boolean().default(true),
  })
}

const deleteSubject = {
  body: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  })
}

module.exports = {
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
}