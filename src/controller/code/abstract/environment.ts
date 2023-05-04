import { Simbolo } from "./simbolo";
import { Type } from "./Tipo_primitivo";
import { outs } from "../salidas/out";
import { Funcion } from "../instruccion/funcion";
import { Vector } from "../instruccion/vector";
import { Expression } from "./expression";

export class Environment{

    private variables = new Map<string, Simbolo>();
    private funciones = new Map<string, Funcion>();
    private vectores = new Map<string, Vector>();
    private anterior;
    public nombre: string;;

    constructor(anterior: Environment | null , nombre: string){
      this.anterior = anterior
      this.variables = new Map<string, Simbolo>();
      this.nombre = nombre;

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

          /*
          const elementTable =  { identificador: id, tipo_declaracion: "Variable", tipo_dato: tipo , entorno: env.nombre ,linea:  linea , columna: columna+1};
          table.push(elementTable);
          */

        }else {
          //outs.push("Error: la variable "+id+ "ya existe en el entorno, en linea: "+linea+" y columna: "+columna);
        }
    
      }


      public getVariable(id: string): Simbolo | null{

        let env: Environment | null = this;

        //Buscaos la variable
        while (env != null){

          if (env.variables.has(id.toLowerCase())){
              return env.variables.get(id.toLowerCase())!;
          } 

          env = env.anterior;

        }

        return null;
      }


      public changeVariable(id: string, valor: any, tipo: Type){

        let env: Environment | null = this;

        //buscamos la variable
        while (env != null){

          if(env.variables.has(id.toLowerCase())){
            let variableExistente = env.variables.get(id.toLowerCase())?.type;
           // if(variableExistente == tipo){
              env.variables.set(id.toLocaleLowerCase(), new Simbolo(valor, id, tipo));
              return
            //}else{
              //console.log("No se puede cambiar el tipo de variable")
            //}
            
          }

          env = env.anterior;


        }

        console.log("No se ha encontrado la variable "+id+" para asignar")




        /*primera forma de hacerlo
        //buscamos la variable
        while (env != null){

          if(env.variables.has(id.toLowerCase())){
            env.variables.set(id.toLocaleLowerCase(), new Simbolo(valor, id, tipo));
            return;
          }

          env = env.anterior;


        }

        console.log("No se ha encontrado la variable "+id+" para asignar")

        */
      }

      //aqui eliminaremos la variable declarada en un for
      public deleteVariable(id: string){

        let env: Environment | null = this;

        //Buscaos la variable
        if(env.variables.has(id.toLowerCase())){

          env.variables.delete(id);

        }

        return null;
    }


      //-----------------------------------------------FUNCIONES-----------------------------------------
      public saveFuncion(id: string, funcion: Funcion){

        let env: Environment | null = this;

        if(!env.funciones.has(id.toLowerCase())){

          env.funciones.set(id.toLowerCase(), funcion);
        } else{
          outs.push("Error: la funcion "+id+ "ya existe en el entorno");
        }



      }


      public getFuncion(id: string): Funcion | null{

        let env: Environment | null = this;

        //Buscaos la variable
        while (env != null){

          if (env.funciones.has(id.toLowerCase())){
              return env.funciones.get(id.toLowerCase())!;
          } 

          env = env.anterior;

        }

        return null;

      }



      public getGlobal(): Environment{
        let env: Environment | null = this;

        while(env.anterior != null){
          env = env.anterior;
        }

        return env;

      }


      public saveVector(id: string, vector: Vector){

        let env: Environment | null = this;

        if(!env.vectores.has(id.toLowerCase())){
          //se guardo correctamente
          console.log("se guardo el vector")
          env.vectores.set(id.toLowerCase(), vector);
        } else{
          outs.push("Error: la funcion "+id+ "ya existe en el entorno");
        }



      }

      public getVector(id: string): Vector | null{

        let env: Environment | null = this;

        //Buscaos la variable
        while (env != null){

          if (env.vectores.has(id.toLowerCase())){
              return env.vectores.get(id.toLowerCase())!;
          } 

          env = env.anterior;

        }

        return null;

      }


      public changeVector(id: string, index: any, valor:Expression ){

        let env: Environment | null = this;

        //buscamos la variable
        while (env != null){

          if(env.vectores.has(id.toLowerCase())){

              let vector = env.vectores.get(id.toLowerCase())! 
              vector.valores[index] = valor;
              //console.log(vector);

              env.vectores.set(id.toLocaleLowerCase(), vector);
              return
     
          }

          env = env.anterior;


        }

        console.log("No se ha encontrado la variable "+id+" para asignar")


      }



/*
      public setnombre(str: string){
        this.nombre = str;

      }*/

}