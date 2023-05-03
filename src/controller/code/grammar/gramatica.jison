

//Analisis Lexico
%lex
%options case-insensitive

%%

[ \r\t]+    {}
\n          {}

/* COMENTARIOS */
[/][/].*                               {/* IGNORE */}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]    {/* IGNORE */}


//reservadas principales
"main"          return "MAIN";
"void"          return "VOID";
"Print"         return "PRINT";
"toLower"       return "TOLOWER";
"toUpper"       return "TOUPPER";
"Lenght"        return "LENGHT";
"Truncate"      return "TRUNCATE";
"Round"         return "ROUND";
"Typeof"        return 'TYPEOF';
"toString"      return "TOSTRING";
"toCharArray"   return "TOCHARARRAY";


//palabras reservadas sentencias de control, ciclicas y transferencia
"if"        return "IF";
"else"      return "ELSE";
"switch"    return "SWITCH";
"case"      return "CASE";
"default"   return "DEFAULT";
"while"     return "WHILE";
"for"       return "FOR";
"do"        return "DO";
"break"     return "BREAK"
"continue"  return "CONTINUE";
"return"    return "RETURN";

//palabras reservadas estructuras de datos
"new"       return "NEW";
'add'       return "ADD";     


//Simbolos reservados
"?"         return "KLENNE";
":"         return "DOSPUNTOS";
";"         return "PUNTOCOMA";
"("         return "PARIZQ";
")"         return "PARDER";
"{"         return "LLAVEIZQ";
"}"         return "LLAVEDER";
"["         return "CORIZQ";
"]"         return "CORDER";
","         return "COMA"
"."         return "PUNTO";



//reservadas tipo de datos
"int"       return "RES_INT";
"double"    return "RES_DOUBLE";
"boolean"   return "RES_BOOL";
"char"      return "RES_CHAR";
"string"    return "RES_STRING";

//aritmeticas
"++"        return "INCREMENTO";
"--"        return "DECREMENTO";
"+"         return "MAS";
"-"         return "MENOS";
"*"         return "POR";
"/"         return "DIVISION";
"^"         return "POTENCIA";
"%"         return "MODULO";


//Operadores racionales
"=="        return "IGUALAR";
"="         return "IGUAL";
"!="        return "NOIGUAL";
"<="        return "MENORIGUAL"
"<"         return "MENOR";
">="        return "MAYORIGUAL";
">"         return "MAYOR";

//operadores logicos
(\|\|)      return "OR";
"&&"        return "AND";
"!"         return "NOT";





//------------------------expressionES REGULARES--------------------------------

/*
//ESCAPADOS
ESC = "\\n"|"\\\""|"\\\'"
*/



//tipos de datos
[0-9]+("."[0-9]+)\b return 'DOUBLE';
[0-9]+     return 'INT';
"true"|"false"   return 'BOOL';
(\'[^']\')       return 'CHAR';
(\"([^\"]|"\\\"")*\")  return 'CADENA';
[a-zA-Z_][a-zA-Z0-9_]*  return 'IDENTIFICADOR';


<<EOF>>                 return 'EOF';

.                       { 
                            console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);  
                            const nuevooble =  { tipo: "Lexico", descripcion: `Caracter: ${yytext} no esperado`, linea:  yylloc.first_line , columna: yylloc.first_column}
                            Err.push(nuevooble);
                        }



/lex

