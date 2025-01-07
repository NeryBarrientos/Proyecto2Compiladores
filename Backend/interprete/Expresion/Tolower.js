const { Expresion, TipoDato } = require("../Expresion");
const NodoAst = require('../simbolo/NodoAst');
const errores = require("../../analizador/utilidad/Errores.js");

class Tolower extends Expresion {

    constructor(valor, fila, columna) {
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.valor = valor;

    }

    interpretar(entorno) {
        this.valor.interpretar(entorno);


        if (this.valor.tipo == TipoDato.STRING) {
            this.valor = this.valor.valor.toLowerCase();
            this.tipo = TipoDato.STRING;

        } else {
            console.log("Error Semantico: Error de tipo al aplicar tolower")
            errores.crearError("Error Semántico: ", "Error de tipo al aplicar tolower", this.fila, this.columna);
            return this;
        }

        return this;
    }

    getNodo() {

        try {
            let nodo = new NodoAst('TOLOWER');
            nodo.agregarHijo('tolower');
            nodo.agregarHijo('(');
            nodo.agregarHijo(this.valor.toString());
            nodo.agregarHijo(')');
            nodo.agregarHijo(';');
            return nodo;
        }


        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('TOLOWER');
            nodo.agregarHijo("ERROR")
            return nodo;
        }
    }



}

module.exports = Tolower;   