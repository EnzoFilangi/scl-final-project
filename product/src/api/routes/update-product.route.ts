import {Request, Response} from "express";
import {Repository} from "typeorm";
import {ProductEntity} from "../../persistence/entities/product.entity";

export function updateProductRouteFactory(productRepository : Repository<ProductEntity>){
    return async (req: Request, res: Response) => {
        const productId: string = req.query['productId'] as string;

        if (!productId) {
            res.sendStatus(400);
            return;
        }

        const body: { name ?: any, price ?: any } = req.body;

        if (!body.name || !body.name){
            res.sendStatus(400);
            return;
        }

        if (!(typeof body.name === 'string') || !(typeof body.price === 'number')){
            res.sendStatus(400);
            return;
        }

        const product = await productRepository.findOneBy({
            id: productId
        })

        if (!product) {
            res.sendStatus(404);
            return;
        }

        product.name = body.name;
        product.price = body.price;
        await productRepository.save(product);

        res.sendStatus(200);
    }
}