const express = require('express');
const router = express.Router();
const checkTokenMiddleware=require('../middleware/checkTokenMiddleware')
const loggingMiddleware=require('../middleware/loggingMiddleware')
const Donacija  = require('../models/donacija');
const Korisnik=require('../models/korisnik')



router.post('/',checkTokenMiddleware,loggingMiddleware,async(req,res)=>{

  const { id, username } = req.korisnik;
  const novaDonacija = new Donacija({...req.body,
    donatorId: id,
    donatorUsername: username});
 
    try {
      await novaDonacija.save();

      const korisnik = await Korisnik.findById(id);

      if (!korisnik) {
        return res.status(404).send("Korisnik not found");
      }
      korisnik.donacije.push(novaDonacija._id); // Add the ID of the new donation to the user's donations array
      await korisnik.save(); // Save the updated user
  
      res.send("Nova donacija spremljena u bazu!");
    } catch (error) {
      res.status(500).send(error.message);
    }
});

router.get('/',async(req,res)=>{

  try {
    const sveDonacije = await Donacija.find();
    res.json(sveDonacije);
    } catch (error) {
    res.status(500).send(error.message);
    }

})

router.delete('/:id',async(req,res)=>{
  try {
    const donacija = await Donacija.findByIdAndDelete(req.params.id);
    if (!donacija) {
      return res.status(404).send('Donacija ne postoji');
    }

    // Find the user associated with the donation and remove the donation from their list of donations
    const korisnik = await Korisnik.findOneAndUpdate(
      { donacije: req.params.id },
      { $pull: { donacije: req.params.id } }
    );

    if (!korisnik) {
      return res.status(404).send('Korisnik ne postoji');
    }
    res.send('Donacija izbrisana');
  }
  catch (error) {
    res.status(500).send(error.message);
  }
 });

 router.patch("/:id",loggingMiddleware , async (req, res) => {
  try {
    const donacija = await Donacija.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!donacija) {
      return res.status(404).send("Rezervacija ne postoji");
    }
    res.json(donacija);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;