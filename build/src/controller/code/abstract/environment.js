"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const simbolo_1 = require("./simbolo");
const out_1 = require("../salidas/out");
class Environment {
    constructor(anterior) {
        this.variables = new Map();
        this.anterior = anterior;
        this.variables = new Map();
    }
    // guardar una nueva variable
    save(id, valor, tipo, linea, columna) {
        // verificar el ambito
        let env = this;
        // verificar si la variable ya existe
        if (!env.variables.has(id.toLowerCase())) {
            // guardar la variable
            // guardar la variable en una tabla de simbolos para el reporte
            env.variables.set(id.toLowerCase(), new simbolo_1.Simbolo(valor, id, tipo));
        }
        else {
            out_1.outs.push("Error: la variable " + id + "ya existe en el entorno, en linea: " + linea + " y columna: " + columna);
        }
    }
    getVariable(id) {
        let env = this;
        //Buscaos la variable
        while (env != null) {
            if (env.variables.has(id.toLowerCase())) {
                return env.variables.get(id.toLocaleLowerCase());
            }
            env = env.anterior;
        }
        return null;
    }
}
exports.Environment = Environment;