%{
    const{Print} = require('../instruccion/Print');
    const{Primitivo} = require('../expression/Primitivo');
    const{Type} = require('../abstract/Tipo_primitivo');
    const{Declaration} = require('../instruccion/Declaration');
    const{Access} = require('../expression/Access');
    const{Operacion_aritmetica} = require('../expression/operacion_aritmetica');
    const{Asignacion} = require('../instruccion/asignacion.ts');
    const{Statement} = require('../instruccion/statement.ts');
    const{Funcion} = require('../instruccion/funcion.ts');
    const{Parametro} = require('../expression/parametro.ts');
    const{CallFuncion} = require('../expression/callFuncion.ts');
    const{Operacion_relacional} = require('../expression/operacion_relacional.ts');
    const{Operacion_unaria} = require('../expression/operacion_unaria.ts');
    const{For} = require('../instruccion/for.ts');
    const{If} = require('../instruccion/if.ts');
    const{Operacion_logica} = require('../expression/operacion_logica.ts');
    const{While} = require('../instruccion/while.ts');
    const{ReturnExpression} = require('../expression/return.ts');
    const{Dowhile} = require('../instruccion/dowhile.ts');
    const{TOLower} = require('../expression/tolower.ts');
    const{TOUpper} = require('../expression/toupper.ts');
    const{Truncate} = require('../expression/truncate.ts');
    const{Round} = require('../expression/round.ts');
    const{TypeOf} = require('../expression/typeof.ts');
    const{ToString} = require('../expression/tostring.ts')
    const{Err} = require('../salidas/out.ts')
    

%}

//PRECEDENCIAS

%left 'OR'
%left 'AND'
%left 'NOT'
%left 'POTENCIA'
%left 'IGUALAR', 'NOIGUAL'
%left 'MAYORIGUAL', 'MENORIGUAL', 'MENOR', 'MAYOR'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVISION' 'MODULO'
%right 'UMENOS'
%left 'PUNTO', 'CORIZQ', 'CORDER'
%left 'KLENNE' 'DOSPUNTOS'


/*
//otras precedencias
//Logicas
%left 'INCREMENTO' 'DECREMENTO'
%left 'POTENCIA'
%left 'OR'
%left 'AND'
%left 'NOIGUAL, IGUALAR'
%left 'MAYOR' 'MENOR' 'MAYORIGUAL' 'MENORIGUAL'
//numeros
%left 'MAS' 'MENOS'
%left 'POR' 'DIVISION' 'MODULO'
%right 'POTENCIA POTENCIA'
%right negativo 'NOT' 'PARIZQ'
*/

//COMENZAMOS CON LA GRAMATICA

%start Init

%%

Init
    : Instrucciones EOF {return $1;}
;


Instrucciones
    : Instrucciones Instruccion { $1.push($2); $$ = $1 }
    | Instruccion               { $$ = [$1];}
;

Instruccion
    : main                               { $$ = $1; }
    | Print                              { $$ = $1; }
    | Declaration                        { $$ = $1; }
    | Asignacion                         { $$ = $1; }
    | Callfuncion PUNTOCOMA              { $$ = $1; }
    | DeclararFuncion                    { $$ = $1; }
    | Operaciones_unarias PUNTOCOMA      { $$ = $1; }
    | For                                { $$ = $1; }
    | cif                                { $$ = $1; }  
    | While                              { $$ = $1; }   
    | Dowhile                            { $$ = $1; }  
    | ReturnExp                          { $$ = $1; }
    | Transfer                           { $$ = $1; }
    | error PUNTOCOMA 
    { 
        console.error('Este es un error sintactico: ' +yytext + ', en la linea: '+ this._$.first_line+ ', en la columna: '+ this._$.first_column);  
        const nuevoobj =  { tipo: "Sintactico", descripcion: `token no esperado:  ${yytext}`, linea:  this._$.first_line , columna: this._$.first_column+1};
        Err.push(nuevoobj)
    }
;

main
    : MAIN Callfuncion PUNTOCOMA { $$ = $2; }
;

Print
    : PRINT PARIZQ Expression PARDER PUNTOCOMA { $$ = new Print(@1.first_line, @1.first_column, $3);}
;


Expression
    : Primitivo     { $$ = $1;}
    | Accvar        { $$ = $1;}
    | Aritmetica    { $$ = $1;}
    | Relacionales  { $$ = $1;}
    | Operaciones_unarias { $$ = $1;}
    | Logicos              { $$ = $1; }
    | Callfuncion              { $$ = $1; }
    | Tolower                   { $$ = $1;}
    | Toupper                   { $$ = $1;}
    | Truncate                  { $$ = $1; }
    | Round                     { $$ = $1; }
    | Typeof                    { $$ = $1; }   
    | Tostring                  { $$ = $1; }   
    //CASTEO
;

