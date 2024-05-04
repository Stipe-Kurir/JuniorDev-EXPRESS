const express = require('express');
const router = express.Router();
const loggingMiddleware=require('../middleware/loggingMiddleware')
const Obavijest  = require('../models/obavijest');


router.get('/',async(req,res)=>{

  try {
    const sveObavijesti = await Obavijest.find();
    res.json(sveObavijesti);
    } catch (error) {
    res.status(500).send(error.message);
    }

})

router.post('/',loggingMiddleware,async(req,res)=>{

  const novaObavijest = new Obavijest(req.body);
 
  try{
    await novaObavijest.save();
    res.send("Nova obavijest spremljena u bazu!");
  }
    catch(error){
      res.status(500).send(error.message);
  }
});

router.delete('/:id',loggingMiddleware,async(req,res)=>{
 
  try {
    const obavijest = await Obavijest.findByIdAndDelete(req.params.id);
    if (!obavijest) {
      return res.status(404).send('Obavijest ne postoji');
    }
    res.send('Obavijest izbrisana');
  } catch (error) {
    res.status(500).send(error.message);
  }
 });

module.exports = router;