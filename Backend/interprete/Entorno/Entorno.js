const { Expresion, TipoDato } = require("../Expresion");
const { Simbolo } = require("./Simbolo");

class Entorno{
    constructor(nombre, anterior){
        this.nombre = nombre;
        this.anterior = anterior;
        this.tablaSim = {};
        this.tablaFunc = {};
    }

    addSimbolo(nombre, valor, tipo, tipoVar, fila, columna,modificable){
        if(nombre in this.tablaSim){
            console.log("Semantico: Variable ya declarada");
            return;
        }
        this.tablaSim[nombre] = new Simbolo(nombre, valor, tipo, tipoVar, fila, columna, modificable);
    }

    getSimbolo(nombre) {
        let ent = this;
        while (ent != null) {
            try {
                if (!(nombre in ent.tablaSim)) {
                    ent = ent.anterior;
                } else {
                    return ent.tablaSim[nombre];
                }
            } catch (error) {
                // Capturar el error y seguir con las demás instrucciones
                console.error('Error en getSimbolo:', error);
                ent = ent.anterior;
            }
        }
        return new Expresion("ERROR", TipoDato.ERROR, 0, 0);
    }
// Nota verificacion de si es modificable

    modificarSimbolo(nombre, valor) {
        let ent = this;
        while (ent != null) {
            if (nombre in ent.tablaSim) {
                // console.log("Nery Prueba");
                // console.log(nombre)
                ent.tablaSim[nombre].valor = valor; // Modificar el valor del símbolo
                return;
            }
            ent = ent.anterior;
        }
        console.log("Semantico: Variable no declarada");
    }

    addFuncion(nombre, funcion){
        if(nombre in this.tablaFunc){
            console.log("Semantico: Funcion ya declarada");
            return;
        }
        this.tablaFunc[nombre] = funcion;
    }

    getFuncion(nombre){
        let ent = this;
        while (ent != null) {
            try {
                if (!(nombre in ent.tablaFunc)) {
                    ent = ent.anterior;
                } else {
                    return ent.tablaFunc[nombre];
                }
            } catch (error) {
                // Capturar el error y seguir con las demás instrucciones
                console.error('Error en getFuncion:', error);
                ent = ent.anterior;
            }
        }
        return null;
    }
    
}


module.exports = Entorno;