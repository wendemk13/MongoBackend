import express from "express"
import { Register, login, logout } from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/Register", Register)
router.get("/test", (req, res) => {
    res.json({ message: "Testing..." })
})
router.post('/login', login)

router.get("/dashboard", verifyToken, (req, res) => {
    res.status(200).json({ message: `hello, Welcome  ${req.user.name}!`, user: req.user });
});
router.post('/logout', logout)
export default router;