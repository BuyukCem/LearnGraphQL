import jwt from "jsonwebtoken";
import {AuthenticationError} from "apollo-server-express";

const getUser = async (req) => {
    const token = req.headers['token'];

    if (token) {
        try {
            return await jwt.verify(token, 'riddlemethis');
        } catch (e) {
            throw new AuthenticationError('Your session expired. Sign in again.');
        }
    }
};
export default getUser;