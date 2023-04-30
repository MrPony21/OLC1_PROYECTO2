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

}