import Class from "./classes.model.js";
import Student from "../student/student.model.js";
import Teacher from "../teacher/teacher.model.js";

export const createClass = async (req, res) => {
    try {
        const data = req.body;

        const teacher = await Teacher.findById(data.teacher);
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado"
            });
        }

        const newClass = await Class.create(data);

        teacher.classes.push(newClass._id);
        await teacher.save();

        return res.status(201).json({
            success: true,
            message: "Clase creada",
            class: newClass
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear la clase",
            error: err.message
        });
    }
};

export const updateClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const data = req.body;

        const classDoc = await Class.findByIdAndUpdate(classId, data, { new: true });

        if (!classDoc) {
            return res.status(404).json({
                success: false,
                message: "Clase no encontrada"
            });
        }

        // Actualizar la clase en los estudiantes asignados
        await Student.updateMany(
            { classes: classId },
            { $set: { "classes.$": classDoc._id } }
        );

        return res.status(200).json({
            success: true,
            message: "Clase actualizada",
            class: classDoc
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la clase",
            error: err.message
        });
    }
};

export const deleteClass = async (req, res) => {
    try {
        const { classId } = req.params;

        const classDoc = await Class.findByIdAndDelete(classId);

        if (!classDoc) {
            return res.status(404).json({
                success: false,
                message: "Clase no encontrada"
            });
        }

        // Desasignar la clase de los estudiantes
        await Student.updateMany(
            { classes: classId },
            { $pull: { classes: classId } }
        );

        return res.status(200).json({
            success: true,
            message: "Clase eliminada",
            class: classDoc
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la clase",
            error: err.message
        });
    }
};

export const getClassById = async (req, res) => {
    try {
        const { classId } = req.params;
        const classDoc = await Class.findById(classId).populate('students teacher');

        if (!classDoc) {
            return res.status(404).json({
                success: false,
                message: "Clase no encontrada"
            });
        }

        return res.status(200).json({
            success: true,
            class: classDoc
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener la clase",
            error: err.message
        });
    }
};

export const getClasses = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [total, classes] = await Promise.all([
            Class.countDocuments(query),
            Class.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('students teacher')
        ]);

        return res.status(200).json({
            success: true,
            total,
            classes
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las clases",
            error: err.message
        });
    }
};

export const assignStudentToClass = async (req, res) => {
    try {
        const { classId, studentId } = req.params;

        const classDoc = await Class.findById(classId);
        const student = await Student.findById(studentId);

        if (!classDoc || !student) {
            return res.status(404).json({
                success: false,
                message: "Clase o estudiante no encontrado"
            });
        }

        if (student.classes.length >= 3) {
            return res.status(400).json({
                success: false,
                message: "El estudiante ya está asignado a 3 clases"
            });
        }

        if (student.classes.includes(classId)) {
            return res.status(400).json({
                success: false,
                message: "El estudiante ya está asignado a esta clase"
            });
        }

        student.classes.push(classId);
        await student.save();

        classDoc.students.push(studentId);
        await classDoc.save();

        return res.status(200).json({
            success: true,
            message: "Estudiante asignado a la clase",
            class: classDoc
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al asignar estudiante a la clase",
            error: err.message
        });
    }
};