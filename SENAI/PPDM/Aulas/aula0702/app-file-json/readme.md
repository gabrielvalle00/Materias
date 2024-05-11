# Aula07 - Lendo arquivo no formato .json com React Native e Expo

## Objetivo
- O objetivo dessa aula é criar um aplicativo realize a leitura de arquivo do tipo **JSON** e permita salvar essas informações em um banco de dados através de uma API.

## 1. Arquivos JSON
- Arquivos e dados JSON são elementos fundamentais no mundo da programação e da computação, especialmente no contexto de armazenamento e troca de informações entre sistemas e aplicativos.
- JSON (JavaScript Object Notation):Definição: JSON é um formato de texto leve para troca de dados. É fácil para humanos lerem e escreverem e para máquinas interpretarem e gerarem.
- Estrutura: Os dados JSON são representados em pares chave-valor, organizados em uma estrutura hierárquica. Os valores podem ser strings, números, objetos, arrays, booleanos ou null.
  - Exemplo:
    ````JSON
    {
    "nome": "João",
    "idade": 30,
    "email": "joao@example.com",
    "telefone": "123456789"
    }
    ````

## 2. Utilizar componente para leitura de arquivos JSON
### 2.1. Iniciando um novo aplicativo React Native com Expo:
- Criar um novo projeto React Native com Expo conforme instruções:
- Acessar a pasta com com o nome da unidade curricular, **PPDM**:
- Criar uma pasta com o nome **aula07**
- Dentro da pasta **aula07** iniciar o VSCode e criar o projeto abaixo:
    - `npx create-expo-app app-file-json`

### 2.2. Dependências
- Componentes:
  - Expo **DocumentPicker**, fornece acesso à UI do sistema para selecionar documentos disponíveis no dispositivo do usuário.
    - `npx expo install expo-document-picker`  

  - Expo **FileSystem**, fornece acesso ao sistema de arquivos do dispositivo.
    - `npx expo install expo-file-system`  

  - **Axios**, cliente HTTP, envia solicitações HTTP para servidores WEB/API e interpreta as respostas recebidas.
    - `npm install axios`  


