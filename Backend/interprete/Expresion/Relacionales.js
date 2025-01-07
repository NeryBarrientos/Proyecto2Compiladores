
const { Expresion, TipoDato } = require("../Expresion");
const NodoAst = require('../simbolo/NodoAst');
const errores = require("../../analizador/utilidad/Errores.js");

class Relacionales extends Expresion {

    constructor(izq, op, der, fila, columna) {
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.izq = izq;
        this.der = der;
        this.op = op;
    }

    interpretar(entorno) {
        this.izq.interpretar(entorno);
        this.der.interpretar(entorno);

        if (this.op == "==") {
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor == this.der.valor;
                // console.log("entro a == int int");
                return this;
            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.DOUBLE) {
                this.izq.valor = parseFloat(this.izq.valor);
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor == this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor == this.der.valor;

                return this;

            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor == this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.INT) {
                this.der.valor = parseFloat(this.der.valor);
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor == this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor == this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.der.valor = parseFloat(this.der.valor);
                this.valor = this.izq.valor == this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor == this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.valor = this.izq.valor == this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.izq.valor = parseFloat(this.izq.valor);
                this.valor = this.izq.valor == this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor == this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor == this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor == this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor == this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.BOOLEAN) {
                if (this.der.valor == true) {
                    this.der.valor = true;
                }
                else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true) {
                    this.izq.valor = true;
                }
                else {
                    this.izq.valor = false;
                }
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor == this.der.valor;

                return this;
            }
            if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.NULL) {
                if (this.der.valor == true) {
                    this.der.valor = true;
                }
                else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true) {
                    this.izq.valor = true;
                }
                else {
                    this.izq.valor = false;
                }
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor == this.der.valor;

                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor == this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor == this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor == this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor === this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.BOOLEAN) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor == this.der.valor;
                return this;
            }
            else {

                console.log("Error semantico: Error tipo de dato en la operacion relacional == ")
                errores.crearError("Error Semántico: ", "Error tipo de dato en la operacion relacional == ", this.fila, this.columna);
                return this;
            }
        }

        if (this.op == "!=") {
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.DOUBLE) {
                this.izq.valor = parseFloat(this.izq.valor);
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.NULL) {
                this.der.valor = null;
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.INT) {
                this.der.valor = parseFloat(this.der.valor);
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.der.valor = parseFloat(this.der.valor);
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.NULL) {
                this.der.valor = null;
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.izq.valor = parseFloat(this.izq.valor);
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.NULL) {
                this.der.valor = null;
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.NULL) {
                this.der.valor = null;
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.BOOLEAN) {
                if (this.der.valor == true) {
                    this.der.valor = true;
                }
                else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true) {
                    this.izq.valor = true;
                }
                else {
                    this.izq.valor = false;
                }
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor != this.der.valor;

                return this;
            }
            if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.NULL) {
                if (this.der.valor == true) {
                    this.der.valor = true;
                }
                else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true) {
                    this.izq.valor = true;
                }
                else {
                    this.izq.valor = false;
                }
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor != this.der.valor;

                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.der.valor = null;
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.BOOLEAN) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor != this.der.valor;
                return this;
            }
            else {

                console.log("Error semantico: Error tipo de dato en la operacion relacional == ")
                errores.crearError("Error Semántico: ", "Error tipo de dato en la operacion relacional == ", this.fila, this.columna);
                return this;
            }
        }
        if (this.op == "<") {
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = Number(this.izq.valor);
                this.der.valor = Number(this.der.valor);
                this.valor = this.izq.valor < this.der.valor;
                console.log("entro a < int int");
                console.log(this.izq.valor)
                console.log(this.der.valor)
                console.log(this.izq.valor < this.der.valor)
                return this;
            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.DOUBLE) {
                this.izq.valor = parseFloat(this.izq.valor);
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor < this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor < this.der.valor;

                return this;

            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor < this.der.valor
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.INT) {
                this.der.valor = parseFloat(this.der.valor);
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor < this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = parseFloat(this.izq.valor);
                this.der.valor = parseFloat(this.der.valor);
                this.valor = this.izq.valor < this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.der.valor = parseFloat(this.der.valor);
                this.valor = this.izq.valor < this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor < this.der.valor
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.valor = this.izq.valor < this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.izq.valor = parseFloat(this.izq.valor);
                this.valor = this.izq.valor < this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor < this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.valor = this.izq.valor < this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor < this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor < this.der.valor
                return this;
            }
            if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.BOOLEAN) {
                if (this.der.valor == true) {
                    this.der.valor = true;
                }
                else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true) {
                    this.izq.valor = true;
                }
                else {
                    this.izq.valor = false;
                }
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor < this.der.valor;

                return this;
            }
            if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.NULL) {
                if (this.der.valor == true) {
                    this.der.valor = true;
                }
                else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true) {
                    this.izq.valor = true;
                }
                else {
                    this.izq.valor = false;
                }
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor < this.der.valor;

                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.der.valor = null;
                this.valor = this.izq.valor < this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor < this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor < this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor < this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor < this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.BOOLEAN) {
                if (this.der.valor == true) {
                    this.der.valor = true;
                }
                else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true) {
                    this.izq.valor = true;
                }
                else {
                    this.izq.valor = false;
                }
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor < this.der.valor;

                return this;
            }
            else {

                console.log("Error semantico: Error tipo de dato en la operacion relacional == ")
                errores.crearError("Error Semántico: ", "Error tipo de dato en la operacion relacional == ", this.fila, this.columna);
                return this;
            }
        }
        if (this.op == "<=") {
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = parseInt(this.izq.valor);
                this.der.valor = parseInt(this.der.valor);
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.DOUBLE) {
                this.izq.valor = parseFloat(this.izq.valor);
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor <= this.der.valor;

                return this;

            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.INT) {
                this.der.valor = parseFloat(this.der.valor);
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = parseFloat(this.izq.valor);
                this.der.valor = parseFloat(this.der.valor);
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.der.valor = parseFloat(this.der.valor);
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.izq.valor = parseFloat(this.izq.valor);
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.BOOLEAN) {
                if (this.der.valor == true) {
                    this.der.valor = true;
                }
                else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true) {
                    this.izq.valor = true;
                }
                else {
                    this.izq.valor = false;
                }
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor <= this.der.valor;

                return this;
            }
            if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.NULL) {
                if (this.izq.valor == true) {
                    this.izq.valor = true;
                }
                else {
                    this.izq.valor = false;
                }
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor <= this.der.valor;

                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.der.valor = null;
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor <= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.BOOLEAN) {
                if (this.der.valor == true) {
                    this.der.valor = true;
                }
                else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true) {
                    this.izq.valor = true;
                }
                else {
                    this.izq.valor = false;
                }
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor < this.der.valor;

                return this;
            }
            else {

                console.log("Error semantico: Error tipo de dato en la operacion relacional == ")
                errores.crearError("Error Semántico: ", "Error tipo de dato en la operacion relacional == ", this.fila, this.columna);
                return this;
            }
        }
        if (this.op == ">") {
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = parseInt(this.izq.valor);
                this.der.valor = parseInt(this.der.valor);
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.DOUBLE) {
                this.izq.valor = parseFloat(this.izq.valor);
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor > this.der.valor;

                return this;

            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.INT) {
                this.der.valor = parseFloat(this.der.valor);
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = parseFloat(this.izq.valor);
                this.der.valor = parseFloat(this.der.valor);
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.der.valor = parseFloat(this.der.valor);
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.izq.valor = parseFloat(this.izq.valor);
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.BOOLEAN) {
                if (this.der.valor == true) {
                    this.der.valor = true;
                }
                else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true) {
                    this.izq.valor = true;
                }
                else {
                    this.izq.valor = false;
                }
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor > this.der.valor;

                return this;
            }
            if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.NULL) {
                if (this.der.valor == true) {
                    this.der.valor = true;
                }
                else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true) {
                    this.izq.valor = true;
                }
                else {
                    this.izq.valor = false;
                }
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor > this.der.valor;

                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.der.valor = null;
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor > this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.BOOLEAN) {
                if (this.der.valor == true) {
                    this.der.valor = true;
                }
                else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true) {
                    this.izq.valor = true;
                }
                else {
                    this.izq.valor = false;
                }
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor > this.der.valor;

                return this;
            }
            else {

                console.log("Error semantico: Error tipo de dato en la operacion relacional == ")
                errores.crearError("Error Semántico: ", "Error tipo de dato en la operacion relacional == ", this.fila, this.columna);
                return this;
            }
        }
        if (this.op == ">=") {
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = parseInt(this.izq.valor);
                this.der.valor = parseInt(this.der.valor);
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.DOUBLE) {
                this.izq.valor = parseFloat(this.izq.valor);
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor >= this.der.valor;

                return this;

            }
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.INT) {
                this.der.valor = parseFloat(this.der.valor);
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = parseFloat(this.izq.valor);
                this.der.valor = parseFloat(this.der.valor);
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.der.valor = parseFloat(this.der.valor);
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.izq.valor = parseFloat(this.izq.valor);
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.izq.valor = this.izq.valor.charCodeAt(0);
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.BOOLEAN) {
                if (this.der.valor == true) {
                    this.der.valor = true;
                }
                else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true) {
                    this.izq.valor = true;
                }
                else {
                    this.izq.valor = false;
                }
                this.tipo = TipoDato.BOOLEAN;
                this.valor = this.izq.valor >= this.der.valor;

                return this;
            }
            if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.NULL) {
                if (this.der.valor == true) {
                    this.der.valor = true;
                }
                else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true) {
                    this.izq.valor = true;
                }
                else {
                    this.izq.valor = false;
                }
                this.tipo = TipoDato.BOOLEAN;
                this.der.valor = null;
                this.valor = this.izq.valor >= this.der.valor;

                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.NULL) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.der.valor = null;
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.INT) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor >= this.der.valor;
                return this;
            }
            if (this.izq.tipo == TipoDato.NULL && this.der.tipo == TipoDato.BOOLEAN) {
                if (this.der.valor == true) {
                    this.der.valor = true;
                }
                else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true) {
                    this.izq.valor = true;
                }
                else {
                    this.izq.valor = false;
                }
                this.tipo = TipoDato.BOOLEAN;
                this.izq.valor = null;
                this.valor = this.izq.valor >= this.der.valor;

                return this;
            }
            else {

                console.log("Error semantico: Error tipo de dato en la operacion relacional == ")
                errores.crearError("Error Semántico: ", "Error tipo de dato en la operacion relacional == ", this.fila, this.columna);
                return this;
            }
        }

        if (this.op == "||") {
            if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.BOOLEAN) {
                this.tipo = TipoDato.BOOLEAN;
                if (this.der.valor == true || this.der.valor == "true") {
                    this.der.valor = true;
                } else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true || this.izq.valor == "true") {
                    this.izq.valor = true;
                } else { 
                    this.izq.valor = false;
                }
                console.log("Empieza el or")
                console.log(this.izq.valor)
                console.log(this.der.valor)
                this.valor = this.izq.valor || this.der.valor;
                console.log(this.valor)
                console.log("Termina el or")
                return this;
            }
            else {
                console.log("Error semantico: Error tipo de dato en la operacion relacional ||")
                errores.crearError("Error Semántico: ", "Error tipo de dato en la operacion relacional ||", this.fila, this.columna);
                return this;
            }
        }

        if (this.op == "&&") {
            if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.BOOLEAN) {
                this.tipo = TipoDato.BOOLEAN;
                if (this.der.valor == true || this.der.valor == "true") {
                    this.der.valor = true;
                } else {
                    this.der.valor = false;
                }
                if (this.izq.valor == true || this.izq.valor == "true") {
                    this.izq.valor = true;
                } else { 
                    this.izq.valor = false;
                }
                console.log("Empieza el and")
                console.log(this.izq.valor)
                console.log(this.der.valor)
                this.valor = this.izq.valor && this.der.valor;
                console.log(this.valor)
                console.log("Termina el and")
                return this;
            }
            else {

                console.log("Error semantico: Error tipo de dato en la operacion relacional &&")
                errores.crearError("Error Semántico: ", "Error tipo de dato en la operacion relacional &&", this.fila, this.columna);
                return this;
            }
        }
    }

    getNodo() {
        try {
            let nodo = new NodoAst('RELACIONAL');
            nodo.agregarHijoAST(this.izq.getNodo());

            switch (this.op) {
                case "==":
                    nodo.agregarHijo('==');
                    break;
                case "!=":
                    nodo.agregarHijo('!=');
                    break;
                case "<":
                    nodo.agregarHijo('<');
                    break;
                case "<=":
                    nodo.agregarHijo('<=');
                    break;
                case ">":
                    nodo.agregarHijo('>');
                    break;
                case ">=":
                    nodo.agregarHijo('>=');
                    break;
                case "||":
                    nodo.agregarHijo('||');
                    break;
                case "&&":
                    nodo.agregarHijo('&&');
                    break;
                default:
                    break;
            }

            nodo.agregarHijoAST(this.der.getNodo());
            return nodo;
        }


        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('RELACIONAL');
            nodo.agregarHijo("ERROR")
            return nodo;
        }


    }


}
module.exports = Relacionales;