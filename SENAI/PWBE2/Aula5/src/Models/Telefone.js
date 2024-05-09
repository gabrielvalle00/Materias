class Telefone {

    constructor(pTel) {
        this.id = (pTel.id !== null || pTel.id > 0) ? pTel.id : null;
        this.numero = pTel.numero;
        this.tipo = pTel.tipo;
    }
    // Getters and Setters
    get Numero() { return this.numero; }
    set Numero(value) { this.numero = value }

    get Tipo() { return this.tipo; }
    set Tipo(value) { this.tipo = value }
}

module.exports = Telefone;