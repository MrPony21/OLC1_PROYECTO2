"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const simbolo_1 = require("./simbolo");
class Environment {
    constructor(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
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
            //printlist.push("Error, La variable "+id+" ya existe en el entorno, linea "+linea+" y columna "+columna);
        }
    }
}
exports.Environment = Environment;
