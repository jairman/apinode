import { config } from "dotenv";

config();

export default {
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    user: process.env.USERN || "",
    password: process.env.PASSWORD || "",
    token : process.env.TOKEN_SECRET
};