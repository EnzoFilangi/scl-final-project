import express, {Router} from 'express';
import axios from "axios";
import {getHelloRouteFactory} from "./routes/hello-service/get-hello.route";
import {getAllProductsRouteFactory} from "./routes/product-service/get-all-products.route";
import {getProductRouteFactory} from "./routes/product-service/get-product.route";
import {postProductRouteFactory} from "./routes/product-service/post-product.route";
import {putProductRouteFactory} from "./routes/product-service/put-product.route";
import {deleteProductRouteFactory} from "./routes/product-service/delete-product.route";
import {postLongRunningTaskRouteFactory} from "./routes/distributed-service/post-long-running-task.route";

export const router = express.Router()

export function registerRoutes(router: Router){
    const axiosInstance = axios.create();

    router.get('/hello', getHelloRouteFactory(axiosInstance));

    router.get('/catalog/products', getAllProductsRouteFactory(axiosInstance));
    router.get('/catalog/products/:productId', getProductRouteFactory(axiosInstance));
    router.post('/catalog/products', postProductRouteFactory(axiosInstance));
    router.put('/catalog/products/:productId', putProductRouteFactory(axiosInstance));
    router.delete('/catalog/products/:productId', deleteProductRouteFactory(axiosInstance));

    router.post('/distributed/long-running-task', postLongRunningTaskRouteFactory(axiosInstance));
}