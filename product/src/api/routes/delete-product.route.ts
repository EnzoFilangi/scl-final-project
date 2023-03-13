import {Request, Response} from "express";
import {Repository} from "typeorm";
import {ProductEntity} from "../../persistence/entities/product.entity";

export function deleteProductRouteFactory(productRepository : Repository<ProductEntity>){
    return async (req: Request, res: Response) => {
        const productId: string = req.params['productId'] as string;

        if (!productId) {
            res.sendStatus(400);
            return;
        }

        try {
            await productRepository.delete({
                id: productId
            })
        } catch (e) {
            res.sendStatus(400);
            return;
        }

        res.sendStatus(200);
    }
}