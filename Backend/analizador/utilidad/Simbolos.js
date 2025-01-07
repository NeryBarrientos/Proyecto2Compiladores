class Simbolos {
    constructor() {
        if (!Simbolos.instance) {
            this.listaSimbolos = [];
            Simbolos.instance = this;
        }

        return Simbolos.instance;
    }

    crearSimbolo(id, tipoVar, tipoDato,entorno,fila, columna) {
        const nuevoSimbolo = { id, tipoVar, tipoDato,entorno,fila, columna };
        this.listaSimbolos.push(nuevoSimbolo);
    }

    mostrarSimbolos() {
        return this.listaSimbolos;
    }
}

const instanciaSingleton2 = new Simbolos(); 

module.exports = instanciaSingleton2;
