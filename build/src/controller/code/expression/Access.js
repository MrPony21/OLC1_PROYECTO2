"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Access = void 0;
const expression_1 = require("../abstract/expression");
const Tipo_primitivo_1 = require("../abstract/Tipo_primitivo");
class Access extends expression_1.Expression {
    constructor(id, line, column) {
        super(line, column);
        this.id = id;
    }
    execute(env) {
        const vari = env.getVariable(this.id);
        if (vari) {
            return { value: vari.valor, type: vari.type };
        }
        else {
            return { value: null, type: Tipo_primitivo_1.Type.NULL };
        }
    }
}
exports.Access = Access;
