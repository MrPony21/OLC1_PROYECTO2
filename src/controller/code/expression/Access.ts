import { Expression } from "../abstract/expression";
import { Return, Type } from "../abstract/Tipo_primitivo";
import { Environment } from "../abstract/environment";

export class Access extends Expression{

    private id;

    constructor(id: string, line: number, column: number){
        super(line, column);
        this.id = id;


    }


    public execute(env: Environment): Return {
        
        const vari = env.getVariable(this.id);
        
        if(vari) {
            return { value: vari.valor , type: vari.type};
        }else { 
            return { value: null, type: Type.NULL}
        }


    }

    

}