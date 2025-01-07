const { Expresion } = require("../Expresion.js")
const NodoAst = require('../simbolo/NodoAst.js');
const errores = require("../../analizador/utilidad/Errores.js");

class Funcion {
    constructor(nombre, retorno, parametros, instrucciones, tipo, fila, columna) {
        this.retorno = retorno;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.nombre = nombre;
    }


    getNodo() {
    }



}


module.exports = Funcion;