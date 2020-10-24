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
export const createAccessToken = async (email: string) => {
    const [user] = await knex.table("users").select("*").where({ email });
    let id: number;

    if (user) {
        id = user.id;
    } else {
        const newUser = await createUser(email);
        id = newUser.id;
    }

    return jwt.sign(
        { id, email },
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
    const [user] = await knex.table("users").insert({ email }).returning<{id: number; email: string;}[]>(["id", "email"]);

    return user;
}