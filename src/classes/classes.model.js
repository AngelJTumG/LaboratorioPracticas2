import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ClassesSchema = new Schema({
    className: {
        type: String,
        required: [true, "Class name is required"]
    },
    students: [{
        type: Schema.ObjectId,
        ref: 'Student'
    }],
    teacher: {
        type: Schema.ObjectId,
        ref: 'Teacher',
        required: [true, "Teacher is required"]
    },
    schedule: {
        type: String,
        required: [true, "Schedule is required"]
    }
}, {
    timestamps: true,
    versionKey: false,
});

export default model("Class", ClassesSchema);