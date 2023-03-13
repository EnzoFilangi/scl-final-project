import {Request, Response} from "express";
import {Repository} from "typeorm";
import {ProductEntity} from "../../persistence/entities/product.entity";

export function deleteProductRouteFactory(productRepository : Repository<ProductEntity>){
    return async (req: Request, res: Response) => {
        const productId: string = req.query['productId'] as string;

        if (!productId) {
            res.sendStatus(400);
            return;
        }

        await productRepository.delete({
            id: productId
        })

        res.sendStatus(200);
    }
}