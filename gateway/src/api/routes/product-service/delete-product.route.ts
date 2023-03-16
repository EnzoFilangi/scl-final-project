import {AxiosError, AxiosInstance} from "axios";
import {Request, Response} from "express";

export function deleteProductRouteFactory(axios: AxiosInstance){
    return async (req: Request, res: Response) => {
        const productId = req.params['productId'];
        const cookieHeaders = {cookie: req.headers.cookie}

        try {
            const {data} = await axios.delete(`${process.env.PRODUCT_SERVICE_URL}/products/${productId}`, {
                headers: cookieHeaders
            })
            res.json(data);
        } catch (e) {
            const status = (e as AxiosError)?.response?.status ?? 500;
            res.sendStatus(status);
        }
    }
}