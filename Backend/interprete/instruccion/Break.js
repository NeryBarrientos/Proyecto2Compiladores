const { Instruccion, TipoInstr } = require("../Instruccion");
const { TipoSimbolo } = require("../Entorno/Simbolo");
const { TipoDato } = require("../Expresion");
const Dato = require('../Expresion/Dato.js');
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');

class Break extends Instruccion {
    constructor(fila, columna) {
        super(TipoInstr.BREAK, fila, columna);
    }

    interpretar(entorno) {
        if (global.ciclo == true) {
            this.tipo = TipoInstr.BREAK;
            global.break = true;
            return this;
        } else {
            this.tipo = TipoInstr.BREAK;
            global.break = false;
            return this;
        }
    }

    getNodo() {
        try {
            let nodo = new NodoAst('BREAK');
            nodo.agregarHijo("break");
            nodo.agregarHijo(";");
            return nodo;
        }


        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('BREAK');
            nodo.agregarHijo("ERROR")
            return nodo;
        }

    }


}
module.exports = Break;