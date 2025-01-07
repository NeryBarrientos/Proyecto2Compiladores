class Expresion{

    constructor(valor, tipo, fila, columna){
        this.valor = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno){}

    getNodo() {

    }


}

const TipoDato = {
    INT: 'INT',
    DOUBLE: 'DOUBLE',
    BOOLEAN: 'BOOLEAN',
    CHAR: 'CHAR',
    STRING: 'STRING',
    NULL: 'NULL',
    ERROR: 'ERROR'
}

module.exports = {Expresion, TipoDato}