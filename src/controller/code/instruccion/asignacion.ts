import { Instruccion } from "../abstract/instruccion";
import { Environment } from "../abstract/environment";
import { Expression } from "../abstract/expression";
import { Type } from "../abstract/Tipo_primitivo";


export class Asignacion extends Instruccion{

    private id: string;
    private valor: Expression;

    constructor(id: string, valor:Expression, line:number, column:number){
        super(line, column)
        this.id = id;
        this.valor = valor;

    }


    public execute(env: Environment) {
        const val = this.valor.execute(env);
        env.changeVariable(this.id, val.value, val.type);

    }

}