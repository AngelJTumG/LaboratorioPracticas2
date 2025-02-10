import Student from "../student/student.model.js";
import Teacher from "../teacher/teacher.model.js";

export const emailExistStudent = async (email = "") => {
    const emailExist = await Student.findOne({ email });
    if (emailExist) {
        throw new Error(`The email ${email} is already registered for a student`);
    }
};

export const emailExistTeacher = async (email = "") => {
    const emailExist = await Teacher.findOne({ email });
    if (emailExist) {
        throw new Error(`The email ${email} is already registered for a teacher`);
    }
};

export const userExists = async (identifier = "") => {
    const studentExist = await Student.findOne({ email: identifier });
    const teacherExist = await Teacher.findOne({ email: identifier });

    if (studentExist || teacherExist) {
        throw new Error(`The user with email ${identifier} is already registered`);
    }
};

export const userExistsById = async (uid = "") => {
    const studentExist = await Student.findById(uid);
    const teacherExist = await Teacher.findById(uid);

    if (!studentExist && !teacherExist) {
        throw new Error("No existe el usuario con el ID proporcionado");
    }
};