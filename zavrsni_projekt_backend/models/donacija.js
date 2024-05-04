const mongoose = require('mongoose');
const { Schema } = mongoose;

const donacijaShema = new Schema({
  kategorija: String,
  vrijednost: Number,
  tip: { type: String, default: "Ostalo" },
  opis: String,
  donatorId:  { type: Schema.Types.ObjectId, ref: 'Korisnik' },
  donatorUsername:String,
});

module.exports = mongoose.model("Donacija", donacijaShema,"donacije");