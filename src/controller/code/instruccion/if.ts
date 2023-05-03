import { Instruccion } from "../abstract/instruccion";
import { Expression } from "../abstract/expression";
import { Environment } from "../abstract/environment";
import { Type } from "../abstract/Tipo_primitivo";
import { Statement } from "./statement";

export class If extends Instruccion{

    constructor(private condicion: Expression, private codeIf: Statement, private codeElse: Statement | null, line: number, column: number){
        super(line, column);
    }

    public execute(env: Environment) {
        
        const condicion = this.condicion.execute(env);
        if(condicion.type == Type.BOOLEAN){
            //si es verdadero
            if(condicion.value){
                const element = this.codeIf.execute(env, env.nombre+" If");
                if (element != null || element!= undefined){
                    if(element.type == Type.RETURN){
                        console.log(element.value);
                        return element; 
                        
                    } else if(element.type == Type.BREAK){
                        return element;

                    } else if (element.type == Type.CONTINUE){
                        return element;

                    }
                }

            }else{
                if(this.codeElse != null){
                    const element2 = this.codeElse.execute(env, env.nombre+" Else");
                    if (element2 != null || element2!= undefined){
                        if(element2.type == Type.RETURN){
                           // console.log(element2.value,"hajsdflka");
                            return element2; 

                        } else if(element2.type == Type.BREAK){
                            return element2;

                        } else if (element2.type == Type.CONTINUE){
                            return element2;

                        }
                    }
    
                }

            }

        }

    }


    public arbol(): { rama: string; nodo: string; } {

        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodoif${id.toString()}`;

        let rama = '';

        const codecondicion: {rama: string, nodo:string} = this.condicion.arbol();
        rama+= codecondicion.rama;
        const codeif: {rama: string, nodo: string} = this.codeIf.arbol();
        console.log(codeif);
        rama+= codeif.rama;
        if (this.codeElse != null){
            const codeelse: {rama: string, nodo: string} = this.codeElse.arbol();
            rama += codeelse.rama;
            rama += `${nodo} -> ${codeelse.nodo};\n`
        }

        rama += `${nodo}[label="IF"];\n`;
        rama += `${nodo} -> ${codecondicion.nodo};\n`;
        rama += `${nodo} -> ${codeif.nodo};\n`;




        return{rama: rama, nodo: nodo};
    }


    public tablaSimbolos() {
        
        

    }

}