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




    public arbol(): { rama: string; nodo: string; } {
        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodolog${id.toString()}`;

        let rama = ``
        switch(this.relacional){

           case "==":
               rama+= `${nodo}[label="=="];\n`
               const codeop1: { rama: string; nodo: string; } = this.exp1.arbol();
               const codeop2: { rama: string; nodo: string; } = this.exp2.arbol();
               rama += codeop1.rama;
               rama += codeop2.rama;

               rama += `${nodo} -> ${codeop1.nodo};\n`;
               rama += `${nodo} -> ${codeop2.nodo};\n`;  

               break;
           case "!=":
               rama+= `${nodo}[label="!="];\n`;
               const codeop3: { rama: string; nodo: string; } = this.exp1.arbol();
               const codeop4: { rama: string; nodo: string; } = this.exp2.arbol();
               rama += codeop3.rama;
               rama += codeop4.rama;

               rama += `${nodo} -> ${codeop3.nodo};\n`;
               rama += `${nodo} -> ${codeop4.nodo};\n`;  
               break;
           case "<":
               rama+= `${nodo}[label="<"];\n`;
               const codeop5: { rama: string; nodo: string; } = this.exp1.arbol();
               const codeop6: { rama: string; nodo: string; } = this.exp2.arbol();
               rama += codeop5.rama;
               rama += codeop6.rama;

               rama += `${nodo} -> ${codeop5.nodo};\n`;
               rama += `${nodo} -> ${codeop6.nodo};\n`;  
               break;
            case "<=":
                rama+= `${nodo}[label="<="];\n`;
                const codeop7: { rama: string; nodo: string; } = this.exp1.arbol();
                const codeop8: { rama: string; nodo: string; } = this.exp2.arbol();
                rama += codeop7.rama;
                rama += codeop8.rama;

                rama += `${nodo} -> ${codeop7.nodo};\n`;
                rama += `${nodo} -> ${codeop8.nodo};\n`;  
                break;
            case ">":
                rama+= `${nodo}[label=">"];\n`;
                const codeop9: { rama: string; nodo: string; } = this.exp1.arbol();
                const codeop10: { rama: string; nodo: string; } = this.exp2.arbol();
                rama += codeop9.rama;
                rama += codeop10.rama;

                rama += `${nodo} -> ${codeop9.nodo};\n`;
                rama += `${nodo} -> ${codeop10.nodo};\n`;  
                break;
            case ">=":
                rama+= `${nodo}[label=">="];\n`;
                const codeop11: { rama: string; nodo: string; } = this.exp1.arbol();
                const codeop12: { rama: string; nodo: string; } = this.exp2.arbol();
                rama += codeop11.rama;
                rama += codeop12.rama;

                rama += `${nodo} -> ${codeop11.nodo};\n`;
                rama += `${nodo} -> ${codeop12.nodo};\n`;  
                break;
           default:
               
       }

       return{rama: rama, nodo:nodo};

    }



}