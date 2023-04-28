import { Simbolo } from "./simbolo";
import { Type } from "./Tipo_primitivo";
import { outs } from "../salidas/out";


export class Environment{

    private variables = new Map<string, Simbolo>();
    private anterior;

    constructor(anterior: Environment | null){
      this.anterior = anterior
      this.variables = new Map<string, Simbolo>();

    }


     // guardar una nueva variable
     public save(id: string, valor: any , tipo: Type,linea:number,columna:number)  {
        // verificar el ambito
        let env: Environment | null = this;
    
        // verificar si la variable ya existe
        if (!env.variables.has(id.toLowerCase())) {
          // guardar la variable
          // guardar la variable en una tabla de simbolos para el reporte
          env.variables.set(id.toLowerCase(), new Simbolo(valor, id, tipo));
        }else {
          outs.push("Error: la variable "+id+ "ya existe en el entorno, en linea: "+linea+" y columna: "+columna);
        }
    
      }


      public getVariable(id: string): Simbolo | null{

        let env: Environment | null = this;

        //Buscaos la variable
        while (env != null){

          if (env.variables.has(id.toLowerCase())){
              return env.variables.get(id.toLocaleLowerCase())!;
          } 

          env = env.anterior;

        }

        return null;
      }
  



}