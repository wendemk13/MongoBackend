import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    // const authHeader = req.headers.authorization;


    // // if (!authHeader) return res.status(400).json({ message: "Not token provided." })
    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //     return res.status(401).json({ message: "No token provided" });
    // }


    // or if cookie
    const token = req.cookies.token;  // get token from HttpOnly cookie
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    // const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_Secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(500).json({ message: "not valid token", error })
    }
}