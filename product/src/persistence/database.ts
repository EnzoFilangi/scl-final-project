import {DataSource} from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env[`TYPEORM_URL`],
    database: "products",
    synchronize: true,
    logging: process.env.NODE_ENV !== "production",
    entities: [__dirname + './entities/**.entity{.ts,.js}'],
    subscribers: [],
    migrations: [],
})