class Instruccion{
    constructor(tipo, fila, columna){
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno){}

    getNodo() {

    }


}

const TipoInstr = {
    LOOP: 'LOOP',
    PRINT: 'PRINT',
    IF: 'IF',
    DECLARAR: 'DECLARAR',
    SWITCH: 'SWITCH',
    WHILE: 'WHILE',
    FOR: 'FOR',
    VALIDACIONFOR: 'VALIDACIONFOR',
    ASIGNACION: 'ASIGNACION',
    INCREMENTO_DECREMENTO: 'INCREMENTO_DECREMENTO',
    RETURN: 'RETURN',
    BREAK: 'BREAK',
    CONTINUE: 'CONTINUE',
    DO_UNTIL: 'DO_UNTIL',
    DecFuncion: 'DecFuncion',
    EXECUTE: 'EXECUTE',
    FUNCION: 'FUNCION',
}

module.exports = {Instruccion, TipoInstr}