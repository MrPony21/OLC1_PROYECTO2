import { Instruccion } from "../abstract/instruccion";
import { Environment } from "../abstract/environment";
import { Expression } from "../abstract/expression";
import { Type } from "../abstract/Tipo_primitivo";


export class Funcion extends Instruccion{

    private tipo: Type;
    private id: string;
    public parametros: Array<Expression>;
    public statement: Instruccion;

    constructor(tipo: Type, id:string, parametros: Array<Expression>, statement: Instruccion,line: number, column: number){
        super(line,column);
        this.tipo = tipo;
        this.id = id;
        this.parametros = parametros;
        this.statement = statement;


    }


    public execute(env: Environment) {
        //guarde la funcion
        env.saveFuncion(this.id, this);

    }



}