import { Simbolo } from "./simbolo";
import { Type } from "./Tipo_primitivo";


export class Environment{

    private variables = new Map<string, Simbolo>();

    constructor(private anterior: Environment | null){
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
          //printlist.push("Error, La variable "+id+" ya existe en el entorno, linea "+linea+" y columna "+columna);
        }
    
      }
  



}