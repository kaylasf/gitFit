const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoutineSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  exercises: [
    {
   name: {
        type: String,
        required: false
    },
    distance: {
        type: Number,
        required: false
    },
    duration: {
        type: Number,
        required: false
    },

    weight: {
        type: Number,
        required: false
    },
    sets: {
        type: Number,
        required: false
    },
    reps: {
        type: Number,
        required: false
    }

    }
  ],
  completed: {
    type: Boolean,
    required: false
  },
});

const Routine = mongoose.model("Routine", RoutineSchema);

module.exports = Routine;
