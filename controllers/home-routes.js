const { Garden, User, Plant } = require('../models');

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("login");
});

// USER LOGIN
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // take user to login page
  res.render("login");
});

// USER SIGNUP
router.get('/signup', (req, res) => {
  res.render('signup')
})

// Community Page where all the created gardens can be seen
router.get('/community', (req, res) => {
  Garden.findAll ({
    attributes: ['id', 'garden_name', 'created_at'], 
    include: {
      model: User, 
      attributes: ['username'] 
    }
  })
  .then(dbGardenData =>{
    const gardens = dbGardenData.map(garden => garden.get({ plain: true }))
    res.render('community',{
      gardens,
      loggedIn: req.session.loggedIn
    })
  })


});

// single garden page by the community that contains all information about the garden
router.get('/community/garden/:id', (req, res) => {
  Garden.findOne ({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'garden_name'], 
    include:[
      {
        model: User, 
        attributes: ['username'] 
      },
      {
       model: Plant, 
       attributes: ["id", "name", "type"]
      }
    ]  
  })
  .then(dbGardenData =>{
    const garden = dbGardenData.get({ plain: true });
    res.render('one-garden',{
      garden,
      loggedIn: req.session.loggedIn
    })
  })

});

router.get('/zone', (req, res) => {
  res.render('zoneSearch', { loggedIn: req.session.loggedIn });
});

router.get('/home', (req, res) => {
  res.render('homepage', { loggedIn: req.session.loggedIn })
});

module.exports = router;
