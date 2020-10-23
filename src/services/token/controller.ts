import jwt from "jsonwebtoken";
import config from "../../config";
import knex from "../../config/knex";

/**
 * Creates JWT with email of user
 * 
 * @param email email of user to add to JWT
 * 
 * @returns access token
 */
export const createAccessToken = (email: string) => {
    return jwt.sign(
        { email },
        config.JWT_SECRET,
        { algorithm: "HS256", expiresIn: config.JWT_EXPIRATION }
    );
}

/**
 * Creates and registers a new user.
 * 
 * @param email email of user to create
 */
export const createUser = async (email: string) => {
    await knex.table("users").insert({ email })
}