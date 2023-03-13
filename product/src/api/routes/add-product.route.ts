import {Request, Response} from "express";
import {Repository} from "typeorm";
import {ProductEntity} from "../../persistence/entities/product.entity";

export function addProductRouteFactory(productRepository : Repository<ProductEntity>){
    return async (req: Request, res: Response) => {
        const product: { name ?: any, price ?: any } = req.body;

        if (!product.name || !product.name){
            res.sendStatus(400);
            return;
        }

        if (!(typeof product.name === 'string') || !(typeof product.price === 'number')){
            res.sendStatus(400);
            return;
        }

        const newProduct = new ProductEntity(product.name, product.price);
        await productRepository.save(newProduct);

        res.sendStatus(201);
    }
}