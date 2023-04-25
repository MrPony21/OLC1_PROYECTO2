import { Instruccion } from "../abstract/instruccion";
import { Environment } from "../abstract/environment";
import { Expression } from "../abstract/expression";
import { Type } from "../abstract/Tipo_primitivo";


export class Declaration extends Instruccion{

    private id: string;
    private tipo: Type;
    private valor: Expression | null;

    constructor(id: string, tipo:Type, valor:Expression | null, line:number, column: number){
        super(line, column);
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }


    public execute(env: Environment): any {
        if (this.valor != null) {
            const val = this.valor.execute(env);
            env.save(this.id, val.value, this.tipo, this.line, this.column);
        } else{
            env.save(this.id, null, this.tipo, this.line, this.column);
        }
        
    }


}