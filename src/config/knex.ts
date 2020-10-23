import { types } from "pg";
import knex from "knex";
import config from "./index";

// Override Date() parsing of pg's Date format.
types.setTypeParser(1082, (val) => val);

export default knex({
    client: "pg",
    connection: config.DATABASE_URL
})