import { Instruccion } from "../abstract/instruccion";
import { Expression } from "../abstract/expression";
import { Environment } from "../abstract/environment";
import { Return, Type } from "../abstract/Tipo_primitivo";
import { ReturnExpression } from "../expression/return";
import { Declaration } from "./declaration";
import { Statement } from "./statement";

export class For extends Instruccion {

    constructor(private variable: Declaration, private condicion: Expression, private unario: Instruccion, private code: Statement, line: number, column: number){
        super(line, column);
    }

    
    public execute(env: Environment) {

    
        this.variable.execute(env);
        let name = this.variable.getid();
        let contador = 0;
        while(true){

            const condicion = this.condicion.execute(env);
            if(condicion != null && condicion != undefined){

                if(!condicion.value){
                    break;
                }
            }

            //ejecutar el codigo
            const element = this.code.execute(env, env.nombre+" for");
            if(contador > 1000){
                console.log("Error: bucle infinito");
                break;
            }

            console.log(element);

            if (element != null || element!= undefined){
                if(element.type == Type.RETURN){
                    return element; 

                }else if(element.type == Type.BREAK){
                    console.log("el break");
                    break;

                }else if(element.type == Type.CONTINUE){
                    this.unario.execute(env);
                    continue;

                }
            }
            this.unario.execute(env);
            contador++;


        }

        env.deleteVariable(name);

    }



    public arbol(): { rama: string; nodo: string; } {

        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodofor${id.toString()}`;

        let rama = '';

        const declaracion: {rama:string, nodo: string} = this.variable.arbol();
        rama += declaracion.rama;
        const condicion: {rama: string, nodo: string} = this.condicion.arbol();
        rama += condicion.rama;
        const unario: {rama: string, nodo: string} = this.unario.arbol();
        rama += unario.rama;
        const code: { rama: string, nodo: string} = this.code.arbol();
        rama += code.rama;

        rama+= `${nodo}[label="FOR"];\n`;
        rama+= `${nodo} -> ${declaracion.nodo};\n`;
        rama+= `${nodo} -> ${condicion.nodo};\n`;
        rama+= `${nodo} -> ${unario.nodo};\n`;
        rama+= `${nodo} -> ${code.nodo};\n`;

        return{rama: rama, nodo: nodo};
    }
}