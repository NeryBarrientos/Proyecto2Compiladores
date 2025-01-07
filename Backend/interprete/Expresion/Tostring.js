const { Expresion, TipoDato } = require("../Expresion");
const NodoAst = require('../simbolo/NodoAst');
const errores = require("../../analizador/utilidad/Errores.js");

class Tostring extends Expresion {

    constructor(exp, fila, columna) {
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.exp = exp;

    }

    interpretar(entorno) {
        this.exp.interpretar(entorno);


        if (this.exp.tipo != TipoDato.ERROR && (this.exp.tipo == TipoDato.INT || this.exp.tipo == TipoDato.BOOLEAN)) {
            // console.log("prueba");
            this.valor = this.exp.valor.toString();
            this.tipo = TipoDato.STRING;

        } else {
            console.log("Error Semantico: Error de tipo al aplicar tostring")
            errores.crearError("Error Semántico: ", "Error de tipo al aplicar tostring", this.fila, this.columna);
            return this;
        }

        return this;
    }


    getNodo() {
        try {
            let nodo = new NodoAst('TOSTRING');
            nodo.agregarHijo('std::toString');
            nodo.agregarHijo('(');
            nodo.agregarHijo(this.exp.valor.toString());
            nodo.agregarHijo(')');
            nodo.agregarHijo(';');
            return nodo;
        }


        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('TOSTRING');
            nodo.agregarHijo("ERROR")
            return nodo;
        }
    }


}

module.exports = Tostring;