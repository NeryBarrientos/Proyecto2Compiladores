class Errores {
    constructor() {
        if (!Errores.instance) {
            this.listaErrores = [];
            Errores.instance = this;
        }

        return Errores.instance;
    }

    crearError(nombre, simbolo, fila, columna) {
        const nuevoError = { nombre, simbolo, fila, columna };
        this.listaErrores.push(nuevoError);
    }

    mostrarErrores() {
        return this.listaErrores;
    }
}

const instanciaSingleton = new Errores(); 

module.exports = instanciaSingleton;
