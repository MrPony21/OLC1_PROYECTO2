import { Expression } from "../abstract/expression";
import { Return, Type } from "../abstract/Tipo_primitivo";
import { Environment } from "../abstract/environment";

export class Operacion_unaria extends Expression{

    private id: string;
    private signo: string;

    constructor(id: string, signo: string, line: number, column: number){
        super(line, column);
        this.id = id;
        this.signo = signo;
    }

    public execute(env: Environment): Return {
        

        if (this.signo == "++"){
            const valor = env.getVariable(this.id);

            if (valor){

                if(valor.type == Type.INT){

                    const val = valor.valor + 1;

                    env.changeVariable(this.id, val, valor.type)

                    return { value: val, type: Type.INT};
                }

            }

        } else if (this.signo == "--"){
            const valor = env.getVariable(this.id);

            if(valor){
                
                if(valor.type == Type.INT){

                    const val = valor.valor -1;

                    env.changeVariable(this.id, val, valor.type)

                    return { value: val, type: Type.INT}

                }

            }

        }

        return{ value: null, type: Type.NULL};

    }




    public arbol(): { rama: string; nodo: string; } {

        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodoUri${id.toString()}`;
        const nodouna = `nodouna${id.toString()}`;
        let rama = `${nodo}[label="${this.id.toString()}"];\n`;

        if(this.signo == "++"){
            rama+= `${nodouna}[label="++"];\n`;

        } else if(this.signo == "--"){
            rama+= `${nodouna}[label="--"];\n`;
        }

        rama+= `${nodo} -> ${nodouna}\n`;

        return{rama: rama, nodo: nodo};
    }


}