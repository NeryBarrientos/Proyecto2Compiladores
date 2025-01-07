const { Expresion, TipoDato } = require("../Expresion");
const NodoAst = require('../simbolo/NodoAst');
const errores = require("../../analizador/utilidad/Errores.js");

class Casteos extends Expresion {

    constructor(valor, tipo, fila, columna) {
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.valor = valor;
        this.tipo = tipo;

    }

    interpretar(entorno) {
        this.valor.interpretar(entorno);


        if (this.valor.tipo == TipoDato.INT) {
            if (this.tipo == TipoDato.DOUBLE) {

                this.valor = parseFloat(this.valor.valor).toFixed(1);
            } else if (this.tipo == TipoDato.STRING) {

                this.valor = String(this.valor.valor);
            } else if (this.tipo == TipoDato.CHAR) {

                this.valor = String.fromCharCode(this.valor.valor);
            } else {
                console.log("Error Semantico: Error de tipo al Castear un INT")
                errores.crearError("Error Semántico: ", "Error de tipo al Castear un INT", this.fila, this.columna);
            }


        } else if (this.valor.tipo == TipoDato.DOUBLE) {
            if (this.tipo == TipoDato.INT) {

                this.valor = parseInt(this.valor.valor);
            } else if (this.tipo == TipoDato.STRING) {

                this.valor = String(this.valor.valor);
            } else {
                console.log("Error Semantico: Error de tipo al Castear un DOUBLE")
                errores.crearError("Error Semántico: ", "Error de tipo al Castear un DOUBLE", this.fila, this.columna);
            }
        } else if (this.valor.tipo == TipoDato.CHAR) {
            if (this.tipo == TipoDato.INT) {

                this.valor = parseInt(this.valor.valor.charCodeAt(0));
            } else if (this.tipo == TipoDato.DOUBLE) {

                this.valor = parseFloat(this.valor.valor.charCodeAt(0)).toFixed(1);
            } else {
                console.log("Error Semantico: Error de tipo al Castear un CHAR")
                errores.crearError("Error Semántico: ", "Error de tipo al Castear un CHAR", this.fila, this.columna);
            }
        } else {
            console.log("Error Semantico: Error de tipo al Castear")
            errores.crearError("Error Semántico: ", "Error de tipo al Castear", this.fila, this.columna);
        }

        return this;
    }

    getNodo() {
        try {
            let nodo = new NodoAst('CASTEO');
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.tipo);
            nodo.agregarHijo(")");

            nodo.agregarHijo(this.valor.toString());


            return nodo;
        }


        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('CASTEO');
            nodo.agregarHijo("ERROR")
            return nodo;
        }
    }

}
module.exports = Casteos;