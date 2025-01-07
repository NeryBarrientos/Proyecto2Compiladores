const { Instruccion, TipoInstr } = require("../Instruccion");
const { TipoSimbolo } = require("../entorno/Simbolo");
const { TipoDato } = require("../Expresion");
const Dato = require('../Expresion/Dato.js');
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');
const simbolos = require('../../analizador/utilidad/Simbolos.js');

class Vector1_expresion extends Instruccion {
    constructor(tipo1, id, tipo2, expresion, fila, columna, final = "") {
        super(TipoInstr.DECLARAR, fila, columna);
        this.tipo1 = tipo1;
        this.id = id;
        this.tipo2 = tipo2;
        this.expresion = expresion;
        this.final = final;

    }

    interpretar(entorno) {

        if (this.tipo1 != this.tipo2 && this.tipo1 != this.expresion.tipo && this.tipo2 != this.expresion.tipo) {
            console.log("Error semántico: Los tipos de datos del vector no coinciden.");
            errores.crearError("Error Semántico: ", "Los tipos de datos del vector no coinciden", this.fila, this.columna);
            return this;
        }

        let tamañoVector = this.expresion.interpretar(entorno).valor;


        let vector = new Array(tamañoVector);


        let valorPredeterminado;
        switch (this.tipo2) {
            case TipoDato.INT:
                valorPredeterminado = 0;
                break;
            case TipoDato.DOUBLE:
                valorPredeterminado = 0.0;
                break;
            case TipoDato.CHAR:
                valorPredeterminado = '\u0000';
                break;
            case TipoDato.BOOLEAN:
                valorPredeterminado = true;
                break;
            case TipoDato.CADENA:
                valorPredeterminado = "";
                break;
            default:
                console.log("Error Semantico: Tipo de dato no reconocido");
                errores.crearError("Error Semántico: ", " Tipo de dato no reconocido en declaracion de Vector", this.fila, this.columna);
                return this;
        }


        vector.fill(valorPredeterminado);
        this.final = vector;

        entorno.addSimbolo(this.id, vector, this.tipo1, TipoSimbolo.VARIABLE, this.fila, this.columna);
        simbolos.crearSimbolo(this.id, "VECTOR 1D", this.tipo1, entorno.nombre, this.fila, this.columna);
        console.log(vector)
        return this;

    }


    getNodo() {


        try {
            let nodo = new NodoAst('DECLARAR VECTOR');

            nodo.agregarHijo(this.tipo1);
            nodo.agregarHijo(this.id);
            nodo.agregarHijo('[');
            nodo.agregarHijo(']');
            nodo.agregarHijo('=');
            nodo.agregarHijo('NEW');
            nodo.agregarHijo(this.tipo2);
            nodo.agregarHijo('[');
            nodo.agregarHijo(this.final.toString());
            nodo.agregarHijo(']');
            nodo.agregarHijo(';');

            return nodo;
        }


        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('DECLARAR VECTOR');
            nodo.agregarHijo("ERROR")
            return nodo;
        }

    }
}


module.exports = Vector1_expresion;


