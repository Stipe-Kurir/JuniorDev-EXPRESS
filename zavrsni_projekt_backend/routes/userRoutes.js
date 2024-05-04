const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

const checkTokenMiddleware=require('../middleware/checkTokenMiddleware')
const provjeriUloguMiddleware = require('../middleware/provjeriUloguMiddleware');
const errorHandlingMiddleware=require('../middleware/errorHandlingMiddleware')
const loggingMiddleware=require('../middleware/loggingMiddleware')

const Korisnik  = require('../models/korisnik');
const secretKey = process.env.TAJNI_KLJUC;
const saltRunde = 10;


 
router.post('/registracija',loggingMiddleware,async (req, res,next) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({ errors: ['Nedostaju obavezni podaci'] });
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ errors: ['Neispravan format e-mail adrese'] });
    }
    if (req.body.password.length < 6) {
      return res.status(400).json({ errors: ['Lozinka mora sadržavati barem 6 znakova'] });
    }
  
    try {
      const hashLozinka = await bcrypt.hash(req.body.password, saltRunde);
      const noviKorisnik = new Korisnik({ ...req.body, password: hashLozinka });
      await noviKorisnik.save();
      res.status(201).send('Korisnik uspješno registriran');
    } catch (error) {
      next(error);
    }
  });

  router.post('/prijava',loggingMiddleware,async (req, res,next) => {

    if ( !req.body.email || !req.body.password) {
        return res.status(400).json({ errors: ['Nedostaju obavezni podaci'] });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ errors: ['Neispravan format e-mail adrese'] });
    }

    if (req.body.password.length < 6) {
        return res.status(400).json({ errors: ['Lozinka mora sadržavati barem 6 znakova'] });
    }


    try {
    const korisnikBaza = await Korisnik.findOne({ email: req.body.email });
    if (korisnikBaza && await bcrypt.compare(req.body.password, korisnikBaza.password)) {
    const token = jwt.sign({ username: korisnikBaza.username ,role:korisnikBaza.role,id: korisnikBaza._id}, `${secretKey}`, { expiresIn: '1h' });
   
    res.json({ token ,user: korisnikBaza});
   
    } else {
    res.status(401).send('Neispravni podaci za prijavu'); 
    }
    } catch (error) {
      next(error);

    }
    });
   
   

  router.get('/getUserInfo', checkTokenMiddleware, async(req, res,next) => {
    try {
  
      const userId = req.korisnik.id;
      const userData = await Korisnik.findById(userId).populate('donacije');
      
      if (!userData) {
        return res.status(401).json({ message: 'User is not logged in' });
      }
      console.log(userData)
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  });
  

  router.get('/provjeri-prijavu', checkTokenMiddleware, (req, res) => {
    const { role,username } = req.korisnik;
    res.json({ isLoggedIn: true, role ,username});
  });
  

 
  router.get('/samo-admin',  checkTokenMiddleware, provjeriUloguMiddleware('admin'), (req, res) => {
    res.json({ isAdmin: true });
  });

  router.get('/user-role', checkTokenMiddleware, (req, res) => {
    const { role } = req.korisnik;
    const isAdmin = role === 'admin';
    res.json({ isAdmin });
  });
 
  router.use(errorHandlingMiddleware);
  
module.exports = router;

