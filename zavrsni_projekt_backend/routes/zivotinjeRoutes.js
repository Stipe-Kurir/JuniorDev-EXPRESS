const express = require('express');
const router = express.Router();
const loggingMiddleware=require('../middleware/loggingMiddleware')
const Zivotinja = require('../models/zivotinja');


router.post('/',loggingMiddleware,async(req,res)=>{

  const novaZivotinja = new Zivotinja(req.body);
 
  try{
    await novaZivotinja.save();
    res.send("Nova zivotinja spremljena u bazu!");
  }
    catch(error){
      res.status(500).send(error.message);
  }
});

router.get('/',async(req,res)=>{

  try {
    const sveZivotinje = await Zivotinja.find();
    res.json(sveZivotinje);
    } catch (error) {
    res.status(500).send(error.message);
    }

})


router.patch("/:id",loggingMiddleware, async (req, res) => {
  try {
    const zivotinja = await Zivotinja.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!zivotinja) {
      return res.status(404).send("Rezervacija ne postoji");
    }
    res.json(zivotinja);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;