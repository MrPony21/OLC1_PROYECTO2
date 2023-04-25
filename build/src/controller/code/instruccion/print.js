"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const instruccion_1 = require("../abstract/instruccion");
class Print extends instruccion_1.Instruccion {
    constructor(line, column, expression) {
        super(line, column);
        this.expression = expression;
    }
    execute(env) {
        const value = this.expression.execute(env);
        console.log(value.value);
    }
}
exports.Print = Print;
