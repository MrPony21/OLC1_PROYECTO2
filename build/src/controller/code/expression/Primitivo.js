"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const expression_1 = require("../abstract/expression");
const Tipo_primitivo_1 = require("../abstract/Tipo_primitivo");
class Primitivo extends expression_1.Expression {
    constructor(line, column, value, tipo) {
        super(line, column);
        this.value = value;
        this.tipo = tipo;
    }
    execute() {
        switch (this.tipo) {
            case Tipo_primitivo_1.Type.INT:
                return { value: parseInt(this.value), type: Tipo_primitivo_1.Type.INT };
            case Tipo_primitivo_1.Type.DOUBLE:
                return { value: parseFloat(this.value), type: Tipo_primitivo_1.Type.DOUBLE };
            case Tipo_primitivo_1.Type.BOOLEAN:
                if (this.value.toString().toLowerCase() === "true") {
                    return { value: true, type: Tipo_primitivo_1.Type.BOOLEAN };
                }
                return { value: false, type: Tipo_primitivo_1.Type.BOOLEAN };
            case Tipo_primitivo_1.Type.CHAR:
                return { value: this.value, type: Tipo_primitivo_1.Type.CHAR };
            case Tipo_primitivo_1.Type.STRING:
                return { value: this.value, type: Tipo_primitivo_1.Type.STRING };
            default:
                return { value: null, type: Tipo_primitivo_1.Type.NULL };
        }
    }
}
exports.Primitivo = Primitivo;
