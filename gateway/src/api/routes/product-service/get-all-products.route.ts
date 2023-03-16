import {AxiosError, AxiosInstance} from "axios";
import {Request, Response} from "express";

export function getAllProductsRouteFactory(axios: AxiosInstance){
    return async (req: Request, res: Response) => {
        const cookieHeaders = {cookie: req.headers.cookie}

        try {
            const {data} = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/products`, {
                headers: cookieHeaders
            })
            res.json(data);
        } catch (e) {
            const status = (e as AxiosError)?.response?.status ?? 500;
            res.sendStatus(status);
        }
    }
}