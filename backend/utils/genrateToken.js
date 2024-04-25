import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
const Secret = process.env.SECRET_KEY;

const generateTokenSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, Secret);

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3600000 * 24, // 1 day in milliseconds
        sameSite: "strict"
    });
};


export default generateTokenSetCookie;
