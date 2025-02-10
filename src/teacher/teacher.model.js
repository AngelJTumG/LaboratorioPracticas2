import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    asignature:{
        type: String,
        required: [true, "Asignature is required"]
    },
    classes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Class'
    }]
},
{
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("Teacher", TeacherSchema);