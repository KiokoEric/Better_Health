const mongoose = require("mongoose")
const WorkoutSchema = new mongoose.Schema ({
    Name: {
        type: String,
        required: true
    },
    Muscle: {
        type: String,
        required: true 
    },
    Category: {
        type: String,
        required: true
    },
    Instructions: { 
        type: Array,
        required: true   
    },
    Image: {
        type: String
    },
    Date: {
        type: Date, 
        default: Date.now,
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
})

module.exports = mongoose.model("Workout", WorkoutSchema)