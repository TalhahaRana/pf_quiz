// src/mocks/userData.js
export const userData = {
    admin: {
      name: "Admin User",
      role: "admin",
      quizzes: [],
      students: [],
    },
    supervisor: { name: "Supervisor User",
      role: "supervisor",
      quizzes: [],
      students: [], },
    manager: {
      name: "Manager User",
      role: "manager",
      quizzes: [],
      students: [],
    },
    student: {
      name: "Student User",
      role: "student",
      quizzes: [
        { title: "Math Quiz", status: "Pending" },
        { title: "Science Quiz", status: "Completed" },
      ],
    },
  };
  