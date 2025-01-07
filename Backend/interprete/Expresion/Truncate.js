const { Expresion, TipoDato } = require("../Expresion");
const NodoAst = require('../simbolo/NodoAst');
const errores = require("../../analizador/utilidad/Errores.js");

class Truncate extends Expresion {

    constructor(valor, fila, columna) {
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.valor = valor;

    }

    interpretar(entorno) {
        this.valor.interpretar(entorno);



        if (this.valor.tipo == TipoDato.DOUBLE) {
            this.valor = Math.trunc(this.valor.valor);
            this.tipo = TipoDato.INT;


            return this;
        } else {
            console.log("Error Semantico: Error de tipo al aplicar Truncate")
            errores.crearError("Error Semántico: ", "Error de tipo al aplicar Truncate", this.fila, this.columna);
            return this;
        }

    }


    getNodo() {
        try {
            let nodo = new NodoAst('Truncate');
            nodo.agregarHijo('Truncate');
            nodo.agregarHijo('(');
            nodo.agregarHijo(this.valor.toString());
            nodo.agregarHijo(')');
            nodo.agregarHijo(';');

            return nodo;
        }


        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('Truncate');
            nodo.agregarHijo("ERROR")
            return nodo;
        }
    }


}
module.exports = Truncate;