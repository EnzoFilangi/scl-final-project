import {Request, Response} from "express";
import {Repository} from "typeorm";
import {ProductEntity} from "../../persistence/entities/product.entity";

export function getProductRouteFactory(productRepository : Repository<ProductEntity>){
    return async (req: Request, res: Response) => {
        const productId: string = req.params['productId'] as string;

        if (!productId) {
            res.sendStatus(400);
            return;
        }

        let product;
        try {
            product = await productRepository.findOneBy({
                id: productId
            })
        } catch (e) {
            res.sendStatus(400);
            return;
        }

        if (!product) {
            res.sendStatus(404);
            return;
        }

        res.json(product)
    }
}