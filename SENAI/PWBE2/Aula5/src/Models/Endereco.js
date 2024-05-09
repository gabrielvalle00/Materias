class Endereco {

    constructor(pEnd) {
        this.id = (pEnd.id !== null || pEnd.id > 0) ? pEnd.id : null;
        this.logradouro = pEnd.logradouro;
        this.numero = pEnd.numero;
        this.bairro = pEnd.bairro;
        this.complemento = pEnd.complemento;
        this.cep = pEnd.cep;
        this.cidade = pEnd.cidade;
        this.uf = pEnd.uf;
    }
    get logradouro() {
        return this._logradouro;
    };
    set logradouro(value) {
        this._logradouro = value;
    };
    get numero() {
        return this._numero;
    };
    set numero(value) {
        this._numero = value;
    };
    get bairro() {
        return this._bairro;
    };
    set bairro(value) {
        this._bairro = value;
    };
    get complemento() {
        return this._complemento;
    };
    set complemento(value) {
        this._complemento = value;
    };
    get cep() {
        return this._cep;
    };
    set cep(value) {
        this._cep = value;
    };
    get cidade() {
        return this._cidade;
    };
    set cidade(value) {
        this._cidade = value;
    };
    get uf() {
        return this._uf;
    };
    set uf(value) {
        this._uf = value;
    };
}

module.exports = Endereco;