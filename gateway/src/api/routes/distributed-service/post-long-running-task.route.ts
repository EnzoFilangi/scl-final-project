import {AxiosError, AxiosInstance} from "axios";
import {Request, Response} from "express";

export function postLongRunningTaskRouteFactory(axios: AxiosInstance){
    return async (req: Request, res: Response) => {
        const body = req.body;

        try {
            const {data} = await axios.post(`${process.env.DISTRIBUTED_SERVICE_URL}/long-running-task`, body)
            res.json(data);
        } catch (e) {
            const status = (e as AxiosError)?.response?.status ?? 500;
            res.sendStatus(status);
        }
    }
}