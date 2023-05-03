import { Expression } from "../abstract/expression";
import { Return, Type } from "../abstract/Tipo_primitivo";
import { Environment } from "../abstract/environment";

export class Access extends Expression{

    private id;
    private var: any;

    constructor(id: string, line: number, column: number){
        super(line, column);
        this.id = id;


    }


    public execute(env: Environment): Return {
        
        const vari = env.getVariable(this.id);
        this.var = vari?.valor;
        
        if(vari) {
            return { value: vari.valor , type: vari.type};
        }else { 
            return { value: null, type: Type.NULL}
        }


    }

    
    public arbol(): { rama: string; nodo: string; } {

        

        const id = Math.floor(Math.random() * (100-0)+0);
        const nodo = `nodoAcces${id.toString()}`;
        let  rama = `${nodo}[label="Acceder"];\n`
        //const codigorama: { rama: string; nodo: string; } = this.var.arbol();
        //rama += codigorama.rama;  
        rama += `${nodo}Variable[label="${this.id.toString()}"]\n;`
        //rama += `${nodo}Primitivo[label="${this.var.toString()}"]\n;` 


        rama += `${nodo} -> ${nodo}Variable;\n`;
        //rama += `${nodo}Variable -> ${nodo}Primitivo;\n`;

        return { rama: rama, nodo: nodo}

    }

}