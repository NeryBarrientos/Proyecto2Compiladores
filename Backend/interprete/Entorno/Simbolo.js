class Simbolo{
    constructor(nombre, valor, tipo, tipoVar, fila, columna,modificable){
        this.nombre = nombre;
        this.valor = valor;
        this.tipo = tipo;
        this.tipoVar = tipoVar;
        this.fila = fila;
        this.columna = columna;
        this.modificable = modificable;
    }
}

const TipoSimbolo = {
    VARIABLE: 'VARIABLE',
    ARREGLO: 'ARREGLO',
    FUNCION: 'FUNCION'
}

module.exports = {Simbolo, TipoSimbolo};