Primitivo
    : INT       { $$ = new Primitivo(@1.first_line,@1.first_column,$1, Type.INT);}
    | DOUBLE    { $$ = new Primitivo(@1.first_line,@1.first_column,$1, Type.DOUBLE);}
    | BOOL      { $$ = new Primitivo(@1.first_line,@1.first_column,$1, Type.BOOLEAN);}
    | CHAR      { $$ = new Primitivo(@1.first_line,@1.first_column,$1, Type.CHAR);}
    | CADENA    { $$ = new Primitivo(@1.first_line,@1.first_column,$1, Type.STRING);}
;

Declaration
    : Tipo IDENTIFICADOR PUNTOCOMA                  { $$ = new Declaration($2, $1, null, @1.first_line,@1.first_column);}
    | Tipo IDENTIFICADOR IGUAL Expression PUNTOCOMA { $$ = new Declaration($2, $1, $4, @1.first_line,@1.first_column);}
;


Tipo
    : RES_INT       { $$ = Type.INT }
    | RES_DOUBLE    { $$ = Type.DOUBLE}
    | RES_BOOL      { $$ = Type.BOOLEAN}
    | RES_CHAR      { $$ = Type.CHAR}
    | RES_STRING    { $$ = Type.STRING} 
;

Accvar
    : IDENTIFICADOR { $$ = new Access($1, @1.first_line,@1.first_column);}
;

//Sentencias control y ciclicas
For
    : FOR PARIZQ Declaration Expression PUNTOCOMA Operaciones_unarias PARDER Statement { $$ = new For($3, $4, $6, $8 ,@1.first_line,@1.first_column); }
;

While
    : WHILE PARIZQ Expression PARDER Statement { $$ = new While($3, $5, @1.first_line,@1.first_column);}
;

Dowhile
    : DO Statement WHILE PARIZQ Expression PARDER PUNTOCOMA{ $$ = new Dowhile($5, $2 , @1.first_line,@1.first_column);}
;

cif
    : IF PARIZQ Expression PARDER Statement celse { $$ = new If($3, $5, $6, @1.first_line,@1.first_column); }
;

celse
    : ELSE Statement { $$ = $2; }
    | ELSE cif       { $$ = $2; }
    | { $$ = null; }
;

Aritmetica
    : Expression MAS Expression        { $$ = new Operacion_aritmetica($1,"+",$3, @1.first_line,@1.first_column); }
    | Expression MENOS Expression      { $$ = new Operacion_aritmetica($1,"-",$3, @1.first_line,@1.first_column); }
    | Expression POR Expression        { $$ = new Operacion_aritmetica($1,"*",$3, @1.first_line,@1.first_column); }
    | Expression DIVISION Expression   { $$ = new Operacion_aritmetica($1,"/",$3, @1.first_line,@1.first_column); }
    | Expression POTENCIA Expression   { $$ = new Operacion_aritmetica($1,"^",$3, @1.first_line,@1.first_column); }
    | Expression MODULO Expression     { $$ = new Operacion_aritmetica($1,"%",$3, @1.first_line,@1.first_column); }
    | MENOS Expression %prec UMENOS    { $$ = new Operacion_aritmetica($2,'umenos', $2 ,@1.first_line,@1.first_column); }
    | PARIZQ Expression PARDER         { $$ = $2}
;

Operaciones_unarias
    :IDENTIFICADOR INCREMENTO { $$ = new Operacion_unaria($1,"++", @1.first_line,@1.first_column); }
    |IDENTIFICADOR DECREMENTO { $$ = new Operacion_unaria($1,"--", @1.first_line,@1.first_column); }
;

Relacionales
    : Expression IGUALAR Expression     { $$ = new Operacion_relacional($1,"==",$3,  @1.first_line,@1.first_column); }
    | Expression NOIGUAL Expression     { $$ = new Operacion_relacional($1,"!=",$3,  @1.first_line,@1.first_column); }
    | Expression MENOR Expression       { $$ = new Operacion_relacional($1,"<",$3,  @1.first_line,@1.first_column); }
    | Expression MENORIGUAL Expression  { $$ = new Operacion_relacional($1,"<=",$3,  @1.first_line,@1.first_column); }
    | Expression MAYOR Expression       { $$ = new Operacion_relacional($1,">",$3,  @1.first_line,@1.first_column); }
    | Expression MAYORIGUAL Expression  { $$ = new Operacion_relacional($1,">=",$3,  @1.first_line,@1.first_column); }
