import { Expression } from "../abstract/expression";
import { Environment } from "../abstract/environment";
import { Return } from "../abstract/Tipo_primitivo";

export class CallFuncion extends Expression {

    constructor(private id:string, private argumentos:Array<Expression>, line:number, column:number){
        super(line, column);
    }
    
    public execute(env: Environment): any {
        // ejecutar funcion
        const funcion = env.getFuncion(this.id);

        if (funcion!= null){
            //No entiendo esta constante
            //const envGl = new Environment(env.getGlobal());

            if(funcion.parametros.length == this.argumentos.length){

                for(let i = 0; i < funcion.parametros.length; i++){

                    const valor = this.argumentos[i].execute(env);
                    const param = funcion.parametros[i].execute(env);

                    if (valor.type == param.type){
                        env.save(param.value, valor.value, valor.type, this.line, this.column);
                    } else {
                        console.log("Error: el parametro: "+param.value+ " no es del tipo: "+valor.type );
                    }

                }
                //Aqui ejecutamos todo lo que esta dentro de la funcion y ademas se crea el nuevo entorno en la clase statement
                funcion.statement.execute(env);

            } else {
                console.log("Error: No existe la funcion: "+this.id+" linea: "+this.line+" column: "+this.column);
            }

        }


    }
}