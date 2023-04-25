import { Request, Response } from "express";
import { Environment } from "./code/abstract/environment";

class interpreteController {

    public pong(req: Request, res: Response){
        res.send("ESTE ES INTERPRETER CONTROLLER");
    }

    public interpretar(req: Request, res: Response) {
        //parser
        var parser = require("./code/grammar/gramatica");

        const code = req.body.code;
        console.log(code);

        try{
            const ast = parser.parse(code);
            const Entorno_global = new Environment(null);
            
            for(const inst of ast){
                inst.execute(Entorno_global);
            }

            res.json({consola:"ejecutado con exito", errores: null})

        } catch (err) {
            console.log(err);
            res.json({
                consola: err,
                errores: err,
            })
         
        }

    }

}

export const InterController = new interpreteController();