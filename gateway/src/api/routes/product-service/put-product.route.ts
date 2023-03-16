import {AxiosError, AxiosInstance} from "axios";
import {Request, Response} from "express";

export function putProductRouteFactory(axios: AxiosInstance){
    return async (req: Request, res: Response) => {
        const productId = req.params['productId'];
        const body = req.body;
        const cookieHeaders = {cookie: req.headers.cookie}

        try {
            const {data} = await axios.put(`${process.env.PRODUCT_SERVICE_URL}/products/${productId}`, body, {
                headers: cookieHeaders
            })
            res.json(data);
        } catch (e) {
            const status = (e as AxiosError)?.response?.status ?? 500;
            res.sendStatus(status);
        }
    }
}