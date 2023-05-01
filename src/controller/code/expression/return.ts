import { Expression } from "../abstract/expression";
import { Return, Type } from "../abstract/Tipo_primitivo";
import { Environment } from "../abstract/environment";

export class ReturnExpression extends Expression{
    constructor(private value: Expression, line:number, column: number){
        super(line,column);
    }

    public execute(env: Environment): Return {

        if(this.value != null && this.value != undefined){
            const value = this.value.execute(env);

            return{ value: value.value, type: Type.RETURN}
        }
        return {value: null, type: Type.RETURN}
    }

}