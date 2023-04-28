import { Expression } from "../abstract/expression";
import { Return, Type } from "../abstract/Tipo_primitivo";
import { Environment } from "../abstract/environment";
import { TDivision, TModulo, TMultiplicacion, TPotencia, TResta, TSuma } from "../support/tablaAritmetica";

export class Operacion_aritmetica extends Expression{

    exp1: Expression;
    exp2: Expression;
    signo: String;



    constructor(exp1: Expression,signo: string, exp2: Expression, line: number, column: number){
        super(line, column);
        this.exp1 = exp1;
        this. exp2 = exp2;
        this.signo = signo;

    }

    public execute(env: Environment): Return{

        const op1 = this.exp1.execute(env);
        const op2 = this.exp2.execute(env);

        if (this.signo == "+"){

            const TipoResultado = TSuma[op1.type][op2.type];
            switch(TipoResultado){
                case Type.INT:

                    //Aqui verificamos si son boolean y cambiarlo a entero
                    
                    if(op1.type == Type.BOOLEAN){
                        
                        op1.value = op1.value? 1: 0;

                    }
                    if(op2.type == Type.BOOLEAN){

                        op2.value = op2.value? 1: 0;

                    }
                    

                    //Aqui verificamos si son char y cambiarlo a entero
                    if(op1.type == Type.CHAR){

                        op1.value = op1.value.charCodeAt(0);

                    }
                    if(op2.type == Type.CHAR){

                        op2.value = op2.value.charCodeAt(0);

                    }

                    return { value: op1.value + op2.value, type: Type.INT};
                    
                case Type.DOUBLE:

                    
                    if(op1.type == Type.CHAR){

                        op1.value = op1.value.charCodeAt(0);

                    }
                    if(op2.type == Type.CHAR){

                        op2.value = op2.value.charCodeAt(0);

                    }

                    return { value: op1.value + op2.value, type: Type.DOUBLE};


                case Type.STRING:
                    
                    if(op1.value == Type.INT){

                        op1.value = op1.value as string;

                    }    
                    if(op2.value == Type.INT){

                        op2.value = op2.value as string;

                    }

                    if(op1.value == Type.DOUBLE){

                        op1.value = op1.value as string;

                    }    
                    if(op2.value == Type.DOUBLE){

                        op2.value = op2.value as string;

                    }

                    if(op1.value == Type.BOOLEAN){

                        op1.value = op1.value as string;

                    }    
                    if(op2.value == Type.BOOLEAN){

                        op2.value = op2.value as string;

                    }


                
                    return { value: op1.value + op2.value, type: Type.STRING};


            }
        
        //--------------------------------------RESTA QUEDA EN PAUSA--------------------------------
        }
        else if(this.signo == "-"){

            const TipoResultado = TResta[op1.type][op2.type];
            switch(TipoResultado){
                case Type.INT:

                    if(op1.type == Type.BOOLEAN){
                            
                        op1.value = op1.value? 1: 0;

                    }
                    if(op2.type == Type.BOOLEAN){

                        op2.value = op2.value? 1: 0;

                    }
                    
                    if(op1.type == Type.CHAR){

                        op1.value = op1.value.charCodeAt(0);

                    }
                    if(op2.type == Type.CHAR){

                        op2.value = op2.value.charCodeAt(0);

                    }
                    
                    return { value: op1.value - op2.value, type: Type.INT };
                    
                case Type.DOUBLE:

                    if(op1.type == Type.CHAR){

                        op1.value = op1.value.charCodeAt(0);

                    }
                    if(op2.type == Type.CHAR){

                        op2.value = op2.value.charCodeAt(0);

                    }


                    return { value: op1.value - op2.value, type: Type.DOUBLE };


            }

        } 
        else if (this.signo == "umenos"){

            const op2 = this.exp2.execute(env);

            if(op2.type == Type.INT){
                return { value: -op2.value, type: Type.INT };
            } else if(op2.type == Type.DOUBLE){
                return { value: -op2.value, type: Type.DOUBLE};
            }

        } 
        else if(this.signo == "*"){

            const TipoResultado = TMultiplicacion[op1.type][op2.type];
            switch(TipoResultado){
                case Type.INT:

                    return { value: op1.value * op2.value, type: Type.INT};

                case Type.DOUBLE:

                    return { value: op1.value * op2.value, type: Type.DOUBLE};


            }
        }
        else if(this.signo == "/"){

            const TipoResultado = TDivision[op1.type][op2.type];
            switch(TipoResultado){

                case Type.DOUBLE:

                    return { value: op1.value / op2.value, type: Type.DOUBLE};

            }

        }
        else if(this.signo == "^"){

            const TipoResultado = TPotencia[op1.type][op2.type];
            switch(TipoResultado){
                case Type.INT:

                    return { value: op1.value ** op2.value, type: Type.INT};

                case Type.DOUBLE:

                    return { value: op1.value ** op2.value, type: Type.DOUBLE};


            }

        }
        else if(this.signo == "%"){

            const TipoResultado = TModulo[op1.type][op2.type];
            switch(TipoResultado){
                
                case Type.DOUBLE:

                    return { value: op1.value % op2.value, type: Type.DOUBLE};


            }

        }


        return { value: null, type: Type.NULL };
    }



}