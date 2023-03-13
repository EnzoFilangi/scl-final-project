import {Request, Response} from "express";
import {Repository} from "typeorm";
import {ProductEntity} from "../../persistence/entities/product.entity";

export function getProductRouteFactory(productRepository : Repository<ProductEntity>){
    return async (req: Request, res: Response) => {
        const productId: string = req.query['productId'] as string;

        if (!productId) {
            res.sendStatus(400);
            return;
        }

        const product = await productRepository.findOneBy({
            id: productId
        })

        res.json(product)
    }
}