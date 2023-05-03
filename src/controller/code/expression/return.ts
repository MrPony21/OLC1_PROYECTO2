import { Expression } from "../abstract/expression";
import { Return, Type } from "../abstract/Tipo_primitivo";
import { Environment } from "../abstract/environment";

export class ReturnExpression extends Expression{
    constructor(private value: Expression, private tipodereturn: Type, line:number, column: number){
        super(line,column);
    }

    public execute(env: Environment): Return {

        if(this.value != null && this.value != undefined){

            if(this.tipodereturn == Type.RETURN){
                const value = this.value.execute(env);

                return{ value: value.value, type: Type.RETURN}

            } else if (this.tipodereturn == Type.BREAK){

                return{ value: null, type: Type.BREAK};

            } else if (this.tipodereturn == Type.CONTINUE){

                return{ value: null, type: Type.CONTINUE};

            }
  
        }
        return {value: null, type: Type.RETURN}
    }



    public arbol(): { rama: string; nodo: string; } {
        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodoReturn${id.toString()}`;
        let rama = ''

        if(this.tipodereturn == Type.RETURN){

            rama+= `${nodo}[label="Return"];\n`
            
        } else if (this.tipodereturn == Type.BREAK){

            rama+= `${nodo}[label="Break"];\n`
            
        } else if (this.tipodereturn == Type.CONTINUE){

            rama+= `${nodo}[label="Continue"];\n`

        }


        return{rama: rama, nodo: nodo};
    }

}