import { Instruccion } from "../abstract/instruccion";
import { Environment } from "../abstract/environment";

export class Statement extends Instruccion{
    
    constructor(private body: Array<Instruccion>, line: number, column: number){
        super(line,column);
    }


    public execute(env: Environment) {
        const newEntorno = new Environment(env);

        for(const instrucciones of this.body){
           
            try{
                const ret = instrucciones.execute(newEntorno);

                if(ret != null && ret != undefined){
                    return ret;
                }

            }catch(e){
                console.log("Error al ejecutar instrucciones");
            }

        }
        return null;

    }

}