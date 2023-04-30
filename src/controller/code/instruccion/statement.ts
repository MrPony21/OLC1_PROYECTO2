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
                instrucciones.execute(newEntorno);
            }catch(e){
                console.log("Error al ejecutar instrucciones");
            }

        }
        return null;

    }

}