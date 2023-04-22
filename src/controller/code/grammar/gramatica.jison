

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
"=="        return "IGUAL";
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
[0-9]+     return 'INT';
[0-9]+(\.[0-9]+) return 'DOUBLE';
"true"|"false"   return 'BOOL';
(\'[^']\')       return 'CHAR';
(\"([^\"]|"\\\"")*\")  return 'CADENA';
[a-zA-Z_][a-zA-Z0-9_]*  return 'IDENTIFICADOR';


<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}

/lex

%{

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
    : instrucciones EOF
;


Instrucciones
    : instrucciones instruccion
    | instruccion
;

Instruccion
    : defprint
    | error PUNTOCOMA 
    { console.error('Este es un error sintactico: ' +yytext + ', en la linea: '+ this._$.first_line+ ', en la columna: '+ this._$.first_column);}
;


Defprint
    : PRINT PARIZQ expression PARDER PUNTOCOMA { console.log($3);}
;


Expression
    : primitivo 
    | accvar
    | aritmetica
;

Primitivo
    : INT
    | DOUBLE
    | BOOL
    | CHAR
    | CADENA
;

Accvar
    : IDENTIFICADOR
;

Aritmetica
    : expression MAS expression
    | expression MENOS expression
    | expression POR expression
    | expression DIVISION expression
    | expression POTENCIA expression
    | expression MODULO expression
;