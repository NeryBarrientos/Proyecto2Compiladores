const { Instruccion, TipoInstr } = require("../Instruccion");
const { TipoSimbolo } = require("../Entorno/Simbolo");
const { TipoDato } = require("../Expresion");
const Dato = require('../Expresion/Dato.js');
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');
const simbolos = require('../../analizador/utilidad/Simbolos.js');
const Funcion = require("./Funcion.js");

class Execute extends Instruccion {
    constructor(callfuncion, fila, columna) {
        super(TipoInstr.EXECUTE, fila, columna);
        this.callfuncion = callfuncion;
    }

    interpretar(entorno) {
        this.callfuncion.interpretar(entorno);
        return this;
    }

    getnodo() {
        try {
            let nodo = new NodoAst("EXECUTE");
            nodo.agregarHijo("execute");
            nodo.agregarHijoAST(this.callfuncion.getnodo());
            return nodo;
        }


        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('EXECUTE');
            nodo.agregarHijo("ERROR")
            return nodo;
        }
    }

}

module.exports = Execute;