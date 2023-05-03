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




    public arbol(): { rama: string; nodo: string; } {
         //id unico
         const id = Math.floor(Math.random() * (100-0)+0);
         //generar el nombre del nodo
         const nodo = `nodolog${id.toString()}`;

         let rama = ``
         switch(this.logico){

            case "OR":
                rama+= `${nodo}[label="||"];\n`
                const codeop1: { rama: string; nodo: string; } = this.exp1.arbol();
                const codeop2: { rama: string; nodo: string; } = this.exp2.arbol();
                rama += codeop1.rama;
                rama += codeop2.rama;

                rama += `${nodo} -> ${codeop1.nodo};\n`;
                rama += `${nodo} -> ${codeop2.nodo};\n`;  

                break;
            case "AND":
                rama+= `${nodo}[label="&&"];\n`;
                const codeop3: { rama: string; nodo: string; } = this.exp1.arbol();
                const codeop4: { rama: string; nodo: string; } = this.exp2.arbol();
                rama += codeop3.rama;
                rama += codeop4.rama;

                rama += `${nodo} -> ${codeop3.nodo};\n`;
                rama += `${nodo} -> ${codeop4.nodo};\n`;  
                break;
            case "NOT":
                rama+= `${nodo}[label="!"];\n`;
                const codeop5: { rama: string; nodo: string; } = this.exp1.arbol();
                const codeop6: { rama: string; nodo: string; } = this.exp2.arbol();
                rama += codeop5.rama;
                rama += codeop6.rama;

                rama += `${nodo} -> ${codeop5.nodo};\n`;
                rama += `${nodo} -> ${codeop6.nodo};\n`;  
                break;
            default:
                
        }

        return{rama: rama, nodo:nodo};
    }
}