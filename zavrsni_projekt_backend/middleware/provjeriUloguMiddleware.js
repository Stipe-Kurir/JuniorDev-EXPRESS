
const provjeriUloguMiddleware = (uloga) => (req, res, next) => {
    if (req.korisnik && req.korisnik.role === uloga) {
      next();
    } else {
      res.status(403).send(`Zabranjen pristup - vaša uloga je ${req.korisnik.role} `);
    }
  };
  
  module.exports = provjeriUloguMiddleware;
  