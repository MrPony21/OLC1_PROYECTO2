import { Expression } from "../abstract/expression";
import { Return, Type } from "../abstract/Tipo_primitivo";
import { Environment } from "../abstract/environment";

export class Parametro extends Expression{

    constructor(
        private tipo: Type,
        private id: string,
        line:number,
        column:number
    ){
        super(line,column)
    }


    public execute(env: Environment): Return {
        return { value: this.id, type: this.tipo};
    }



    public arbol(): { rama: string; nodo: string; } {

        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodoParametros${id.toString()}`;
        let rama = `${nodo}[label=${this.id}];\n`;


        return{rama: rama, nodo: nodo};
    }

}