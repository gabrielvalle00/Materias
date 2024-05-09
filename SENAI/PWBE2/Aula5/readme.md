# Aula05 - Leitura de arquivo JSON com Node JS

## Objetivo
- O objetivo dessa aula é criar uma API que reaceba arquivos no formato JSON, realize a leitura e salve em um banco de dados.

## 1. Arquivos JSON
- Arquivos e dados JSON são elementos fundamentais no mundo da programação e da computação, especialmente no contexto de armazenamento e troca de informações entre sistemas e aplicativos.
- JSON (JavaScript Object Notation):Definição: JSON é um formato de texto leve para troca de dados. É fácil para humanos lerem e escreverem e para máquinas interpretarem e gerarem.
- Estrutura: Os dados JSON são representados em pares chave-valor, organizados em uma estrutura hierárquica. Os valores podem ser strings, números, objetos, arrays, booleanos ou null.
  - Exemplo:

    ````JSON
    {
        "nome": "João Silva",
        "dt_nasc": "30/01/1995",
        "cpf": "123.456.789-00",
        "telefone":
            [
                { "tipo":"RES", "numero": "(19) 98345-6789" },
                { "tipo":"CEL", "numero": "(19) 93565-4321" }
            ],
        "endereco": [
            {
                "logradouro": "Avenida Rebouças",
                "numero": 9999,
                "bairro": "Centro",
                "complemento": null,
                "cep": "13178-000",
                "cidade": "Sumaré",
                "uf": "SP"
            },
            {
                "logradouro": "Avenida Rui Barbosa",
                "numero": 9999,
                "bairro": "Jardim Paulista",
                "complemento": null,
                "cep": "13178-000",
                "cidade": "Campinas",
                "uf": "SP"
            }
        ]
    }
    ````

## 2. Utilizar NODE JS para leitura de arquivos JSON
### 2.1. Iniciando um novo aplicativo NODE JS:
- Criar um novo projeto React Native com Expo conforme instruções:
- Acessar a pasta com com o nome da unidade curricular, **PWBE2**:
- Criar uma pasta com o nome **aula05**
- Dentro da pasta **aula05** iniciar o VSCode e criar o projeto abaixo:
    - `npm init`
    - Seguir as instruções até finalizar a criação do arquivo **package.json**

### 2.2. Dependências
- Bibliotecas necessárias:
  -**Express**, fornece a criação do servidor.
    - `npm install express` 
  - -**MySql2**, fornece a biblioteca para manipular o MySQL Server
    - `npm install mysql2`   





