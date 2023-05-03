import { Instruccion } from "../abstract/instruccion";
import { Expression } from "../abstract/expression";
import { Environment } from "../abstract/environment";
import { Return, Type } from "../abstract/Tipo_primitivo";
import { ReturnExpression } from "../expression/return";
import { Statement } from "./statement";


export class While extends Instruccion { 

    constructor(private condicion: Expression, private code: Statement, line: number, column: number){
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
            const element = this.code.execute(env, env.nombre+" While");
            if( contador > 150){
                console.log("Error: bucle infinito while");
                break;
            }

            if (element != null || element!= undefined){
                if(element.type == Type.RETURN){
                    return element; 

                }else if(element.type == Type.BREAK){
                    console.log("el break");
                    break;

                }else if(element.type == Type.CONTINUE){
                    continue;

                }
            }

            contador++;


        }


    }


    public arbol(): { rama: string; nodo: string; } {

        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodowhile${id.toString()}`;

        let rama = '';

        const codecondicion: {rama: string, nodo: string} = this.condicion.arbol();
        rama += codecondicion.rama;
        const code: {rama: string, nodo: string} = this.code.arbol();
        rama += code.rama;

        rama += `${nodo}[label="WHILE"];\n`;
        rama += `${nodo} -> ${codecondicion.nodo};\n`;
        rama += `${nodo} -> ${code.nodo};\n`;


        return{rama: rama, nodo: nodo};
    }




}