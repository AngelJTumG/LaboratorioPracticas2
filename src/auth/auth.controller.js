import { hash, verify } from "argon2";
import Student from "../student/student.model.js";
import Teacher from "../teacher/teacher.model.js";

export const register = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password);
        data.password = encryptedPassword;
        data.profilePicture = profilePicture;

        let user;
        if (data.role === "STUDENT_ROLE") {
            user = await Student.create(data);
        } else if (data.role === "TEACHER_ROLE") {
            user = await Teacher.create(data);
        } else {
            return res.status(400).json({
                message: "Invalid role specified"
            });
        }

        return res.status(201).json({
            message: "User has been created",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
};

export const login = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        let user = await Student.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (!user) {
            user = await Teacher.findOne({
                $or: [{ email: email }, { username: username }]
            });
        }

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: "No user found with the provided email or username"
            });
        }

        const validPassword = await verify(user.password, password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: "Incorrect password"
            });
        }

        const token = await generateJWT(user.id);

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                profilePicture: user.profilePicture,
                role: user.role
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        });
    }
};