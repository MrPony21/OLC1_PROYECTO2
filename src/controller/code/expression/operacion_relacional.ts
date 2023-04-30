import { Expression } from "../abstract/expression";
import { Return, Type } from "../abstract/Tipo_primitivo";
import { Environment } from "../abstract/environment";

export class Operacion_relacional extends Expression{

    exp1: Expression;
    exp2: Expression;
    relacional: String;


    constructor(exp1: Expression, relacional: string, exp2:Expression, line:number, column:number){
        super(line,column);
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.relacional = relacional;
    }


    public execute(env: Environment): Return {
        
        const expr1 = this.exp1.execute(env);
        const expr2 = this.exp2.execute(env);
        let op1 = expr1.value;
        let op2 = expr2.value;

        if(expr1.type == Type.CHAR){
            console.log(op1);
            op1 = expr1.value.charCodeAt(0);
            console.log(op1);
        } 
        if(expr2.type == Type.CHAR){
            console.log(op2);
            op2 = expr2.value.charCodeAt(0);
            console.log(op2);
        }

        switch(this.relacional){

            case "==":
                return { value: op1 == op2, type: Type.BOOLEAN};
            case "!=":
                return { value: op1 != op2, type: Type.BOOLEAN};
            case "<":
                return { value: op1 < op2, type: Type.BOOLEAN};
            case "<=":
                return { value: op1 <= op2, type: Type.BOOLEAN};
            case ">":
                return { value: op1 > op2, type: Type.BOOLEAN};
            case ">=":
                return { value: op1 >= op2, type: Type.BOOLEAN};
            default:
                return { value: null, type: Type.NULL};

        }

    }


}