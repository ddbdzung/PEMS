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
      type: String,
      trim: true,
    },
    soTinChi: {
      type: Number,
      required: true,
    },
    tbKtraTX: {
      type: Number,
    },
    diemThi: {
      type: Number,
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
