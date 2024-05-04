const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

// Učitavanje ruta
const userRoute = require('./routes/userRoutes');
const donacijeRoute = require('./routes/donacijeRoutes');
const zivotinjeRoute = require('./routes/zivotinjeRoutes');
const obavijestiRoute = require('./routes/obavijestiRoutes');

const app = express();

const ADRESA_BAZE = process.env.ADRESA_BAZE;


// Spajanje na bazu
mongoose.connect(`${ADRESA_BAZE}`, 
{ family: 4 });

// Instanca konekcije na bazu
const db = mongoose.connection;

// Upravljanje događajima
db.on('error', (error) => {
    console.error('Greška pri spajanju:', error);
});
db.once('open', function() {
    console.log('Spojeni smo na MongoDB bazu');
});

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


// Upotreba ruta
app.use('/user', userRoute);
app.use('/donacije', donacijeRoute);
app.use('/zivotinje', zivotinjeRoute);
app.use('/obavijesti', obavijestiRoute);


const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => {
  console.log(`Server sluša zahtjeve na portu ${PORT}`);
});