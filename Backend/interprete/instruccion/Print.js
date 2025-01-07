const { TipoDato } = require("../Expresion");
const { Instruccion, TipoInstr } = require("../Instruccion");
const {arreglo} = require("../../analizador/utilidad/Datos.js");

class Print extends Instruccion {
    constructor(expresion, fila, columna) {
        super(TipoInstr.PRINT, fila, columna);
        this.expresion = expresion;
    }

    interpretar(entorno) {
        this.expresion.interpretar(entorno);

        if (this.expresion.tipo == TipoDato.ERROR) {
            return "Error Semántico: No se puede imprimir Errores.";
        }

        let valor = this.expresion.valor;
        // console.log(valor);
        arreglo.push(valor)
        return valor; // En lugar de console.log, devolvemos el valor.
    }
}

module.exports = Print;
