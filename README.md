# Endpoints

## LOGIN
----------------------------------------
### POST /v1/auth/login
  **Parámetros:**
    - body: 
      ```json
      {
        "email": "string",
        "password": "string"
      }
      ```

## Students
----------------------------------------
### POST /v1/auth/register
  **Parámetros:**
    - body: 
      ```json
      {
        "name": "Nombre",
        "surname": "Apellido",
        "email": "email@example.com",
        "password": "Contraseña123!",
        "phone": "12345678",
        "role": "STUDENT_ROLE"
      }
      ```

### GET /v1/student/findStudent/:uid
  **Parámetros:**
    - uid: string (ID del estudiante)

### GET /v1/student/
  **Parámetros:**
    - Ninguno

### DELETE /v1/student/deleteStudent/:uid
  **Parámetros:**
    - uid: string (ID del estudiante)

### PATCH /v1/student/updatePassword/:uid
  **Parámetros:**
    - uid: string (ID del estudiante)
    - body: 
      ```json
      {
        "newPassword": "string"
      }
      ```

### PUT /v1/student/updateStudent/:uid
  **Parámetros:**
    - uid: string (ID del estudiante)
    - body: 
      ```json
      {
        "name": "string",
        "email": "string",
        "age": "number",
        "class": "string"
      }
      ```

### POST /v1/student/assignClass/:uid
  **Parámetros:**
    - uid: string (ID del estudiante)
    - body: 
      ```json
      {
        "classId": "string"
      }
      ```

### GET /v1/student/assignedClasses/:uid
  **Parámetros:**
    - uid: string (ID del estudiante)

## TEACHER
----------------------------------------
### POST /v1/auth/register
  **Parámetros:**
    - body: 
      ```json
      {
        "name": "Nombre del profesor",
        "surname": "Apellido del profesor",
        "email": "email@example.com",
        "password": "Contraseña123!",
        "asignature": "Asignatura",
        "role": "TEACHER_ROLE"
      }
      ```

### GET /v1/teacher/findTeacher/:uid
  **Parámetros:**
    - uid: string (ID del profesor)

### GET /v1/teacher/
  **Parámetros:**
    - Ninguno

### DELETE /v1/teacher/deleteTeacher/:uid
  **Parámetros:**
    - uid: string (ID del profesor)

### PATCH /v1/teacher/updatePassword/:uid
  **Parámetros:**
    - uid: string (ID del profesor)
    - body: 
      ```json
      {
        "newPassword": "string"
      }
      ```

### PUT /v1/teacher/updateTeacher/:uid
  **Parámetros:**
    - uid: string (ID del profesor)
    - body: 
      ```json
      {
        "name": "string",
        "email": "string",
        "age": "number",
        "subject": "string"
      }
      ```

### POST /v1/teacher/assignClass/:uid
  **Parámetros:**
    - uid: string (ID del profesor)
    - body: 
      ```json
      {
        "classId": "string"
      }
      ```

### GET /v1/teacher/assignedClasses/:uid
  **Parámetros:**
    - uid: string (ID del profesor)

## CLASSES
----------------------------------------
### POST /v1/class/createClass
  **Parámetros:**
    - body: 
      ```json
      {
        "className": "Mate",
        "teacher": "67a9450a5a6075f422d88dbb",
        "schedule": "Horario de la clase"
      }
      ```

### GET /v1/class/findClass/:classId
  **Parámetros:**
    - classId: string (ID de la clase)

### GET /v1/class/
  **Parámetros:**
    - Ninguno

### DELETE /v1/class/deleteClass/:classId
  **Parámetros:**
    - classId: string (ID de la clase)

### PATCH /v1/class/updateClass/:classId
  **Parámetros:**
    - classId: string (ID de la clase)
    - body: 
      ```json
      {
        "name": "string",
        "description": "string",
        "teacherId": "string"
      }
      ```

### GET /v1/class/assignedStudents/:classId
  **Parámetros:**
    - classId: string (ID de la clase)
