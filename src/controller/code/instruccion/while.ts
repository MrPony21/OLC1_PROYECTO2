import { Instruccion } from "../abstract/instruccion";
import { Expression } from "../abstract/expression";
import { Environment } from "../abstract/environment";
import { Return, Type } from "../abstract/Tipo_primitivo";
import { ReturnExpression } from "../expression/return";


export class While extends Instruccion { 

    constructor(private condicion: Expression, private code: Instruccion, line: number, column: number){
        super(line, column);
    }



    public execute(env: Environment){
        
        let contador = 0;
        while(true){

            const condicion = this.condicion.execute(env);
            if(condicion != null && condicion != undefined){

                if(!condicion.value){
                    break;
                }
            }

            // ejecutar codigo
            const element = this.code.execute(env);
            if( contador > 1000){
                console.log("Error: bucle infinito while");
                break;
            }

            contador++;


        }


    }




}