import { Expression } from "../abstract/expression";
import { Environment } from "../abstract/environment";
import { Return, Type } from "../abstract/Tipo_primitivo";



export class Ternario extends Expression{

    constructor(private condicion: Expression, private izq: Expression, private der: Expression, line:number, column:number){
        super(line,column)

    }

    public execute(env: Environment): Return {
        
        const condicion = this.condicion.execute(env);
        if(condicion.type == Type.BOOLEAN){

            if(condicion.value){

                const valorIzq = this.izq.execute(env); 

                return { value: valorIzq.value, type: valorIzq.type};

            }else{

                const valorDer = this.der.execute(env);

                return{ value: valorDer.value, type: valorDer.type};

            }


        }

        return{ value: null, type: Type.NULL};

    }


    public arbol(): { rama: string; nodo: string; } {


        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodoTer${id.toString()}`;

        let rama = '';

        const codecondicion: { rama: string, nodo:string} = this.condicion.arbol();
        rama += codecondicion.rama;
        const codeizq: { rama: string, nodo: string} = this.izq.arbol();
        rama += codeizq.rama;
        const codeder: { rama: string, nodo: string} = this.der.arbol();
        rama += codeder.rama;

        rama += `${nodo}[label=Ternario];\n`
        rama += `${nodo} -> ${codecondicion.nodo};\n`
        rama += `${nodo} -> ${codeizq.nodo};\n`
        rama += `${nodo} -> ${codeder.nodo};\n`

        return { rama: rama, nodo: nodo};
    }




}