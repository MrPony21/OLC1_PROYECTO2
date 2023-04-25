import { Instruccion } from "../abstract/instruccion";
import { Environment } from "../abstract/environment";
import { Expression } from "../abstract/expression";
import { Type } from "../abstract/Tipo_primitivo";
export declare class Declaration extends Instruccion {
    private id;
    private tipo;
    private valor;
    constructor(id: string, tipo: Type, valor: Expression | null, line: number, column: number);
    execute(env: Environment): any;
}
