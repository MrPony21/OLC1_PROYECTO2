import { Instruccion } from "../abstract/instruccion";
import { Environment } from "../abstract/environment";
import { Expression } from "../abstract/expression";
import { Type } from "../abstract/Tipo_primitivo";


export class AsignacionVector extends Instruccion{

    private id: string;
    private index: Expression;
    private valor: Expression;

    constructor(id: string, index:Expression, valor: Expression, line:number, column:number){
        super(line, column)
        this.id = id;
        this.index = index;
        this.valor = valor;

    }


    public execute(env: Environment) {

        const inde = this.index.execute(env).value;
        //const val = this.valor.execute(env);
        env.changeVector(this.id, inde, this.valor);

    }

    public arbol(): { rama: string; nodo: string; } {
        const id = Math.floor(Math.random() * (100-0)+0);
        //genero el nodoname
        const NodoPrincipal = `nodoAsignarVector${id.toString()}`;
        let rama = `${NodoPrincipal} [label="Asignar Vector"];\n`
        const codigorama: { rama: string; nodo: string; } = this.valor.arbol();
        rama += codigorama.rama;

        rama+= `${NodoPrincipal} -> ${codigorama.nodo};\n`

        return{rama: rama, nodo: NodoPrincipal};
    }

}