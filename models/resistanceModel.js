const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResistanceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
});

const Resistance = mongoose.model("Resistance", ResistanceSchema);

module.exports = Resistance;
