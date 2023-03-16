import {AxiosError, AxiosInstance} from "axios";
import {Request, Response} from "express";

export function getHelloRouteFactory(axios: AxiosInstance){
    return async (req: Request, res: Response) => {
        const userName = req.query['userName'];
        let queryString = '';
        if (typeof userName === 'string'){
            queryString = `?userName=${userName}`;
        }

        try {
            const {data} = await axios.get(`${process.env.HELLO_SERVICE_URL}/hello${queryString}`)
            res.json(data);
        } catch (e) {
            const status = (e as AxiosError)?.response?.status ?? 500;
            res.sendStatus(status);
        }
    }
}