const { Instruccion, TipoInstr } = require("../Instruccion");
const { TipoSimbolo } = require("../Entorno/Simbolo");
const { TipoDato } = require("../Expresion");
const Dato = require('../Expresion/Dato.js');
const NodoAst = require('../simbolo/NodoAst');
const errores = require('../../analizador/utilidad/Errores.js');
const simbolos = require('../../analizador/utilidad/Simbolos.js');
const Funcion = require("./Funcion.js");

class DecFuncion extends Instruccion {
    constructor(nombre, retorno, parametros, instrucciones, fila, columna) {
        super(TipoInstr.DecFuncion, fila, columna);
        this.retorno = retorno;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.nombre = nombre;

    }

    interpretar(entorno) {

        let funcion = new Funcion(this.nombre, this.retorno, this.parametros, this.instrucciones, this.fila, this.columna);
        entorno.addFuncion(this.nombre, funcion);
        simbolos.crearSimbolo(this.nombre, "FUNCION", this.retorno, entorno.nombre, this.fila, this.columna);
        // this.parametros.forEach(parametro => {
        //     console.log(parametro);
        // });

        return this;

    }

    getNodo() {
        try {
            let nodo = new NodoAst('FUNCION');
            nodo.agregarHijo("funcion");
            nodo.agregarHijo(this.nombre);
            nodo.agregarHijo("(");
            if (this.parametros[0] != null) {

                nodo.agregarHijoAST(this.parametros[0].getNodo());

            } else {
                nodo.agregarHijo(")");
            }


            nodo.agregarHijo("{");
            for (let instruccion of this.instrucciones) {
                nodo.agregarHijoAST(instruccion.getNodo());
            }
            nodo.agregarHijo("}");
            return nodo;
        }
        catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('FUNCION');
            nodo.agregarHijo("ERROR")
            return nodo;
        }

    }
}

module.exports = DecFuncion;