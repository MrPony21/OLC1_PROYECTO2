

//Analisis Lexico
%lex
%options case-insensitive

%%

//reservadas principales
"main"          return "MAIN";
"void"          return "VOID";
"Print"         return "PRINT";
"toLower"       return "TOLOWER";
"toUpper"       return "TOUPPER";
"Lenght"        return "LENGHT";
"Truncate"      return "TRUNCATE";
"Round"         return "ROUND";
"Typeof"        return 'Typeof';
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
"return"    return "return";

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
"."         return "PUNTO";



//reservadas tipo de datos
"int"       return "RES_INT";
"double"    return "RES_DOUBLE";
"boolean"   return "RES_BOOL";
"char"      return "RES_CHAR";
"string"    return "RES_STRING";

//aritmeticas
"+"         return "MAS";
"-"         return "MENOS";
"*"         return "POR";
"/"         return "DIVISION";
"^"         return "POTENCIA";
"%"         return "MODULO";


//Operadores racionales
"="         return "IGUAL";
"=="        return "IGUALAR";
"!="        return "NOIGUAL";
"<"         return "MENOR";
"<="        return "MENORIGUAL";
">"         return "MAYOR";
">="        return "MAYORIGUAL";

//operadores logicos
(\|\|)      return "OR";
"&&"        return "AND";
"!"         return "NOT";





//------------------------expressionES REGULARES--------------------------------

[ \r\t]+    {}
\n          {}

/*
//ESCAPADOS
ESC = "\\n"|"\\\""|"\\\'"
*/
//Comentarios
(\/\/).*    {};
[\/][*][^*]*[*]+([^\/*][^*]*[*]+)*[\/]  {};


//tipos de datos
[0-9]+("."[0-9]+)\b return 'DOUBLE';
[0-9]+     return 'INT';
"true"|"false"   return 'BOOL';
(\'[^']\')       return 'CHAR';
(\"([^\"]|"\\\"")*\")  return 'CADENA';
[a-zA-Z_][a-zA-Z0-9_]*  return 'IDENTIFICADOR';


<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}

/lex

%{
    const{Print} = require('../instruccion/Print');
    const{Primitivo} = require('../expression/Primitivo');
    const{Type} = require('../abstract/Tipo_primitivo');
    const{Declaration} = require('../instruccion/Declaration')

%}

//PRECEDENCIAS
%left 'OR'
%left 'AND'
%left 'POTENCIA'
%left 'IGUAL', 'NOIGUAL'
%left 'MAYORIGUAL', 'MENORIGUAL', 'MENOR', 'MAYOR'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVISION' 'MODULO'
%left 'NOT'
%left 'UMENOS'
%left 'PUNTO', 'CORIZQ', 'CORDER'
%left 'KLENNE' 'DOSPUNTOS'

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
    : Print { $$ = $1;}
    | Declaration { $$ = $1 }
    | error PUNTOCOMA 
    { console.error('Este es un error sintactico: ' +yytext + ', en la linea: '+ this._$.first_line+ ', en la columna: '+ this._$.first_column);}
;


Print
    : PRINT PARIZQ Expression PARDER PUNTOCOMA { $$ = new Print(@1.first_line, @1.first_column, $3);}
;


Expression
    : Primitivo     { $$ = $1;}
    | Accvar        { $$ = $1;}
    //| aritmetica    { $$ = $1;}
;

Primitivo
    : INT       { $$ = new Primitivo(@1.first_line,@1.first_column,$1, Type.INT);}
    | DOUBLE    { $$ = new Primitivo(@1.first_line,@1.first_column,$1, Type.DOUBLE); console.log("se ingreso un double");}
    | BOOL      { $$ = new Primitivo(@1.first_line,@1.first_column,$1, Type.BOOLEAN);}
    | CHAR      { $$ = new Primitivo(@1.first_line,@1.first_column,$1, Type.CHAR);}
    | CADENA    { $$ = new Primitivo(@1.first_line,@1.first_column,$1, Type.STRING);}
;

Declaration
    : Tipo IDENTIFICADOR PUNTOCOMA                  { $$ = new Declaration($2, $1, null, @1.first_line,@1.first_column)}
    | Tipo IDENTIFICADOR IGUAL Expression PUNTOCOMA { $$ = new Declaration($2, $1, $4, @1.first_line,@1.first_column)}
;


Tipo
    : RES_INT       { $$ = Type.INT }
    | RES_DOUBLE    { $$ = Type.DOUBLE}
    | RES_BOOL      { $$ = Type.BOOLEAN}
    | RES_CHAR      { $$ = Type.CHAR}
    | RES_STRING    { $$ = Type.STRING} 
;

Accvar
    : IDENTIFICADOR { $$ = $1;}
;

/*
Aritmetica
    : expression MAS expression 
    | expression MENOS expression
    | expression POR expression
    | expression DIVISION expression
    | expression POTENCIA expression
    | expression MODULO expression
;*/