;

Logicos
    : Expression OR Expression          { $$ = new Operacion_logica($1, "OR", $3, @1.first_line,@1.first_column);}
    | Expression AND Expression         { $$ = new Operacion_logica($1, "AND", $3 , @1.first_line,@1.first_column);}
    | NOT Expression                    { $$ = new Operacion_logica($2, "NOT", $2 , @1.first_line,@1.first_column)}
;

Asignacion
    : IDENTIFICADOR IGUAL Expression PUNTOCOMA { $$ = new Asignacion($1, $3, @1.first_line,@1.first_column); }
;


DeclararFuncion
    : Tipo IDENTIFICADOR PARIZQ Parametros PARDER Statement { $$ = new Funcion($1,$2,$4,$6, @1.first_line,@1.first_column);}
    | VOID IDENTIFICADOR PARIZQ Parametros PARDER Statement { $$ = new Funcion(Type.NULL, $2, $4, $6 , @1.first_line,@1.first_column);}
    | Tipo IDENTIFICADOR PARIZQ PARDER Statement            { $$ = new Funcion($1, $2, [], $5, @1.first_line,@1.first_column);}
    | VOID IDENTIFICADOR PARIZQ PARDER Statement            { $$ = new Funcion(Type.NULL, $2, [], $5, @1.first_line,@1.first_column); }
;


Parametros
    : Parametros COMA Tipo IDENTIFICADOR{
                                            $1.push( new Parametro($3, $4, @1.first_line,@1.first_column));
                                            $$ = $1;
                                        }
    | Tipo IDENTIFICADOR    { 
                                let para = new Parametro($1, $2, @1.first_line,@1.first_column)
                                let params = [];
                                params.push(para);
                                $$ = params;
                            }
;

Statement
    : LLAVEIZQ Instrucciones LLAVEDER { $$ = new Statement($2, @1.first_line,@1.first_column);}
;


Callfuncion
    : IDENTIFICADOR PARIZQ PARDER               { $$ = new CallFuncion($1, [] , @1.first_line,@1.first_column);}        
    | IDENTIFICADOR PARIZQ Argumentos PARDER    { $$ = new CallFuncion($1, $3 , @1.first_line,@1.first_column);}
;


Argumentos
    : Argumentos COMA Expression    { $1.push($3); $$ = $1 } 
    | Expression                    { $$ = [$1];}
;

ReturnExp
    : RETURN Expression PUNTOCOMA                     { $$ = new ReturnExpression( $2, Type.RETURN , @1.first_line,@1.first_column); }
    | RETURN PUNTOCOMA                                { $$ = new ReturnExpression( null, Type.RETURN , @1.first_line,@1.first_column); }  
;

Transfer 
    : BREAK PUNTOCOMA                                 { $$ = new ReturnExpression( null, Type.BREAK, @1.first_line,@1.first_column);}
    | CONTINUE PUNTOCOMA                              { $$ = new ReturnExpression( null, Type.CONTINUE,@1.first_line,@1.first_column);}
;

//funciones nativas
Tolower
    : TOLOWER PARIZQ Expression PARDER       { $$ = new TOLower($3, @1.first_line,@1.first_column); }
;

Toupper
    : TOUPPER PARIZQ Expression PARDER          { $$ = new TOUpper($3, @1.first_line,@1.first_column); }
;

Truncate
    : TRUNCATE PARIZQ Expression PARDER          { $$ = new Truncate($3, @1.first_line,@1.first_column); }
;

Round   
    : ROUND PARIZQ Expression PARDER             { $$ = new Round($3, @1.first_line,@1.first_column); }
;

Typeof
    : TYPEOF PARIZQ Expression PARDER           { $$ = new TypeOf($3,  @1.first_line,@1.first_column); }
;

Tostring
    : TOSTRING PARIZQ Expression PARDER         { $$ = new ToString($3, @1.first_line,@1.first_column); }
;