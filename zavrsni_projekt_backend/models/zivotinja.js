const mongoose = require('mongoose');

const { Schema } = mongoose;

const zivotinjaShema = new Schema({
  ime: String,
  vrsta: String,
  cip: Boolean,
  godine: Number,
  opis: String,
  pregled: String,
  udomljen: String,
  slika: String
});

module.exports = mongoose.model("Zivotinja", zivotinjaShema,"zivotinje");