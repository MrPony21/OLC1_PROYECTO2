import { Instruccion } from "../abstract/instruccion";
import { Environment } from "../abstract/environment";

export class Statement {
       

    constructor(private body: Array<Instruccion>, private line: number, private column: number){
        
    }


    public execute(env: Environment, id: string) {
        const newEntorno = new Environment(env, id);

        for(const instrucciones of this.body){
           
            try{
                const ret = instrucciones.execute(newEntorno);

                // si la instruccion es tipo return deberia retornar el valor
                if(ret != null && ret != undefined){
                    return ret;
                }

            }catch(e){
                console.log("Error al ejecutar instrucciones");
            }

        }
        return null;

    }



    public arbol(): { rama: string; nodo: string; } {

        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `instrucciones${id.toString()}`;
        
        let rama = '';
        rama += `${nodo}[label="Instrucciones"];\n`
        for(const instrucciones of this.body){
            const instruc = instrucciones.arbol();
            rama += `${instruc.rama}\n`;
            rama += `${nodo} -> ${instruc.nodo}\n`;
        }
    

        return{rama: rama, nodo: nodo};
    }

}