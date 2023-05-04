import { Instruccion } from "../abstract/instruccion";
import { Environment } from "../abstract/environment";
import { Expression } from "../abstract/expression";
import { Type } from "../abstract/Tipo_primitivo";
import { table } from "../salidas/out";

export class Vector extends Instruccion{

    constructor(private id:string, public tipo: Type, public valores:Array<Expression>, line:number, column:number){
        super(line, column);
    }


    public execute(env: Environment) {
        

         env.saveVector(this.id, this);

         let tipoTable;
         if(this.tipo == Type.INT){
             tipoTable = "Int";
         }else if (this.tipo == Type.DOUBLE){
             tipoTable = "Double";
         }else if(this.tipo == Type.BOOLEAN){
             tipoTable = "Boolean";
         }else if (this.tipo == Type.CHAR){
             tipoTable = "Char";
         }else if (this.tipo == Type.STRING){
             tipoTable = "String"
         } else{
             tipoTable = "Null"
         }
         
         const elementTable =  { identificador: this.id, tipo_declaracion: "Vector", tipo_dato: tipoTable , entorno: env.nombre ,linea:  this.line , columna: this.column+1};
         if (!table.some((obj: any) => JSON.stringify(obj) === JSON.stringify(elementTable))) {
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
        
        let rama = `${NodoPrincipal}[label="Vector"];\n`

        rama+= `${nodoid}[label="${this.id}"];\n`


        rama += `${nodopar}[label="Valores"];\n`
        for(let i = 0; i < this.valores.length; i++){
            const para: { rama: string; nodo: string;} = this.valores[i].arbol();
            rama += para.rama;
            rama += `${nodopar} -> ${para.nodo}\n`
        }


        
        rama += `${NodoPrincipal} -> ${nodoid};\n`
        rama += `${NodoPrincipal} -> ${nodopar};\n`


        return{rama: rama, nodo: NodoPrincipal};
    }


}