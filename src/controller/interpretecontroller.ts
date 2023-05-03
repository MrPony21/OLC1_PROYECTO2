import { Request, Response } from "express";
import { Environment } from "./code/abstract/environment";
import { outs, table } from "./code/salidas/out";
import { Err } from "./code/salidas/out";
import { Declaration } from "./code/instruccion/declaration";
import { Funcion } from "./code/instruccion/funcion";

class interpreteController {

    public pong(req: Request, res: Response){
        res.send("ESTE ES INTERPRETER CONTROLLER");
    }

    public interpretar(req: Request, res: Response) {
        //parser
        var parser = require("./code/grammar/gramatica");
        Err.splice(0, Err.length);
        const code = req.body.code;
        console.log(code);

        try{
            const ast = parser.parse(code);

            outs.splice(0, outs.length);
            table.splice(0, table.length)
           
            const Entorno_global = new Environment(null,"Global");
            
            //primera pasada para funciones y variables
            for(const inst of ast){
                if(inst instanceof(Declaration)){
                    inst.execute(Entorno_global);
                } else if(inst instanceof(Funcion)){
                    inst.execute(Entorno_global);
                }
            }

            //segunda pasada para el main
            for(const inst of ast){
                if(!(inst instanceof (Declaration) || inst instanceof(Funcion))){
                    inst.execute(Entorno_global);
                }    

            }

            const erroress = JSON.stringify(Err);
            console.log(erroress);
            const tablaa = JSON.stringify(table);

            //arbol ast
            //let arbolast = ''
            let arbolast = `
            digraph G {
                nodoPrincipal[label="AST"];\n
            `;

            for(const inst of ast){
                const ar = inst.arbol();
                arbolast += `${ar.rama}\n`;
                arbolast += `nodoPrincipal -> ${ar.nodo}\n`;
            }
            arbolast += "\n}";

            res.json({consola: outs.join("\n"), errores: erroress, ast: arbolast, tabla: tablaa});

        } catch (err) {
            console.log(err);
            const erroress = JSON.stringify(Err);
            console.log(erroress);
            res.json({
                consola: "Error: ve al apartado de errores para mas imformacion",
                errores: erroress,
            })

         
        }
        Err.splice(0, Err.length);
    }

}

export const InterController = new interpreteController();