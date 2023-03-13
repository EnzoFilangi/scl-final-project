import {DataSource} from "typeorm"
import {ProductEntity} from "./entities/product.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env[`TYPEORM_URL`],
    database: "products",
    synchronize: true,
    logging: process.env.NODE_ENV !== "production",
    entities: [ProductEntity],
    subscribers: [],
    migrations: [],
})