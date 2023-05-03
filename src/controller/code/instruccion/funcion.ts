import { Instruccion } from "../abstract/instruccion";
import { Environment } from "../abstract/environment";
import { Expression } from "../abstract/expression";
import { Type } from "../abstract/Tipo_primitivo";
import { Statement } from "./statement";
import { table } from "../salidas/out";


export class Funcion extends Instruccion{

    public tipo: Type;
    private id: string;
    public parametros: Array<Expression>;
    public statement: Statement;

    constructor(tipo: Type, id:string, parametros: Array<Expression>, statement: Statement,line: number, column: number){
        super(line,column);
        this.tipo = tipo;
        this.id = id;
        this.parametros = parametros;
        this.statement = statement;


    }


    public execute(env: Environment) {
        //guarde la funcion
        env.saveFuncion(this.id, this);

        let elementTable = {};
        if(this.tipo == Type.NULL){
            elementTable =  { identificador: this.id, tipo_declaracion: "Metodo", tipo_dato: this.tipo ,entorno: env.nombre ,linea:  this.line , columna: this.column+1};
            table.push(elementTable);
        }else{
            let elementTable =  { identificador: this.id, tipo_declaracion: "Funcion", tipo_dato: this.tipo ,entorno: env.nombre ,linea:  this.line , columna: this.column+1};
            table.push(elementTable);
        }

    }


    public arbol(): { rama: string; nodo: string; } {
        //generamos un id
        const id = Math.floor(Math.random() * (100-0)+0);
        //genero a nodoname
        const NodoPrincipal = `nodoFuncion${id.toString()}`;
        const nodoid = `nodoId${id.toString()}`;
        const nodopar = `nodoPar${id.toString()}`
        
        let rama = `${NodoPrincipal}[label="Funcion"];\n`

        rama+= `${nodoid}[label="${this.id}"];\n`


        rama += `${nodopar}[label="Parametros"];\n`
        for(let i = 0; i < this.parametros.length; i++){
            const para: { rama: string; nodo: string;} = this.parametros[i].arbol();
            rama += para.rama;
            rama += `${nodopar} -> ${para.nodo}\n`
        }

        const code: {rama: string, nodo: string} = this.statement.arbol();
        rama += code.rama;

        
        rama += `${NodoPrincipal} -> ${nodoid};\n`
        rama += `${NodoPrincipal} -> ${nodopar};\n`
        rama += `${NodoPrincipal} -> ${code.nodo};\n`


        return{rama: rama, nodo: NodoPrincipal};
    }


}