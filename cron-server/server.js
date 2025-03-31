
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const db = {};

const sequelize = new Sequelize(`${process.env.SUPABASE_DB_URL}`,
    {
        dialect: 'postgres'
    }
);

db.sequelize = sequelize;

import {Mail}  from "./models/mail.js";

sequelize.authenticate().then(async () => {
    console.log('Connection has been established successfully.');
    await sequelize.sync();

    // Delete Expired Emails
    Mail().destroy({
        where: {
            expires: {
                [Sequelize.Op.lt]: new Date()
            }
        }
    }).then((data) => {
        console.log(data);
    }).catch((err) => {
        console.error('Error fetching data:', err);
    });

}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});
