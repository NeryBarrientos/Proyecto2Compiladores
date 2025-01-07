const { Instruccion, TipoInstr } = require("../Instruccion");
const { TipoSimbolo } = require("../Entorno/Simbolo");
const { TipoDato } = require("../Expresion");
const Dato = require('../Expresion/Dato.js');
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');
const simbolos = require('../../analizador/utilidad/Simbolos.js');

class Declarar extends Instruccion {
    constructor(id, tipo, expresion, fila, columna, unica = true, modificable) {
        super(TipoInstr.DECLARAR, fila, columna);
        this.expresion = expresion;
        this.id = id;
        this.tipo = tipo;
        this.unica = unica;
        this.modificable = modificable;
    }
    interpretar(entorno) {
        console.log("entro a declarar");
        if (this.expresion) {
            console.log("entro a expresion");
            this.expresion.interpretar(entorno);

            if (this.expresion.tipo != this.tipo) {

                console.log("Error semántico: Error de tipo de dato en declaración de variable");
                errores.crearError("Error Semántico: ", "Error de tipo de dato en declaración de variable " + this.id, this.fila, this.columna);
                return this;
            }
        } else {
            console.log("No tiene valor inicializado");

            switch (this.tipo) {
                case TipoDato.INT:
                    this.expresion = new Dato(0, TipoDato.INT, this.fila, this.columna);
                    break;
                case TipoDato.DOUBLE:
                    this.expresion = new Dato(0.0, TipoDato.DOUBLE, this.fila, this.columna);
                    break;
                case TipoDato.BOOLEAN:
                    this.expresion = new Dato(true, TipoDato.BOOLEAN, this.fila, this.columna);
                    break;
                case TipoDato.STRING:
                    this.expresion = new Dato("", TipoDato.STRING, this.fila, this.columna);
                    break;
                case TipoDato.CHAR:
                    this.expresion = new Dato("\u0000", TipoDato.CHAR, this.fila, this.columna);
                    break;
                default:
                    console.log("Error Semantico : Tipo de dato no reconocido");
                    errores.crearError("Error Semántico: ", "Tipo de dato no reconocido" + this.id, this.fila, this.columna);
                    return this;
            }
        }

        if (this.unica == true) {


            simbolos.crearSimbolo(this.id, "VARIABLE", this.tipo, entorno.nombre, this.fila, this.columna);

            entorno.addSimbolo(this.id, this.expresion, this.tipo, TipoSimbolo.VARIABLE, this.fila, this.columna, this.modificable);
        } else {
            console.log("no unica")
            for (let i = 0; i < this.id.length; i++) {
                let id = this.id[i];

                simbolos.crearSimbolo(id, "VARIABLE", this.tipo, entorno.nombre, this.fila, this.columna);
                entorno.addSimbolo(id, this.expresion, this.tipo, TipoSimbolo.VARIABLE, this.fila, this.columna, this.modificable);


            }
        }


        return this;
    }

    getNodo() {

        try {
            let nodo = new NodoAst('DECLARACION');
            let tipoD = ";";
            if (this.tipo == TipoDato.INT) {
                nodo.agregarHijo('int');
                tipoD = "int";
            }
            else if (this.tipo == TipoDato.STRING) {
                nodo.agregarHijo('STRING');
                tipoD = "STRING";
            }
            else if (this.tipo == TipoDato.DOUBLE) {
                nodo.agregarHijo('double');
                tipoD = "double";
            }
            else if (this.tipo == TipoDato.CHAR) {
                nodo.agregarHijo('char');
                tipoD = "char";
            }
            else if (this.tipo == TipoDato.BOOLEAN) {
                nodo.agregarHijo('boolean');
                tipoD = "boolean";
            }
            if (this.unica == true) {
                nodo.agregarHijo(this.id);
            } else {
                for (let i = 0; i < this.id.length; i++) {
                    let id = this.id[i];
                    nodo.agregarHijo(id);
                }
            }

            nodo.agregarHijo('=');
            if (this.expresion != null) {
                nodo.agregarHijoAST(this.expresion.getNodo());
            }


            nodo.agregarHijo(';');
            return nodo;

        }

        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('DECLARACION');
            nodo.agregarHijo("ERROR")
            return nodo;
        }


    }






}

module.exports = Declarar;
