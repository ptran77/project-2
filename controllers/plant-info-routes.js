const { Plant } = require('../models');
const router = require('express').Router();

router.get('/', (req, res) => {
    Plant.findAll({
        attributes: [
            'id',
            'name',
            'type',
            'sun_intake',
            'water_intake',
            'soil_type'
        ]
    })
    .then(dbPlantData => {
        // serialize data before handing it to the template
        const plants = dbPlantData.map(plant => plant.get({ plain: true }));
        res.render('plants', { plants });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });  
});


router.get('/:id', (req, res) => {
    Plant.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'type',
            'sun_intake',
            'water_intake',
            'soil_type'
        ]
    })
    .then(dbPlantData => {
        if (!dbPlantData) {
            res.status(400).json({ message: 'No plant matches this id'});
            return;
        }
        // serialize the data
        const plant = dbPlantData.get({ plain: true });
        // pass data to template
        res.render('single-plant', { plant });
    })
   .catch(err => {
    console.log(err);
    res.status(500).json(err);
   });
});

router.get('/add-plant', (req, res) => {
    res.render('add-plant')
});

module.exports = router;