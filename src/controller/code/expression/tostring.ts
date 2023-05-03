import { Environment } from "../abstract/environment";
import { Expression } from "../abstract/expression";
import { Return, Type } from "../abstract/Tipo_primitivo";




export class ToString extends Expression { 
     
    constructor(private exp: Expression, line: number, column: number){
        super(line,column)
    }


    public execute(env: Environment): Return {

        const valor = this.exp.execute(env);
        let string;

        if(valor != null || valor != undefined){

            if(valor.type == Type.INT || valor.type == Type.BOOLEAN || valor.type == Type.DOUBLE || valor.type == Type.CHAR){
                string = valor.value.toString();
                return{ value: string, type: Type.STRING};

            }

        } 

        return{ value: null, type: Type.NULL};

    }

    public arbol(): { rama: string; nodo: string; } {
        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodoLower${id.toString()}`;
        let rama = '';

        rama += `${nodo}[label="ToString"];\n`;
        
        const codigoast: {rama: string, nodo: string} = this.exp.arbol();
        rama += codigoast.rama;

        rama += `${nodo} -> ${codigoast.nodo}\n`
        

        return{rama: rama, nodo: nodo};
    }


}