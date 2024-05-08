# PWBE2 - Aula06 - Lendo arquivo no formato JSON e XML com NODE JS

## Objetivo
- O objetivo dessa aula é criar um aplicativo realize a leitura de arquivo do tipo **JSON** e permita salvar essas informações em um banco de dados através de uma API.

## 1. Arquivos JSON e XML
### 1.1. Arquivos JSON
- Arquivos e dados JSON são elementos fundamentais no mundo da programação e da computação, especialmente no contexto de armazenamento e troca de informações entre sistemas e aplicativos.
- JSON (JavaScript Object Notation). Definição: JSON é um formato de texto leve para troca de dados.
- Estrutura: Os dados JSON são representados em pares chave-valor, organizados em uma estrutura hierárquica. Os valores podem ser strings, números, objetos, arrays, booleanos ou null.
- Os dados em JSON são representados como pares de chave e valor.
- Os dados são organizados em objetos {} e arrays [].
- Um objeto é uma coleção não ordenada de pares chave-valor, onde as chaves são strings e os valores podem ser qualquer tipo de dados JSON válido.
- Um array é uma coleção ordenada de valores.

Tipos de Dados:

    JSON suporta tipos de dados como string, número, booleano, objeto, array e null.
  - Exemplo **JSON**: 
    ````JSON
    {
      "nome": "Mario Bueno",
      "dt_nasc": "02/11/1990",
      "cpf": "987.654.321-08",
      "telefone":
        [
            { "tipo":"RES", "numero": "(19) 98345-6789" },
            { "tipo":"CEL", "numero": "(19) 93565-4321" }
        ],
        "endereco": [
        {
            "logradouro": "Avenida Brasil",
            "numero": 22,
            "bairro": "Guanabara",
            "complemento": null,
            "cep": "13178-000",
            "cidade": "Campinas",
            "uf": "SP"
        },
        {
            "logradouro": "Avenida Carlos Botelho",
            "numero": 329,
            "bairro": "Jardim Monte Alto",
            "complemento": "Casa A",
            "cep": "13178-000",
            "cidade": "Piracicaba",
            "uf": "SP"
        }
        ]
    }
    ````
### 1.2. Arquivos XML
- Um arquivo XML, ou Extensible Markup Language, é um formato de arquivo que armazena dados de forma hierárquica e legível por máquina. Ele é composto por tags que definem os elementos e atributos do documento:
  - **Tags**: São os elementos fundamentais do XML e iniciam por colchetes ("<" e ">"). As tags podem ser de abertura ("<tag>") ou de fechamento ("</tag>"). Elas são usadas para definir a estrutura hierárquica do arquivo.
  - **Elementos**: São os dados dentro das tags. Eles podem ser simples ou compostos. Elementos simples não têm elementos filhos, enquanto elementos compostos têm elementos filhos. Exemplo de um elemento simples <nome>João</nome>.
  - **Atributos**: São usados para fornecer informações adicionais sobre os elementos. Eles são especificados dentro das tags de abertura e têm um formato de par chave-valor. Por exemplo, em <pessoa idade="30">, "idade" é o atributo e "30" é o valor do atributo.
  
  -Exemplo **XML**:
  ````XML
  <dados_clientes>
    <cliente>
        <nome>Mario Bueno</nome>
        <data_nasc>02/11/1990</data_nasc>
        <cpf>987.654.321-08</cpf>
        <telefones>
            <telefone>
                <tipo>RES</tipo>
                <numero>(19) 98345-6789</numero>
            </telefone>
            <telefone>
                <tipo>CEL</tipo>
                <numero>(19) 93565-4321</numero>
            </telefone>
        </telefones>
        <enderecos> 
            <endereco>
                <logradouro>Avenida Brasil</logradouro>
                <numero>22</numero>
                <bairro>Guanabara</bairro>
                <complemento>null</complemento>
                <cep>13178-000</cep>
                <cidade>Campinas</cidade>
                <uf>SP</uf>
            </endereco>
            <endereco>
                <logradouro>Avenida Carlos Botelho</logradouro>
                <numero>329</numero>
                <bairro>Jardim Monte Alto</bairro>
                <complemento>Casa A</complemento>
                <cep>13178-000</cep>
                <cidade>Campinas</cidade>
                <uf>SP</uf>
            </endereco>
          </enderecos>
      </cliente>
  </dados_clientes>
  ````
- Estrutura:
  - **dados_clientes**: É o elemento raiz que contém informações sobre os clientes.
  - **cliente**: É um elemento que representa um cliente individual.
  - **nome, data_nasc, cpf**: São elementos que representam informações pessoais do cliente.
  - **telefones**: É um elemento que contém informações sobre os telefones do cliente.
  - **telefone**: É um elemento que representa um telefone específico do cliente e contém subelementos para o tipo e número do telefone.
  - **enderecos**: É um elemento que contém informações sobre os endereços do cliente.
  - **endereco**: É um elemento que representa um endereço específico do cliente e contém subelementos para o logradouro, número, bairro, complemento, CEP, cidade e UF.

## 2. Utilizar componente para leitura de arquivos JSON
### 2.1. Iniciando um novo aplicativo NODE JS:
- Criar um novo projeto **NODE JS** conforme instruções:
- Acessar a pasta com com o nome da unidade curricular, **PWBE2**:
- Criar uma pasta com o nome **aula0**
- Dentro da pasta **aula0** iniciar o VSCode e criar o projeto abaixo:
    - `npm init` 
    - Seguir as instruções até finalizar a criação do arquivo **package.json**

### 2.2. Dependências
- Componentes:
  - **xml2js**, realiza leitura e converte o arquivo XML.
    - `npm install xml2js`  



