import {Request, Response} from 'express';

export function helloWorld(req: Request, res: Response){
    const userName = req.query['userName'];
    res.json({
        message: `Hello, ${userName ?? 'World'}!`
    })
}