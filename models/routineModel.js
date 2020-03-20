const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoutineSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resistance",
      required: false
      
    },
    {
      type: Schema.Types.ObjectId,
      ref: "Cardio",
      required: false

    }
 
  ]
});

const Routine = mongoose.model("Routine", RoutineSchema);

module.exports = Routine;
