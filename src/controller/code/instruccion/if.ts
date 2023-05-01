import { Instruccion } from "../abstract/instruccion";
import { Expression } from "../abstract/expression";
import { Environment } from "../abstract/environment";
import { Type } from "../abstract/Tipo_primitivo";

export class If extends Instruccion{

    constructor(private condicion: Expression, private codeIf: Instruccion, private codeElse: Instruccion | null, line: number, column: number){
        super(line, column);
    }

    public execute(env: Environment) {
        
        const condicion = this.condicion.execute(env);
        if(condicion.type == Type.BOOLEAN){
            //si es verdadero
            if(condicion.value){
                this.codeIf.execute(env);
            }else{
                if(this.codeElse != null){
                    this.codeElse.execute(env);
                }

            }

        }

    }

}