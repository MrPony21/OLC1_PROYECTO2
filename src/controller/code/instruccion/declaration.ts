import { Instruccion } from "../abstract/instruccion";
import { Environment } from "../abstract/environment";
import { Expression } from "../abstract/expression";
import { Type } from "../abstract/Tipo_primitivo";
import { table } from "../salidas/out";


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

        const elementTable =  { identificador: this.id, tipo_declaracion: "Variable", tipo_dato: this.tipo , entorno: env.nombre ,linea:  this.line , columna: this.column+1};
        table.push(elementTable)
        
    }

    public getid(){
        return this.id;
    }

    public arbol(): { rama: string; nodo: string; } {
        //generar un id 
        const id = Math.floor(Math.random() * (100-0)+0);
        //genero el nodoname
        const NodoPrincipal = `nodoDeclarar${id.toString()}`;
        const Nodoid = `nodoId${id.toString()}`;

        //generar las ramas del ast
        if(this.valor != null){

            const codigoAST: {rama:string, nodo:string} = this.valor.arbol();
            let ramaDe = `${NodoPrincipal}[label="Declarar"];\n`
            //agregar el nodo id
            ramaDe += `${Nodoid}[label="${this.id.toString()}"];\n`
            //agregar la expresion
            ramaDe += codigoAST.rama+ "\n";
            //se conecta el id con el nodo principal
            ramaDe += `${NodoPrincipal} -> ${Nodoid};\n`
            //se conecta el id a la expression
            ramaDe += `${Nodoid} -> ${codigoAST.nodo};\n`

            return { rama: ramaDe, nodo: NodoPrincipal}


        }else {
            let ramaDe = `${NodoPrincipal}[label="Declarar"];\n`;
            //agregar el nodo id
            ramaDe += `${Nodoid}[label="${this.id.toString()}"];\n`;
            //se conecta el id con el nodo principal
            ramaDe += `${NodoPrincipal} -> ${Nodoid};\n`;

            return { rama: ramaDe, nodo: NodoPrincipal}

        }


    }


}