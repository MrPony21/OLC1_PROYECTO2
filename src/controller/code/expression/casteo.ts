import { Environment } from "../abstract/environment";
import { Expression } from "../abstract/expression";
import { Return, Type } from "../abstract/Tipo_primitivo";

//SIN FUNCIONAR PORQUE LA GRAMATICA QUEDA AMGIUGA


export class Casteo extends Expression { 
     
    constructor(private tipo: Type, private exp: Expression, line: number, column: number){
        super(line,column)
    }


    public execute(env: Environment): Return {

        let expression = this.exp.execute(env);

        if(this.tipo == Type.INT){
            
            const integer = parseInt(expression.value);
            return { value: integer , type: Type.INT};

        } else if(this.tipo == Type.DOUBLE){

            const double = parseFloat(expression.value);
            return { value: double, type: Type.DOUBLE};

        } else if(this.tipo == Type.STRING){

            const string = expression.value.toString();
            return { value: string, type: Type.STRING};

        } else if(this.tipo == Type.CHAR){

            const char = expression.value.toString();
            return { value: String, type: Type.CHAR};

        } else{
            console.log("No se puede realizar este casteo");
            
        }



        return{ value: null, type: Type.NULL};

    }


    public arbol(): { rama: string; nodo: string; } {


        return { rama: "" , nodo: ""};
    }
}