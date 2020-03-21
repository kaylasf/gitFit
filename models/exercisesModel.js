const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExercisesSchema = new Schema({
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
});

const Exercises = mongoose.model("Exercises", ExercisesSchema);

module.exports = Exercises;
