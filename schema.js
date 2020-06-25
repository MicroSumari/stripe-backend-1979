const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const adminSchema = new Schema({
  id: {
    type: String,
    unique: true,
    trim: true,
  },
  token: {
    type:String,
    required: true
  },
  percent_off:{
      type: Number,
      required: true
  }
}, {
  timestamps: true,
});
 
const Token = mongoose.model('Token', adminSchema);
module.exports = Token;
 