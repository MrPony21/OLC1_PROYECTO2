import { Environment } from "../abstract/environment";
import { Expression } from "../abstract/expression";
import { Return, Type } from "../abstract/Tipo_primitivo";




export class Lenght extends Expression { 
     
    constructor(private exp: Expression, line: number, column: number){
        super(line,column)
    }


    public execute(env: Environment): Return {

        const valor = this.exp.execute(env);
        let string;
        let nuevo: number;

        if(valor != null || valor != undefined){

            if(valor.type == Type.STRING){

                nuevo = valor.value.toString().length;                
                return { value: nuevo, type: Type.INT};

            } 
        } 

        return{ value: null, type: Type.NULL};

    }

    public arbol(): { rama: string; nodo: string; } {
        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodoLength${id.toString()}`;
        let rama = '';

        rama += `${nodo}[label="Length"];\n`;
        
        const codigoast: {rama: string, nodo: string} = this.exp.arbol();
        rama += codigoast.rama;

        rama += `${nodo} -> ${codigoast.nodo}\n`
        

        return{rama: rama, nodo: nodo};
    }


}