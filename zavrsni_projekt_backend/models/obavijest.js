const mongoose = require('mongoose');

const { Schema } = mongoose;

const obavijestShema = new Schema({
  naslov: String,
  datum: String,
  tekst: String,
  vazno: { type: Boolean, default: false }
});

module.exports = mongoose.model("Obavijest", obavijestShema,"obavijesti");
