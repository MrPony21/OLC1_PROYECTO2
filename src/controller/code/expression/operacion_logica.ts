import { Expression } from "../abstract/expression";
import { Return, Type } from "../abstract/Tipo_primitivo";
import { Environment } from "../abstract/environment";

export class Operacion_logica extends Expression{

    exp1: Expression;
    exp2: Expression;
    logico: String;


    constructor(exp1: Expression, logico: string, exp2:Expression, line:number, column:number){
        super(line,column);
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.logico = logico;
    }



    public execute(env: Environment): Return {
        
        const op1 = this.exp1.execute(env);
        const op2 = this.exp2.execute(env);


        switch(this.logico){

            case "OR":
                return{ value:  op1.value || op2.value,  type: Type.BOOLEAN};
            case "AND":
                return{ value: op1.value && op2.value, type: Type.BOOLEAN};
            case "NOT":
                return { value: !op1.value, type: Type.BOOLEAN};
            default:
                return { value: null, type: Type.NULL}
        }


    }
}