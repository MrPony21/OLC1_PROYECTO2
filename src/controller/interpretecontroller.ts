import { Request, Response } from "express";

class interpreteController {

    public pong(req: Request, res: Response){
        res.send("ESTE ES INTERPRETER CONTROLLER");
    }

    
}

export const InterController = new interpreteController();