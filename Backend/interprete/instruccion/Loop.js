
const { Instruccion, TipoInstr } = require("../Instruccion");
const Entorno = require("../entorno/Entorno");
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');
const { TipoDato } = require("../Expresion");


class Loop extends Instruccion {
    constructor(instrucciones, fila, columna) {
        super(TipoInstr.LOOP, fila, columna);
        this.instrucciones = instrucciones;
    }


    interpretar(entorno) {



        let entornoLOOP = new Entorno(TipoInstr.LOOP, entorno);
        while (true) {
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                instruccion.interpretar(entornoLOOP);

                if (instruccion.tipo == TipoInstr.BREAK || global.break == true) {
                    this.tipo = TipoInstr.BREAK;

                    global.break = false;
                    return this;
                } else if (instruccion.tipo == TipoInstr.CONTINUE) {
                    this.tipo = TipoInstr.CONTINUE;
                    global.continue = false;
                    break;
                } else if (instruccion.tipo == TipoInstr.RETURN) {
                    global.retorno = false;
                    this.tipo = TipoInstr.RETURN;
                    return this;
                }
            }



        }

        return this;
    }

    getNodo() {


        try {
            let nodo = new NodoAst('LOOP');

            nodo.agregarHijo('LOOP');
            nodo.agregarHijo('(');
            nodo.agregarHijo(')');
            nodo.agregarHijo('{');
            for (let instruccion of this.instrucciones) {
                nodo.agregarHijoAST(instruccion.getNodo());
            }


            nodo.agregarHijo('}');

            return nodo;
        } catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('LOOP');
            nodo.agregarHijo("ERROR")
            return nodo;
        }


    }
}

module.exports = Loop;