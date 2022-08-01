/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const subjectSchema = mongoose.Schema(
  {
    maHP: {
      type: String,
      trim: true,
      required: true,
    },
    maIn: {
      type: String,
      trim: true,
      required: true,
    },
   tenHP: {
      type: String,
      trim: true,
      required: true,
    },
    hocKy: {
      type: Number,
      min: 1,
    },
    soTinChi: {
      type: Number,
      required: true,
      min: 1,
    },
    tbKtraTX: {
      type: Number,
      min: 0,
      max: 10,
    },
    diemThi: {
      type: Number,
      min: 0,
      max: 10,
    },
    diemTB: {
      type: Number,
      min: 0,
      max: 10,
    },
    duocTinhTichLuy: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
subjectSchema.plugin(toJSON);
subjectSchema.plugin(paginate);

// subjectSchema.methods.getAlphabeticalScore = function() {
//   const subject = this
  
// }

/**
 * @typedef Field
 */
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
