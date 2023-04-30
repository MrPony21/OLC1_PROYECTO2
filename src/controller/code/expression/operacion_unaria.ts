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


}