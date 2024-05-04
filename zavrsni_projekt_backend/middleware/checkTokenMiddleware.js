
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });


const secretKey = process.env.TAJNI_KLJUC;


const checkTokenMiddleware = (req, res, next) => {
    const authZaglavlje = req.headers['authorization'];
    if (!authZaglavlje) return res.status(403).send('Ne postoji autorizacijsko zaglavlje');
   
    const token = authZaglavlje.split(' ')[1];
    if (!token) return res.status(403).send('Bearer token nije pronađen');
   
    try {
    const dekodiraniToken = jwt.verify(token, secretKey);
    req.korisnik = dekodiraniToken;
    } catch (err) {
      next(err)
    }
    return next();
   };
  
   module.exports = checkTokenMiddleware;