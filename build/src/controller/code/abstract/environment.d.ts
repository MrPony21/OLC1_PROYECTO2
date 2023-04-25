import { Type } from "./Tipo_primitivo";
export declare class Environment {
    private anterior;
    private variables;
    constructor(anterior: Environment | null);
    save(id: string, valor: any, tipo: Type, linea: number, columna: number): void;
}
