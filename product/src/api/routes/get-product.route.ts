import {Request, Response} from "express";
import {Repository} from "typeorm";
import {ProductEntity} from "../../persistence/entities/product.entity";

export function getProductRouteFactory(productRepository : Repository<ProductEntity>){
    return (req: Request, res: Response) => {

    }
}