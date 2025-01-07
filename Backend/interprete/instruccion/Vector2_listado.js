const { Instruccion, TipoInstr } = require("../Instruccion");
const { TipoSimbolo } = require("../entorno/Simbolo");
const { TipoDato } = require("../Expresion");
const Dato = require('../Expresion/Dato.js');
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');
const simbolos = require('../../analizador/utilidad/Simbolos.js');

class Matriz2 extends Instruccion {
    constructor(tipo, id, expresion1, expresion2, fila, columna, final = "") {
        super(TipoInstr.DECLARAR, fila, columna);
        this.tipo = tipo;
        this.id = id;
        this.expresion1 = expresion1;
        this.expresion2 = expresion2;
        this.final = final;
    }

    interpretar(entorno) {

        const valores1 = this.expresion1.map(exp => exp.interpretar(entorno).valor);
        const valores2 = this.expresion2.map(exp => exp.interpretar(entorno).valor);



        const matriz2dimensiones = [];
        matriz2dimensiones.push(valores1)
        matriz2dimensiones.push(valores2)

        this.final = matriz2dimensiones;

        entorno.addSimbolo(this.id, matriz2dimensiones, this.tipo, TipoSimbolo.VARIABLE, this.fila, this.columna);
        simbolos.crearSimbolo(this.id, "VECTOR 2D", this.tipo, entorno.nombre, this.fila, this.columna);

        return this;
    }


    getNodo() {
        try {
            let nodo = new NodoAst('DECLARAR VECTOR 2D');

            nodo.agregarHijo(this.tipo);
            nodo.agregarHijo(this.id);
            nodo.agregarHijo('[');
            nodo.agregarHijo(']');
            nodo.agregarHijo('[');
            nodo.agregarHijo(']');
            nodo.agregarHijo('=');
            nodo.agregarHijo('[');
            nodo.agregarHijo('[');
            nodo.agregarHijo(this.final[0].toString());
            nodo.agregarHijo(']');
            nodo.agregarHijo(',');
            nodo.agregarHijo('[');
            nodo.agregarHijo(this.final[1].toString());
            nodo.agregarHijo(']');
            nodo.agregarHijo(']')


            nodo.agregarHijo(';');

            return nodo;
        }




        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('DECLARAR VECTOR 2D');
            nodo.agregarHijo("ERROR")
            return nodo;
        }





    }







}

module.exports = Matriz2;
