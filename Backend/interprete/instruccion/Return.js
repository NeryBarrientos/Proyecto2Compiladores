const { TipoDato } = require("../Expresion");
const { Instruccion, TipoInstr } = require("../Instruccion");
const Entorno = require("../entorno/Entorno");
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');

class Return extends Instruccion {
    constructor(lista_expresion, fila, columna, ban = false) {
        super(TipoInstr.RETURN, fila, columna);
        this.lista_expresion = lista_expresion;
        this.ban = ban;
    }

    interpretar(entorno) {
        if (this.lista_expresion != null) {
            this.lista_expresion.forEach(expresion => {
                this.expresion.interpretar(entorno);
            });
            global.valorfinal = this;

            return this;
        } else {
            return this;
        }

    }


    getNodo() {

        try {

            let nodo = new NodoAst('RETURN');
            nodo.agregarHijo("return");
            if (this.expresion != null) {

                nodo.agregarHijoAST(this.expresion.getNodo());
                nodo.agregarHijo(";");

                return nodo;

            } else {
                nodo.agregarHijo(";");
                return nodo;

            }


        }



        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('RETURN');
            nodo.agregarHijo("ERROR")
            return nodo;
        }

    }





}
module.exports = Return;