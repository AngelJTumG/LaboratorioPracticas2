import { Schema, model} from "mongoose";

const StudentSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    surname: {
        type: String,
        required: [true, "Surname is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        uique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    phone:{
        type: String,
        minLength: 8,
        required: [true, "Phone is required"],
        unique: true
    },
    role:{
        type: String,
        required: true,
        enum: ["STUDENT_ROLE", "TEACHER_ROLE"]
    },
    status:{
        type: Boolean,
        default: true
    },
    classes: [{
        type: Schema.ObjectId,
        ref: 'Class'
    }]
},
{
    versionKey: false,
    timestamps: true
})

StudentSchema.methods.toJSON = function() {
    const {_id, password, ...student } = this.toObject();
    student.uid = _id;
    return student;
};
export default model("Student", StudentSchema)