"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaration = void 0;
const instruccion_1 = require("../abstract/instruccion");
class Declaration extends instruccion_1.Instruccion {
    constructor(id, tipo, valor, line, column) {
        super(line, column);
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }
    execute(env) {
        if (this.valor != null) {
            const val = this.valor.execute(env);
            env.save(this.id, val.value, this.tipo, this.line, this.column);
        }
        else {
            env.save(this.id, null, this.tipo, this.line, this.column);
        }
    }
}
exports.Declaration = Declaration;
