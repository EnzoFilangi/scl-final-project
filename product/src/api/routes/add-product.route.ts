import {Request, Response} from "express";
import {Repository} from "typeorm";
import {ProductEntity} from "../../persistence/entities/product.entity";

export function addProductRouteFactory(productRepository : Repository<ProductEntity>){
    return async (req: Request, res: Response) => {
        const body: { name ?: any, price ?: any } = req.body;

        if (!body.name || !body.name){
            res.sendStatus(400);
            return;
        }

        if (!(typeof body.name === 'string') || !(typeof body.price === 'number')){
            res.sendStatus(400);
            return;
        }

        const newProduct = new ProductEntity(body.name, body.price);
        try {
            await productRepository.save(newProduct);
        } catch (e) {
            res.sendStatus(400);
            return;
        }

        res.sendStatus(201);
    }
}