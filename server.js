const express = require("express");
const mongoose = require("mongoose");


const PORT = process.env.PORT || 3000;
const db = require("./models");

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/gitFit", { useNewUrlParser: true });

// routes
// app.use(require("./routes/api"))


app.post("/api/routine", (req, res) => {
  console.log(`this is body: ${JSON.stringify(req.body.name)} this is res ${res}`)
  const routineName = req.body.name
  
  db.Routine.create({ name: routineName})
  .then(dbRoutine => {
    console.log(dbRoutine);
  })
  .catch(({message}) => {
    console.log(message);
  });

});

// app.post("/api/routine", ({body}, res) => {
//   Routine.create(body)
//    .then(dbRoutine => {
//        res.json(dbRoutine);
//      console.log(dbRoutine);
//    })
//    .catch(({message}) => {
//      console.log(message);
//      res.status(400).json(err);
//    });
 
//  });


app.post("/cardio", ({body}, res) => {
  db.Cardio.create(body)
    .then(({_id}) => db.Routine.findOneAndUpdate({}, { $push: { exercise: _id } }, { new: true }))
    .then(dbRoutine => {
      res.json(dbRoutine);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/books", (req, res) => {
  db.Book.find({})
    .then(dbBook => {
      res.json(dbBook);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/routine", (req, res) => {
  db.Routine.find({})
    .then(dbRoutine => {
      res.json(dbRoutine);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/populated", (req, res) => {
  db.Routine.find({})
    .populate("books")
    .then(dbRoutine => {
      res.json(dbRoutine);
    })
    .catch(err => {
      res.json(err);
    });
});




app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});
