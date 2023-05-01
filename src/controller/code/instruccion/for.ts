import { Instruccion } from "../abstract/instruccion";
import { Expression } from "../abstract/expression";
import { Environment } from "../abstract/environment";
import { Return, Type } from "../abstract/Tipo_primitivo";
import { ReturnExpression } from "../expression/return";

export class For extends Instruccion {

    constructor(private variable: Instruccion, private condicion: Expression, private unario: Instruccion, private code: Instruccion, line: number, column: number){
        super(line, column);
    }

    
    public execute(env: Environment) {
        
        this.variable.execute(env);
        let contador = 0;
        while(true){

            const condicion = this.condicion.execute(env);
            if(condicion != null && condicion != undefined){

                if(!condicion.value){
                    break;
                }
            }

            //ejecutar el codigo
            const element = this.code.execute(env);
            if(contador > 1000){
                console.log("Error: bucle infinito");
                break;
            }

            /*
            if(element.type == Type.RETURN){{}
                return element; 

            }else if(element.type == Type.BREAK){
                break;

            }else if(element.type == Type.CONTINUE){
                this.unario.execute(env);
                continue;

            }*/
            this.unario.execute(env);
            contador++;


        }

    }


}