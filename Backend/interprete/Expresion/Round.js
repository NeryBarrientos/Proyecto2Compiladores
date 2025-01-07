const { Expresion, TipoDato } = require("../Expresion");
const NodoAst = require('../simbolo/NodoAst');
const errores = require("../../analizador/utilidad/Errores.js");

class Round extends Expresion {

    constructor(valor, fila, columna) {
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.valor = valor;

    }

    interpretar(entorno) {
        this.valor.interpretar(entorno);



        if (this.valor.tipo == TipoDato.DOUBLE) {
            this.valor = Math.round(this.valor.valor).toFixed(1);
            this.tipo = TipoDato.DOUBLE;


            return this;
        } else {
            console.log("Error Semantico: Error de tipo al aplicar round")
            errores.crearError("Error Semántico: ", "Error de tipo al aplicar round", this.fila, this.columna);
            return this;
        }

    }


    getNodo() {
        try {
            let nodo = new NodoAst('ROUND');
            nodo.agregarHijo('ROUND');
            nodo.agregarHijo('(');
            nodo.agregarHijo(this.valor.toString());
            nodo.agregarHijo(')');
            nodo.agregarHijo(';');

            return nodo;
        }


        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('ROUND');
            nodo.agregarHijo("ERROR")
            return nodo;
        }
    }


}
module.exports = Round;