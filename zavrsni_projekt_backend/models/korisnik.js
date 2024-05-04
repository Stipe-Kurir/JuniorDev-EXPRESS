const mongoose = require('mongoose');

const { Schema } = mongoose;

const korisnikShema = new Schema({
  username: String,
  password: String,
  role: { type: String, default: "korisnik" },
  email: { type: String, unique: true },
  donacije: [{ type: Schema.Types.ObjectId, ref: 'Donacija' }]
});

module.exports = mongoose.model("Korisnik", korisnikShema,"korisnici");