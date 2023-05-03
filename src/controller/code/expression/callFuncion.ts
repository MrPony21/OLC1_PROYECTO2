import { Expression } from "../abstract/expression";
import { Environment } from "../abstract/environment";
import { Return } from "../abstract/Tipo_primitivo";
import { Type } from "../abstract/Tipo_primitivo";

export class CallFuncion extends Expression {

    constructor(private id:string, private argumentos:Array<Expression>, line:number, column:number){
        super(line, column);
    }
    
    public execute(env: Environment): any {
        // ejecutar funcion
        const funcion = env.getFuncion(this.id);

        if (funcion!= null){
            //No entiendo esta constante
            const envGl = new Environment(env.getGlobal(), "Global");

            if(funcion.parametros.length == this.argumentos.length){

                for(let i = 0; i < funcion.parametros.length; i++){

                    const valor = this.argumentos[i].execute(env);
                    const param = funcion.parametros[i].execute(env);

                    if (valor.type == param.type){
                        envGl.save(param.value, valor.value, valor.type, this.line, this.column);
                    } else {
                        console.log("Error: el parametro: "+param.value+ " no es del tipo: "+valor.type );
                    }

                }
                //Aqui ejecutamos todo lo que esta dentro de la funcion y ademas se crea el nuevo entorno en la clase statement
                const element = funcion.statement.execute(envGl, this.id);
                const tipo_funcion = funcion.tipo;

                if (element != null || element!= undefined){
                    if(element.type == Type.RETURN){
                        if (tipo_funcion == Type.INT){
                            element.type = Type.INT;
                        } else if (tipo_funcion == Type.DOUBLE){
                            element.type = Type.DOUBLE
                        } else if (tipo_funcion == Type.BOOLEAN){
                            element.type = Type.BOOLEAN
                        } else if (tipo_funcion == Type.CHAR){
                            element.type = Type.CHAR
                        } else if (tipo_funcion == Type.STRING){
                            element.type = Type.STRING
                        } else if (tipo_funcion == Type.NULL) {
                            return null;
                        }
                        //console.log("aqui"+element.value);
                        return element; 
                    }
                }
            

            } else {
                console.log("Error: No existe la funcion: "+this.id+" linea: "+this.line+" column: "+this.column);
            }

        }



    }


    public arbol(): { rama: string; nodo: string; } {

        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodocall${id.toString()}`;
        const nodoid = `nodoid${id.toString()}`;
        const nodoarg = `nodoarg${id.toString()}`;

        let rama = `${nodo}[label="Llamada funcion"]`;
        rama += `${nodoid}[label="${this.id}"]`

        rama += `${nodoarg}[label="Argumentos"]`;
        for(let i = 0; i < this.argumentos.length; i++){
            const argum: { rama: string; nodo: string;} = this.argumentos[i].arbol();
            rama += argum.rama;
            rama += `${nodoarg} -> ${argum.nodo}\n`          
        }

        rama+= `${nodo} -> ${nodoid}\n`;
        rama+= `${nodo} -> ${nodoarg}\n`;

        return{rama: rama, nodo: nodo};
    }
    
}