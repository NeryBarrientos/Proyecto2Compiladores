const { Instruccion, TipoInstr } = require("../Instruccion");
const { TipoSimbolo } = require("../Entorno/Simbolo");
const { TipoDato } = require("../Expresion");
const Dato = require('../Expresion/Dato.js');
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');
const simbolos = require('../../analizador/utilidad/Simbolos.js');

class Vector1_listado extends Instruccion {
    constructor(tipo1, id, expresion, fila, columna, final = "") {
        super(TipoInstr.DECLARAR, fila, columna);
        this.tipo1 = tipo1;
        this.id = id;
        this.expresion = expresion;
        this.final = final;
    }

    interpretar(entorno) {

        const valores = this.expresion.map(exp => exp.interpretar(entorno).valor);


        const tipoDato = typeof valores[0];
        if (valores.every(val => typeof val === tipoDato)) {

            this.final = valores;
            entorno.addSimbolo(this.id, valores, this.tipo1, TipoSimbolo.VARIABLE, this.fila, this.columna);
            simbolos.crearSimbolo(this.id, "VECTOR 1D", this.tipo1, entorno.nombre, this.fila, this.columna);

        } else {
            console.log("Error semántico: Los tipos de datos del vector no coinciden.");
            errores.crearError("Error Semántico: ", " Los tipos de datos del vector no coinciden", this.fila, this.columna);
        }
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

            nodo.agregarHijo('[');
            nodo.agregarHijo(this.final.toString());
            nodo.agregarHijo(']');
            nodo.agregarHijo(';');

            return nodo;
        } catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('DECLARAR VECTOR');
            nodo.agregarHijo("ERROR")
            return nodo;
        }
    }
}

module.exports = Vector1_listado;

