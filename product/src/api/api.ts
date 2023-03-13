import express, {Router} from 'express';
import {ProductEntity} from "../persistence/entities/product.entity";
import {DataSource, Repository} from "typeorm";
import {getAllProductsRouteFactory} from "./routes/get-all-products.route";
import {getProductRouteFactory} from "./routes/get-product.route";
import {addProductRouteFactory} from "./routes/add-product.route";
import {updateProductRouteFactory} from "./routes/update-product.route";
import {deleteProductRouteFactory} from "./routes/delete-product.route";

export const router = express.Router()

export function registerRoutes(router: Router, dataSource: DataSource){
    const productRepository : Repository<ProductEntity> = dataSource.getRepository(ProductEntity.name);

    router.get("/products", getAllProductsRouteFactory(productRepository))
    router.get("/products/:productId", getProductRouteFactory(productRepository))
    router.post("/products", addProductRouteFactory(productRepository))
    router.put("/products/:productId", updateProductRouteFactory(productRepository))
    router.delete("/products/:productId", deleteProductRouteFactory(productRepository))
}