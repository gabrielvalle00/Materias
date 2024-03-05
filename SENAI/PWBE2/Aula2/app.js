const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {

    let i = 0;

    if (i == 0) {
        res.status(200).send("App Funcionando").end();

    } else {
        res.status(404).send("Erro na requisição").end();

    }
});

const cursos = ['React Native', 'JavaScript', 'NodeJS']

app.get("/cursos", async (req, res) => {
    return res.json(cursos);
});


app.get("/cursos/:index", (req, res) => {

    const { index } = req.params;
    console.log('Chegou aqui');

    return res.json(cursos[index])

});


app.post("/cursos", (req, res) => {

    const { nome } = req.body;
    cursos.push(nome);
    return res.json(cursos);
});

//UPDATE
app.put("/cursos/:index", (req, res) => {

    const { index } = req.params;
    const { nome } = req.body;

    cursos[index] = nome;

    return res.json(cursos);
});


//DELETE
app.delete('/cursos/:index', (req, res) => {
    const {index} = req.params;

    const cursoDeletado = cursos [index];
    cursos.splice (index, 1);
    return res.json ({ message: `Curso de ${cursoDeletado} deletado com sucesso`})
})


app.listen(8080, () => {
    console.log("Servidor respondendo na porta 8080");
});