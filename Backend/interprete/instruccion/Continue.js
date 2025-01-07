const { Instruccion, TipoInstr } = require("../Instruccion");
const { TipoSimbolo } = require("../Entorno/Simbolo");
const { TipoDato } = require("../Expresion");
const Dato = require('../Expresion/Dato.js');
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');


class Continue extends Instruccion {
    constructor(fila, columna) {
        super(TipoInstr.CONTINUE, fila, columna);
    }

    interpretar(entorno) {
        if (global.ciclo == true) {
            this.tipo = TipoInstr.CONTINUE;
            global.continue = true;
            return this;
        } else {
            this.tipo = TipoInstr.CONTINUE;
            global.continue = false;
            return this;
        }
    }

    getNodo() {
        try {
            let nodo = new NodoAst('CONTINUE');
            nodo.agregarHijo("continue");
            nodo.agregarHijo(";");
            return nodo;
        }


        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('CONTINUE');
            nodo.agregarHijo("ERROR")
            return nodo;
        }

    }



}
module.exports = Continue;