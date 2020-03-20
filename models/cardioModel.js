const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CardioSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  }
 
});

const Cardio = mongoose.model("Cardio", CardioSchema);

module.exports = Cardio;
