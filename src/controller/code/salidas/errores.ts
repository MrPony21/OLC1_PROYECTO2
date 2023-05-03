


export class Errores{

    public tipo;
    public descripcion;
    public linea;
    public columna;


    constructor(tipo: string, descripcion: string, linea: number, columna: number){
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;

    }

    


}