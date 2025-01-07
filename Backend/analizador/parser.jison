
// ################### ANALIZADOR LEXICO #######################
%lex
%options case-insensitive 

// ---------> Expresiones Regulares
double [0-9]+\.[0-9]+; 
entero [0-9]+;
bool ("true"|"false");
char  [\'][^\n\'][\']; 
cadena [\"][^\n\"]*[\"];
null "null";
ID [a-zA-Z_][a-zA-Z0-9_]*;

%%
// -----> Reglas Lexicas
\s+               {/* Ignorar espacios en blanco */}       
"//".*            {/* Comentario simple */}   
\/\*[\s\S]*?\*\/  {/* Comentario multilinea */}
// Simbolos
";"               { return 'PYC'; }
// Expresiones Regulares
"lower"       {return "TOLOWER"; }
"upper"       {return "TOUPPER"; }
"toString"   {return "TOSTRING"; }
"round"         {return "ROUND"; }
"truncate"    {return "TRUNCATE"; }
"else"          {return "ELSE"; }
"if"			{return "IF"; }
"for"			{return "FOR"; }
"switch"		{return "SWITCH"; }
"case"			{return "CASE"; }
"default"		{return "DEFAULT"; }
"break"         {return "BREAK"; }
"continue"          {return "CONTINUE"; }
"return"          {return "RETURN"; }
"while"         {return "WHILE"; }
"loop"         {return "LOOP"; }
"do"            {return "DO"; }
"until"         {return "UNTIL"; }
"new"           {return "NEW"; }
"vector"        {return "VECTOR"; }
"function"     {return "FUNCTION"; }
"void"          {return "VOID"; }
"ejecutar"   {return "EXECUTE"; }
"int"            {return "PINT"; }
"double"      {return "PDOUBLE"; }
"bool"    {return "PBOOLEAN"; }
"char"         {return "PCHAR"; }
"string"     {return "PCADENA"; }
"is"           {return "IS"; }
"echo"            { return 'ECHO'; }
"let"            { return 'LET'; }
"const"        { return 'CONST'; }
"cast"          { return 'CAST'; }
"len"          {return "LENGTH"; }
"as"              { return 'AS'; }
"++"           { return 'MASMAS'; }
"--"           { return 'MENOSMENOS'; }
"{"               { return 'LLAVEIZQ'; }"
"}"               { return 'LLAVEDER'; }
"["               { return 'CORCHETEIZQ'; }
"]"               { return 'CORCHETEDER'; }
","               { return 'COMA'; }
"("             {return "PARIZQ"; }
")"             {return  "PARDER"; }
"+"              { return 'MAS'; }
"-"              { return 'MENOS'; }
"*"              { return 'POR'; }
"/"              { return 'DIV'; }
"^"             { return 'POW'; }
"$"             { return 'RAIZ'; }
"%"              { return 'MOD'; }
"=="            { return 'IGUALIGUAL'; }
"="            { return 'IGUAL'; }
":"            { return 'DOSPUNTOS'; }
";"            { return 'PYC'; }
"!="            { return 'DIFERENTE'; }
"<="            { return 'MENORIGUAL'; }
">="            { return 'MAYORIGUAL'; }
"<"             { return 'MENOR'; }
">"             { return 'MAYOR'; }
"||"           { return 'OR'; }
"&&"            { return 'AND'; }
"!"             { return 'NOT'; }
{double}          { return 'DOUBLE'; }
{entero}             { return 'INT'; }
{bool}            { return 'BOOL'; }
{char}            { return 'CHAR'; }
{cadena}          { return 'CADENA'; }
{null}            { return 'NULL'; }
{ID}              { return 'ID'; }

// -----> Fin de cadena y errores
<<EOF>>           { return 'EOF'; }
.                 { console.error('Error léxico: El siguiente caracter no pertenece al lenguaje "' + yytext + '", línea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); errores.crearError("Error Lexico: ","El carácter "+yytext+ " no pertenece al lenguaje ",yylloc.first_line,yylloc.first_column); }

%%

/lex

// ################## ANALIZADOR SINTACTICO ######################
// -------> Precedencia
%{
const Dato = require("../interprete/Expresion/Dato.js");
const Print = require("../interprete/instruccion/Print.js");
const Negativo = require("../interprete/Expresion/Negativo.js");
const { TipoDato } = require("../interprete/Expresion.js");
const Aritmetica = require("../interprete/Expresion/Aritmetica.js");
const ProcesarSinEcape = require("../interprete/Expresion/procesarsecuenciasdeescape.js");
const Relacionales = require("../interprete/Expresion/Relacionales.js");
const Not = require("../interprete/Expresion/Not.js");
const Tolower = require('../interprete/expresion/Tolower.js');
const ToUpper = require('../interprete/expresion/Toupper.js');
const ToString = require('../interprete/expresion/Tostring.js');
const Round = require('../interprete/expresion/Round.js');
const Truncate = require('../interprete/expresion/Truncate.js');
const Is = require('../interprete/expresion/Is.js');
const Declarar = require('../interprete/instruccion/Declarar.js');
const Casteos = require('../interprete/expresion/Casteos.js');
const Incremento_decremento = require('../interprete/instruccion/Incremento_Decremento.js');
const Retorno_variable = require('../interprete/expresion/Retorno_variable.js');
const If = require('../interprete/instruccion/If.js');
const For = require('../interprete/instruccion/For.js');
const Asignacion = require('../interprete/instruccion/Asignacion.js');
const Swich = require('../interprete/instruccion/Swich.js');
const Break = require('../interprete/instruccion/Break.js');
const Continue = require('../interprete/instruccion/Continue.js');
const Return = require('../interprete/instruccion/Return.js');
const { Instruccion, TipoInstr } = require("../interprete/Instruccion");
const While  = require("../interprete/instruccion/While.js");
const Loop = require("../interprete/instruccion/Loop.js");
const Do_Until = require('../interprete/instruccion/Do_Until.js');
const Vector1_expresion = require('../interprete/instruccion/Vector1_expresion.js');
const  Vector2_expresion = require('../interprete/instruccion/Vector2_expresion.js');
const  Vector1_listado = require('../interprete/instruccion/Vector1_listado.js');
const Vector2_listado  = require('../interprete/instruccion/Vector2_listado.js');
const DecFuncion = require('../interprete/Funciones/DecFuncion.js');
const CallFuncion = require('../interprete/Funciones/CallFuncion.js');
const Execute = require('../interprete/Funciones/Execute.js');
const Length = require('../interprete/expresion/Length.js');
const errores = require("../analizador/utilidad/Errores.js");
// Aquí puedes definir las funciones y variables auxiliares necesarias

%}

// Ejemplos de reglas de precedencia (puedes descomentar y ajustar estas reglas según tus necesidades):
// %left 'INTERROGACION'
%right 'IS' // Declaramos que IS tiene menor precedencia
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'DIFERENTE','IGUALIGUAL'
%left 'MENORIGUAL','MAYORIGUAL','MENOR','MAYOR'
%left 'MAS','MENOS'
%left 'DIV','POR','MOD'
%left 'POW' , 'RAIZ'
%right Umenos

// -------> Símbolo Inicial
%start inicio

%% // ------> Gramática
/* Definir las reglas de la gramática aquí */
inicio
    : instrucciones EOF  { $$ = $1; return $$;} 
;

instrucciones
    : instrucciones instruccion        {$$ = $1; $$.push($2);}
    | instruccion                     {$$ = []; $$.push($1);}

;

instruccion
    : echo          { $$ = $1; }
    | declaracion   { $$ = $1; }
    | instrif     	{$$ = $1}
    | Incremento_decremento { $$ = $1; }
    | for            { $$ = $1; }
    | asignacion     { $$ = $1; }
    | switch        { $$ = $1; }
    | transferencia         { $$ = $1; }
    | while          { $$ = $1; }
    | Loop           { $$ = $1; }
    | dountil        { $$ = $1; }
    | funcion      { $$ = $1; }    
    | metodos       { $$ = $1; }
    | llamadafuncion1 { $$ = $1; }
    | execute      { $$ = $1; }
    | error PYC { console.error('Error Sintactico: Se encontro el siguiente simbolo donde no se esperaba ' + yytext + ' - linea: ' + this._$.first_line + ' - columna: ' + this._$.first_column); errores.crearError("Error Sintactico: ","Se encontro el simbolo "+yytext+" donde no se esperaba",this._$.first_line,this._$.first_column); }
    | error LLAVEDER { console.error('Error Sintactico: Se encontro el siguiente simbolo donde no se esperaba  ' + yytext + ' - linea: ' + this._$.first_line + ' - columna: ' + this._$.first_column); errores.crearError("Error Sintactico: ","Se encontro el simbolo "+yytext+" donde no se esperaba",this._$.first_line,this._$.first_column); }
    ;

echo
: ECHO expresion PYC { $$ = new  Print($2, @1.first_line, @1.first_column) ;}
;

expresion
    : INT { $$ = new Dato($1, TipoDato.INT, @1.first_line, @1.first_column) ; } 
    | PARIZQ expresion PARDER { $$ = $2; }
    | DOUBLE { $$ = new Dato($1, TipoDato.DOUBLE, @1.first_line, @1.first_column) ; }
    | BOOL { $$ = new Dato($1, TipoDato.BOOLEAN, @1.first_line, @1.first_column) ; }
    | CHAR { $$ = new Dato($1.slice(1,-1), TipoDato.CHAR, @1.first_line, @1.first_column) ; }
    | NULL { $$ = new Dato($1, TipoDato.NULL, @1.first_line, @1.first_column) ; }
    | CADENA { console.log("Hola" + $1);let cadenayaprocesada = ProcesarSinEcape($1); $$ = new Dato(cadenayaprocesada.slice(1,-1), TipoDato.STRING, @1.first_line, @1.first_column) ; }
    // izq, op, der, fila, columna
    | expresion MAS expresion { $$ = new Aritmetica($1,$2,$3, @1.first_line,@1.first_column); }
    | expresion MENOS expresion { $$ = new Aritmetica($1,$2,$3, @1.first_line,@1.first_column); }
    | expresion POR expresion { $$ = new Aritmetica($1,$2,$3, @1.first_line,@1.first_column); }
    | expresion DIV expresion { $$ = new Aritmetica($1,$2,$3, @1.first_line,@1.first_column); }
    | expresion POW expresion { $$ = new Aritmetica($1,$2,$3, @1.first_line,@1.first_column); }
    | expresion RAIZ expresion { $$ = new Aritmetica($1,$2,$3, @1.first_line,@1.first_column); }
    | expresion MOD expresion { $$ = new Aritmetica($1,$2,$3, @1.first_line,@1.first_column); }
    | MENOS expresion %prec Umenos  { $$ = new Negativo($2, @1.first_line, @1.first_column);  }
    | expresion IGUALIGUAL expresion { $$ = new Relacionales($1,$2,$3, @1.first_line,@1.first_column); }
    | expresion DIFERENTE expresion { $$ = new Relacionales($1,$2,$3, @1.first_line,@1.first_column); }
    | expresion MENORIGUAL expresion { $$ = new Relacionales($1,$2,$3, @1.first_line,@1.first_column); }
    | expresion MAYORIGUAL expresion { $$ = new Relacionales($1,$2,$3, @1.first_line,@1.first_column); }
    | expresion MENOR expresion { $$ = new Relacionales($1,$2,$3, @1.first_line,@1.first_column); }
    | expresion MAYOR expresion { $$ = new Relacionales($1,$2,$3, @1.first_line,@1.first_column); }
    | expresion OR expresion { $$ = new Relacionales($1,$2,$3, @1.first_line,@1.first_column); }
    | expresion AND expresion { $$ = new Relacionales($1,$2,$3, @1.first_line,@1.first_column); }
    | NOT expresion { $$ = new Not($2, @1.first_line, @1.first_column); }
    | ptolower       { $$ = $1; }
    | pround         { $$ = $1; }
    | ptoupper       { $$ = $1; }
    | ptostring       { $$ = $1; }
    | ptruncate       { $$ = $1; }
    | length     { $$ = $1; }
    | pis            { $$ = $1; }
    | casteo         { $$ = $1; }
    | ID     { $$ = new Retorno_variable($1, @1.first_line, @1.first_column); }
    | ID CORCHETEIZQ expresion CORCHETEDER { $$ = new Retorno_variable($1, @1.first_line, @1.first_column, $3); }
    | ID CORCHETEIZQ expresion CORCHETEDER CORCHETEIZQ expresion CORCHETEDER { $$ = new Retorno_variable($1, @1.first_line, @1.first_column, $3,$6);}
    | ID CORCHETEIZQ CORCHETEDER { $$ = new Retorno_variable($1, @1.first_line, @1.first_column); }
    | llamadafuncion { $$ = $1; }
    | asignacion { $$ = $1; }
    ;

instrif
    : IF PARIZQ expresion PARDER LLAVEIZQ ins LLAVEDER
        {$$ = new If($3, $6, null, @1.first_line, @1.first_column);}
    | IF PARIZQ expresion PARDER LLAVEIZQ ins LLAVEDER ELSE LLAVEIZQ ins LLAVEDER
        {$$ = new If($3, $6, $10, @1.first_line, @1.first_column,true);}
    | IF PARIZQ expresion PARDER LLAVEIZQ ins LLAVEDER elseif
        {$$ = new If($3, $6, $8, @1.first_line, @1.first_column);}

    ;

ins
:instrucciones  { $$ = $1; }
| /* Nada */ { $$ = null; }
;

elseif
    : ELSE IF PARIZQ expresion PARDER LLAVEIZQ ins LLAVEDER elseif
        {$$ = [$4, $7].concat($9);}
    | ELSE IF PARIZQ expresion PARDER LLAVEIZQ ins LLAVEDER elseOpcional
        {$$ = [$4, $7, $9];}
    ;

elseOpcional
    : ELSE LLAVEIZQ ins LLAVEDER
        {$$ = $3;}
    | /* Nada */ { $$ = null; }
;

else
    : ELSE LLAVEIZQ ins LLAVEDER
        {$$ = $3;}
    ;

tipo
    : PDOUBLE    { $$ = TipoDato.DOUBLE; }
    | PCADENA    { $$ = TipoDato.STRING; }
    | PINT       { $$ = TipoDato.INT; }
    | PBOOLEAN   { $$ = TipoDato.BOOLEAN; }
    | PCHAR      { $$ = TipoDato.CHAR; }
;
ptolower
    : TOLOWER PARIZQ expresion PARDER { $$ = new Tolower($3, @1.first_line, @1.first_column); }
    ;   

ptoupper
    : TOUPPER PARIZQ expresion PARDER { $$ = new ToUpper($3, @1.first_line, @1.first_column); }
    ;

ptostring
    : TOSTRING PARIZQ expresion PARDER { $$ = new ToString($3, @1.first_line, @1.first_column); }
    ;

pround
    : ROUND PARIZQ expresion PARDER { $$ = new Round($3, @1.first_line, @1.first_column); }
    ;

ptruncate
    : TRUNCATE PARIZQ expresion PARDER { $$ = new Truncate($3, @1.first_line, @1.first_column); }
    ;

length
: ID PUNTO LENGTH PARIZQ PARDER     { $$ = new Length($1, @1.first_line, @1.first_column); }
| CADENA PUNTO LENGTH PARIZQ PARDER     { let cadenaQ = procesarsecuenciasdeescape($1); cadena2 = new Dato(cadenaQ.slice(1, -1), TipoDato.STRING, @1.first_line, @1.first_column); $$ = new Length(cadena2, @1.first_line, @1.first_column); }
| CORCHETEIZQ listavalores CORCHETEDER PUNTO LENGTH PARIZQ PARDER     { $$ = new Length($2, @1.first_line, @1.first_column,true); }
| CORCHETEIZQ CORCHETEIZQ listavalores CORCHETEDER COMA CORCHETEIZQ listavalores CORCHETEDER CORCHETEDER PUNTO LENGTH PARIZQ PARDER     { $$ = new Length($3.concat($7), @1.first_line, @1.first_column,true,true); }
| LENGTH PARIZQ ID PARDER { $$ = new Length($3, @1.first_line, @1.first_column); }
;

pis
    : expresion IS tipo { $$ = new Is($1,$3, @1.first_line, @1.first_column); }
    ;
// Aca tengo que arreglar esa mierda de ambiguedad
declaracion
    : LET ids DOSPUNTOS tipo IGUAL Pdeclaracion PYC { $$ = new Declarar($2, $4, $6, @1.first_line, @1.first_column,false,true); }
    | LET ids DOSPUNTOS tipo PYC { $$ = new Declarar($2, $4, null, @1.first_line, @1.first_column,false,true); }
    | CONST ids DOSPUNTOS tipo IGUAL Pdeclaracion PYC { $$ = new Declarar($2, $4, $6, @1.first_line, @1.first_column,false,false); }
    | CONST ids DOSPUNTOS tipo PYC { $$ = new Declarar($2, $4, null, @1.first_line, @1.first_column,false,false); }
    | LET ids DOSPUNTOS tipo CORCHETEIZQ CORCHETEDER IGUAL NEW VECTOR tipo CORCHETEIZQ expresion CORCHETEDER PYC { $$ = new Vector1_expresion($4, $2[0], $10,$12, @1.first_line, @1.first_column); }
    | LET ids DOSPUNTOS tipo CORCHETEIZQ CORCHETEDER IGUAL CORCHETEIZQ listavalores CORCHETEDER PYC {console.log("xd"); $$ = new Vector1_listado($4, $2[0], $9, @1.first_line, @1.first_column); }
    | LET ids DOSPUNTOS tipo CORCHETEIZQ CORCHETEDER CORCHETEIZQ CORCHETEDER IGUAL NEW VECTOR tipo CORCHETEIZQ expresion CORCHETEDER CORCHETEIZQ expresion CORCHETEDER PYC { $$ = new Vector2_expresion($6, $2[0], $12,$14,$17, @1.first_line, @1.first_column); }
    | LET ids DOSPUNTOS tipo CORCHETEIZQ CORCHETEDER CORCHETEIZQ CORCHETEDER IGUAL CORCHETEIZQ CORCHETEIZQ listavalores CORCHETEDER COMA CORCHETEIZQ listavalores CORCHETEDER CORCHETEDER PYC { $$ = new Vector2_listado($6, $2[0],$12,$16, @1.first_line, @1.first_column); }
;

Pdeclaracion
    :expresion      { $$ = $1; }

    ;

ids
    : ids COMA ID { $$ = $1; $$.push($3); }
    | ID { $$ = []; $$.push($1); }
;
casteo
    : CAST PARIZQ expresion AS tipo PARDER { $$ = new Casteos($3, $5, @1.first_line, @1.first_column); } 
    ;
Incremento_decremento
    : ID MASMAS PYC { $$ = new Incremento_decremento($1,"++", @1.first_line, @1.first_column);}
    | ID MENOSMENOS PYC {   $$ = new Incremento_decremento($1,"--", @1.first_line, @1.first_column); }
    ;

for
    : FOR PARIZQ varfor expresion PYC actualizacion PARDER LLAVEIZQ instrucciones LLAVEDER    { $$ = new For($3, $4, $6, $9, @1.first_line, @1.first_column); }
    ;

actualizacion   
    : ID MASMAS  { $$ = new Incremento_decremento($1,"++", @1.first_line, @1.first_column);}
    | ID MENOSMENOS  {   $$ = new Incremento_decremento($1,"--", @1.first_line, @1.first_column); }
    | asignacion   { $$ = $1; }
    ;

asignacion
    : ID IGUAL expresion PYC { $$ = new Asignacion($1, $3, @1.first_line, @1.first_column); }
    | ID CORCHETEIZQ expresion CORCHETEDER IGUAL expresion PYC  { $$ = new Asignacion($1, $6, @1.first_line, @1.first_column,$3); }
    | ID CORCHETEIZQ expresion CORCHETEDER CORCHETEIZQ expresion CORCHETEDER IGUAL expresion PYC { $$ = new Asignacion($1, $9, @1.first_line, @1.first_column,$3,$6); }
    ;

signos
    : PYC {}
    | /* Nada */ {}
    ;

varfor
: declaracion    { $$ = $1; }
| asignacion    { $$ = $1; }
;

switch
    : SWITCH PARIZQ expresion PARDER LLAVEIZQ cases LLAVEDER    { $$ = new Swich($3, $6, @1.first_line, @1.first_column); }
 
    ;

cases :  cases  case             { $$ = $1; $$.push($2); }
    | case               { $$ = []; $$.push($1); }
;


case : CASE expresion DOSPUNTOS inscase     { if($4.tipo == TipoInstr.BREAK){$$ = [$2, $4,true];}else{$$ = [$2, $4,false];}    } 
| DEFAULT DOSPUNTOS inscase     {         if($3.tipo == TipoInstr.BREAK){$$ = [null, $3,true];}else{$$ = [null, $3,false];}     }


;

inscase
: instrucciones  { $$ = $1; }
| /* Nada */        { let nada = ProcesarSinEcape(""); $$ = new Dato(nada.slice(1, -1), TipoDato.STRING, @1.first_line, @1.first_column); }
;

transferencia
: BREAK  PYC { $$ = new Break(@1.first_line, @1.first_column);}
| CONTINUE PYC   {  $$ = new Continue(@1.first_line, @1.first_column);}  
| RETURN expret PYC { $$ = new Return($2, @1.first_line, @1.first_column); }
| RETURN  PYC { $$ = new Return(null, @1.first_line, @1.first_column); }
;

expret
: expresion { $$ = $1; }
;

while
    : WHILE PARIZQ expresion PARDER LLAVEIZQ instrucciones LLAVEDER     { $$ = new While($3, $6, @1.first_line, @1.first_column); }
    ;

Loop
    : LOOP LLAVEIZQ instrucciones LLAVEDER     { $$ = new Loop($3, @1.first_line, @1.first_column); }
    ;

dountil
    : DO LLAVEIZQ instrucciones LLAVEDER UNTIL PARIZQ expresion PARDER PYC { $$ = new Do_Until($3, $7, @1.first_line, @1.first_column); }
    ;

listavalores 
    : listavalores COMA expresion { $$ = $1; $$.push($3); }
    | expresion { $$ = []; $$.push($1); }
    ;

metodos
: FUNCTION VOID ID PARIZQ parametros PARDER LLAVEIZQ instrucciones LLAVEDER { $$ = new DecFuncion($3, $2, $5, $8, @1.first_line, @1.first_column);    }
;

parametros
: parametros COMA dec2 { $$ = $1; $$.push($3);}
| dec2 { $$ = []; $$.push($1);}
;

dec2
: tipo ID { $$ = new Declarar($2, $1, null, @1.first_line, @1.first_column,true,true); }
| ID DOSPUNTOS tipo IGUAL expresion {console.log("Aca"); $$ = new Declarar($1, $3, $5, @1.first_line, @1.first_column,true,true); }
| ID DOSPUNTOS tipo {console.log("Sin inicializar"); $$ = new Declarar($1, $3, null, @1.first_line, @1.first_column,true,true); }
| tipo ID CORCHETEIZQ CORCHETEDER { $$ = new Declarar($2, $1, null, @1.first_line, @1.first_column,true,true); }
| /* Nada */          { $$ = null; }
;

funcion
: FUNCTION tipo ID PARIZQ parametros PARDER LLAVEIZQ  instrucciones LLAVEDER  { $$ = new DecFuncion($3, $2, $5, $8, @1.first_line, @1.first_column);}
;

llamadafuncion1
: ID PARIZQ parametros_llamada PARDER PYC { $$ = new CallFuncion($1, $3, @1.first_line, @1.first_column);}
;

llamadafuncion
: ID PARIZQ parametros_llamada PARDER  { $$ = new CallFuncion($1, $3, @1.first_line, @1.first_column);}
;

parametros_llamada
: parametros_llamada COMA paramxd { $$ = $1; $$.push($3); }
| paramxd { $$ = []; $$.push($1); }
| /* Nada */          { $$ = null; }
;

paramxd 
: ID IGUAL expresion { $$ = new Asignacion($1, $3, @1.first_line, @1.first_column); }
;
execute
	: EXECUTE llamadafuncion PYC  { $$ = new Execute($2, @1.first_line, @1.first_column); }
;
// Puedes seguir añadiendo tus reglas aquí
