import { Expression } from "../abstract/expression";
import { Return, Type } from "../abstract/Tipo_primitivo";
import { Environment } from "../abstract/environment";
import { Vector } from "../instruccion/vector";
import { Primitivo } from "./Primitivo";

export class AccessVector extends Expression{

    private id;
    private index;

    constructor(id: string, index: Expression,line:number, column: number){
        super(line,column);
        this.id = id;
        this.index = index;
    }

    public execute(env: Environment): Return {

        const vector = env.getVector(this.id);
        let exp: Expression;
        let valor;
        let indice = this.index.execute(env).value;

        if(vector){
            exp = vector.valores[indice];
            valor = exp.execute(env).value;
            return{ value:  valor, type: vector.tipo};
        }else{
            return { value: null, type: Type.NULL}
        }


        

    }

    public arbol(): { rama: string; nodo: string; } {

        

        const id = Math.floor(Math.random() * (100-0)+0);
        const nodo = `nodoAcces${id.toString()}`;
        let  rama = `${nodo}[label="Acceder Vector"];\n`
        //const codigorama: { rama: string; nodo: string; } = this.var.arbol();
        //rama += codigorama.rama;  
        rama += `${nodo}Variable[label="${this.id.toString()}"]\n;`
        //rama += `${nodo}Primitivo[label="${this.var.toString()}"]\n;` 


        rama += `${nodo} -> ${nodo}Variable;\n`;
        //rama += `${nodo}Variable -> ${nodo}Primitivo;\n`;

        return { rama: rama, nodo: nodo}

    }


}