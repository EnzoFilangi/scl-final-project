import {AxiosError, AxiosInstance} from "axios";
import {Request, Response} from "express";

export function postProductRouteFactory(axios: AxiosInstance){
    return async (req: Request, res: Response) => {
        const body = req.body;
        const cookieHeaders = {cookie: req.headers.cookie}

        try {
            const {data} = await axios.post(`${process.env.PRODUCT_SERVICE_URL}/products`, body, {
                headers: cookieHeaders
            })
            res.json(data);
        } catch (e) {
            const status = (e as AxiosError)?.response?.status ?? 500;
            res.sendStatus(status);
        }
    }
}