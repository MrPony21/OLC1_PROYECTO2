import { Simbolo } from "./simbolo";
import { Type } from "./Tipo_primitivo";
export declare class Environment {
    private variables;
    private anterior;
    constructor(anterior: Environment | null);
    save(id: string, valor: any, tipo: Type, linea: number, columna: number): void;
    getVariable(id: string): Simbolo | null;
}
