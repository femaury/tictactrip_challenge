import * as dotenv from "dotenv";

dotenv.config();

export default {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || "localhost",
    ROUTE_PREFIX: process.env.ROUTE_PREFIX,
    JWT_SECRET: process.env.JWT_SECRET || "supersecret",
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1d",
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://localhost:5432/postgres"
};