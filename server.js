const express = require("express");
const mongoose = require("mongoose");


const PORT = process.env.PORT || 3000;
const db = require("./models");

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/gitFit", { useNewUrlParser: true });



//CREATE ROUTINE
app.post("/api/routine", (req, res) => {
  console.log(`this is body: ${JSON.stringify(req.body.name)} `)
  const routineName = req.body.name

  db.Routine.create({ name: routineName })
    .then(dbRoutine => {
      res.json(dbRoutine);
      console.log(dbRoutine);
    })
    .catch(({ message }) => {
      console.log(message);
    });

});




//Get all routines
app.get("/routine", (req, res) => {
  db.Routine.find({})
    .then(dbRoutine => {
      res.json(dbRoutine);
    })
    .catch(err => {
      res.json(err);
    });
});



//Get all exercises
app.get("/exercise", (req, res) => {
  db.Exercises.find({})
    .then(dbRoutine => {
      res.json(dbRoutine);
    })
    .catch(err => {
      res.json(err);
    });
});



//Delete routine - does not delete associated exercises. 

app.delete('/routine/:id', (req, res) => {
  db.Routine.remove({
    _id: req.params.id
  })
  .then(dbRoutine => {
    res.json(dbRoutine);
  })
  .catch(err => {
    res.json(err);
  });

})

//get routine by id && update body? 
app.post('/routine/:id',(req,res) =>{
  db.Routine.find({
    _id: req.params.id
  })
  .then(({ _id }) => db.Routine.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name, completed: req.body.completed }, { new: true }))

  .then(dbRoutine=>{
    res.json(dbRoutine)
  }).catch(err=>{
    res.json(err)
  })
  
  })

//  create new exercise and updating Routines "exercise" field with it
app.post("/exercise/:id", (req, res) => {

  console.log('this is res.body ' + JSON.stringify(req.body))
  const anothaOne = `name: ${req.body.name}, duration: ${req.body.duration}`
 
  db.Exercises.create(req.body)
  
    .then(({}) => db.Routine.findByIdAndUpdate( req.params.id , { $push:  {exercises:  req.body} },{ new: true }))
    .then(dbRoutine => {
      res.json(dbRoutine);

    })
    .catch(err => {
      res.json(err);
    });
});







//Delete Exercise

app.delete('/exercise/:id', (req, res) => {
  db.Exercises.remove({
    _id: req.params.id
  })
  .then(dbRoutine => {
    res.json(dbRoutine);
  })
  .catch(err => {
    res.json(err);
  });

})

app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});
