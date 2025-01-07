const { Expresion, TipoDato } = require("../Expresion.js");
const NodoAst = require('../simbolo/NodoAst');
const errores = require("../../analizador/utilidad/Errores.js");
const Entorno = require("../entorno/Entorno.js");
const { TipoInstr } = require("../Instruccion.js");
const Dato = require('../Expresion/Dato.js');
const { TipoSimbolo } = require("../Entorno/Simbolo");

class Callfuncion extends Expresion {
    constructor(nombre, parametros, fila, columna) {
        super(new Dato("ERROR", TipoDato.ERROR, fila, columna), TipoDato.ERROR, fila, columna);
        this.parametros = parametros;
        this.nombre = nombre;
    }

    interpretar(entorno) {
        let entornoParametros = new Entorno(TipoInstr.FUNCION, entorno);
        let entornoFuncion = new Entorno(TipoInstr.FUNCION, entornoParametros);
        let funcion = entorno.getFuncion(this.nombre);

        // Verificar si la función es null
        if (funcion === null) {
            errores.crearError("Error Semántico: ", `La función ${this.nombre} no existe.`, this.fila, this.columna);
            return this;
        }

        // Paso 1: Actualizar los parametros
        if (funcion.parametros != null && Array.isArray(funcion.parametros)) {
            console.log("ENTRO A ES ARRAY");
            if (funcion.parametros[0] == null) {
                // Manejar el caso donde el primer parámetro es null
            } else {
                console.log("=============================================");
                console.log("PARAMETROS: ", funcion.parametros);
                console.log("=============================================");
                for (let i = 0; i < this.parametros.length; i++) {
                    funcion.parametros[i].expresion = this.parametros[i].interpretar(entornoParametros);
                    funcion.parametros[i].interpretar(entornoParametros);
                }
                console.log("=============================================");
                console.log("PARAMETROS xd: ", funcion.parametros);
                console.log("=============================================");
            }
        } else {
            console.log("ENTRO A NO ES ARRAY");
            if (funcion.parametros == null) {
                // Manejar el caso donde los parámetros son null
            } else {
                for (let i = 0; i < this.parametros.length; i++) {
                    funcion.parametros[i].expresion = this.parametros[i].interpretar(entornoParametros);
                    funcion.parametros[i].interpretar(entornoParametros);
                }
            }
        }

        for (let i = 0; i < funcion.instrucciones.length; i++) {
            let instruccion = funcion.instrucciones[i];
            instruccion.interpretar(entornoFuncion);

            if (instruccion.tipo == TipoInstr.RETURN) {
                if (funcion.retorno == "void") {
                    return this;
                } else {
                    let final = global.valorfinal;
                    this.valor = final.expresion.valor;
                    this.tipo = funcion.retorno;
                }
                return this;
            }
        }

        return this;
    }

    getNodo() {
        try {
            let nodo = new NodoAst("LLAMADA FUNCION");
            nodo.agregarHijo(this.nombre);
            nodo.agregarHijo("(");
            if (this.parametros[0] != null) {
                this.parametros.forEach(parametro => {
                    nodo.agregarHijoAST(parametro.getNodo());
                });
            }
            nodo.agregarHijo(")");
            return nodo;
        } catch (error) {
            console.error('Error al generar el nodo:');
            let nodo = new NodoAst('LLAMADA FUNCION');
            nodo.agregarHijo("ERROR");
            return nodo;
        }
    }
}

module.exports = Callfuncion;