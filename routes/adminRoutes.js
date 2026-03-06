const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");
const admin = require("../controllers/adminController");

// Messages
router.get("/messages", verifyToken, isAdmin, admin.getMessages);

// Projects
router.post("/project", verifyToken, isAdmin, admin.addProject);
router.get("/projects", verifyToken, isAdmin, admin.getProjects);
router.delete("/project/:id", verifyToken, isAdmin, admin.deleteProject);

// Education
router.post("/education", verifyToken, isAdmin, admin.addEducation);
router.get("/education", verifyToken, isAdmin, admin.getEducation);

// Certification
router.post("/certification", verifyToken, isAdmin, admin.addCertification);
router.get("/certification", verifyToken, isAdmin, admin.getCertification);

module.exports = router;