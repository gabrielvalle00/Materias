/* ------------------------------------------------------------------------------------------------------------------
-------------------------------------       VIEW e STORED PROCEDURE        ------------------------------------------
---------------------------------------------------------------------------------------------------------------------
VIEW: Uma view é um objeto que é formado por declarações SELECTs, que retornam uma visualização de dados específica de 
uma ou mais tabelas de um banco de dados. Esses objetos também são conhecidos como virtual tables (tabelas virtuais), 
justamente por não fazerem parte do esquema físico da base.
Podemos utilizar as VIEWS para simplificar o acesso a registros que estão armazenados em várias tabelas relacionadas,
implementar segurança nos dados da tabela criando uma VIEW limitando os dados que podem ser visualizados.
*/
-- ------------------------------------------------------------------------------------------------------------------
-- Criar banco para realizar os comandos referente ao conteúdo apresentado
-- DDL - DATA DEFINITION LANGUAGE (CREATE, ALTER, DROP)

CREATE DATABASE IF NOT EXISTS `db_clientes`;

USE `db_clientes` ;

-- -----------------------------------------------------
-- Table `db_clientes`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_clientes`.`cliente` (
  `idcliente` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `sexo` ENUM('F', 'M') NOT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `cpf` VARCHAR(15) NULL,
  PRIMARY KEY (`idcliente`));
  
-- -----------------------------------------------------
-- Table `db_clientes`.`endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_clientes`.`endereco` (
  `idendereco` INT NOT NULL AUTO_INCREMENT,
  `rua` VARCHAR(30) NOT NULL,
  `bairro` VARCHAR(30) NOT NULL,
  `cidade` VARCHAR(30) NOT NULL,
  `estado` CHAR(2) NOT NULL,
  `id_cliente` INT NOT NULL,
  PRIMARY KEY (`idendereco`),
  CONSTRAINT `fk_endereco_clientes`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `db_clientes`.`cliente` (`idcliente`));

-- -----------------------------------------------------
-- Table `db_clientes`.`telefone`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_clientes`.`telefone` (
  `idtelefone` INT NOT NULL AUTO_INCREMENT,
  `tipo` ENUM('RES', 'COM', 'CEL') NOT NULL,
  `numero` VARCHAR(10) NOT NULL,
  `id_cliente` INT NOT NULL,
  PRIMARY KEY (`idtelefone`, `id_cliente`),
  CONSTRAINT `fk_telefones_clientes1`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `db_clientes`.`cliente` (`idcliente`));
    
-- DML - Data Manipulation Language - Linguagem de Manipulação de Dados.    
-- CADASTRO DE CLIENTES 
INSERT INTO CLIENTE VALUES(NULL,'FLAVIO','M','FLAVIO@IG.COM','4657765'),
(NULL,'ANDRE','M','ANDRE@GLOBO.COM','7687567'),
(NULL,'GIOVANA','F',NULL,'0876655'),
(NULL,'KARLA','M','KARLA@GMAIL.COM','545676778'),
(NULL,'DANIELE','M','DANIELE@GMAIL.COM','43536789'),
(NULL,'LORENA','M',NULL,'774557887'),
(NULL,'EDUARDO','M',NULL,'54376457'),
(NULL,'ANTONIO','F','ANTONIO@IG.COM','12436767'),
(NULL,'ANTONIO','M','ANTONIO@UOL.COM','3423565'),
(NULL,'ELAINE','M','ELAINE@GLOBO.COM','32567763'),
(NULL,'CARMEM','M','CARMEM@IG.COM','787832213'),
(NULL,'ADRIANA','F','ADRIANA@GMAIL.COM','88556942'),
(NULL,'JOICE','F','JOICE@GMAIL.COM','55412256');

-- CADASTRE UM ENDERECO PARA CADA CLIENTE 
INSERT INTO ENDERECO VALUES(NULL,'RUA GUEDES','CASCADURA','B. HORIZONTE','MG',9);
INSERT INTO ENDERECO VALUES(NULL,'RUA MAIA LACERDA','ESTACIO','RIO DE JANEIRO','RJ',10);
INSERT INTO ENDERECO VALUES(NULL,'RUA VISCONDESSA','CENTRO','RIO DE JANEIRO','RJ',1);
INSERT INTO ENDERECO VALUES(NULL,'RUA NELSON MANDELA','COPACABANA','RIO DE JANEIRO','RJ',2);
INSERT INTO ENDERECO VALUES(NULL,'RUA ARAUJO LIMA','CENTRO','VITORIA','ES',3);
INSERT INTO ENDERECO VALUES(NULL,'RUA CASTRO ALVES','LEBLON','RIO DE JANEIRO','RJ',4);
INSERT INTO ENDERECO VALUES(NULL,'AV CAPITAO ANTUNES','CENTRO','CURITIBA','PR',5);
INSERT INTO ENDERECO VALUES(NULL,'AV CARLOS BARROSO','JARDINS','SAO PAULO','SP',6);
INSERT INTO ENDERECO VALUES(NULL,'ALAMEDA SAMPAIO','BOM RETIRO','CURITIBA','PR',7);
INSERT INTO ENDERECO VALUES(NULL,'RUA DA LAPA','LAPA','SAO PAULO','SP',8);
INSERT INTO ENDERECO VALUES(NULL,'RUA GERONIMO','CENTRO','RIO DE JANEIRO','RJ',11);
INSERT INTO ENDERECO VALUES(NULL,'RUA GOMES FREIRE','CENTRO','RIO DE JANEIRO','RJ',12);
INSERT INTO ENDERECO VALUES(NULL,'RUA GOMES FREIRE','CENTRO','RIO DE JANEIRO','RJ',13);

-- CADASTRE TELEFONES PARA OS CLIENTES 
INSERT INTO TELEFONE VALUES(NULL,'RES','68976565',9);
INSERT INTO TELEFONE VALUES(NULL,'CEL','99656675',9);
INSERT INTO TELEFONE VALUES(NULL,'CEL','33567765',1);
INSERT INTO TELEFONE VALUES(NULL,'CEL','88668786',1);
INSERT INTO TELEFONE VALUES(NULL,'COM','55689654',1);
INSERT INTO TELEFONE VALUES(NULL,'COM','88687979',2);
INSERT INTO TELEFONE VALUES(NULL,'COM','88965676',3);
INSERT INTO TELEFONE VALUES(NULL,'CEL','89966809',5);
INSERT INTO TELEFONE VALUES(NULL,'COM','88679978',6);
INSERT INTO TELEFONE VALUES(NULL,'CEL','99655768',7);
INSERT INTO TELEFONE VALUES(NULL,'RES','89955665',8);
INSERT INTO TELEFONE VALUES(NULL,'RES','77455786',9);
INSERT INTO TELEFONE VALUES(NULL,'RES','89766554',9);
INSERT INTO TELEFONE VALUES(NULL,'RES','77755785',10);
INSERT INTO TELEFONE VALUES(NULL,'COM','44522578',10);

-- ------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------           VIEWS          ----------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------

-- Criando uma VIEW para exibir um SELECT simples:
CREATE OR REPLACE VIEW VW_CLIENTES_NOMES AS
SELECT NOME, SEXO
FROM CLIENTE;

-- Executando essa VIEW:
SELECT * FROM VW_CLIENTES_NOMES;

-- SELECT com tabelas vinculadas:
SELECT  C.NOME, 
		C.SEXO, 
		C.EMAIL, 
		T.TIPO, 
		T.NUMERO, 
		E.BAIRRO, 
		E.CIDADE, 
		E.ESTADO
FROM CLIENTE C 
INNER JOIN TELEFONE T 
ON C.IDCLIENTE = T.ID_CLIENTE 
INNER JOIN ENDERECO E 
ON C.IDCLIENTE = E.ID_CLIENTE;

-- Criando uma VIEW chamada VW_RELATORIO que contém o select exemplificado acima:
CREATE VIEW VW_RELATORIO AS
SELECT  C.NOME, 
		C.SEXO, 
		C.EMAIL, 
		T.TIPO, 
		T.NUMERO, 
		E.BAIRRO, 
		E.CIDADE, 
		E.ESTADO
FROM CLIENTE C 
INNER JOIN TELEFONE T 
ON C.IDCLIENTE = T.ID_CLIENTE 
INNER JOIN ENDERECO E 
ON C.IDCLIENTE = E.ID_CLIENTE;

-- Executando a VIEW:
SELECT * FROM VW_RELATORIO;

-- Exibindo todas as VIEWs existentes no banco de dados
SHOW FULL TABLES IN db_clientes
WHERE TABLE_TYPE LIKE 'VIEW';

-- Uma VIEW só pode ser atualizada se o seu conteúdo for um SELECT simples, VIEW que contém agupamentos (JOIN) não podem ser atualizadas:
UPDATE VW_CLIENTES_NOMES SET NOME='BIA' WHERE NOME= 'JOICE';
UPDATE VW_CLIENTES_NOMES SET SEXO='M' WHERE NOME= 'ANTONIO';

-- Não é possivel realizar insert em VIEW com agrupamentos, a tentiva retorna o erro abaixo
-- ERROR 1394 (HY000): Can not insert into join view VW_RELATORIO without fields list
INSERT INTO VW_RELATORIO VALUES(
'ANDREIA','F','ANDREIA@UOL.COM.BR','CEL','873547864','CENTRO','VITORIA','ES'
);

-- Não é possivel deletar um registro em VIEW com agrupamentos, a tentiva retorna o erro abaixo
-- ERROR 1395 (HY000): Can not delete from join view VW_RELATORIO
DELETE FROM VW_RELATORIO WHERE NOME = 'JORGE';

-- Deletar uma VIEW:
DROP VIEW VW_RELATORIO;
DROP VIEW VW_CLIENTES_NOMES;
 
/*/* ----------------------------------------------------------------------------------------------------------------
-------------------------------      STORED PROCEDURE (Procedimentos armazenados)      ------------------------------
---------------------------------------------------------------------------------------------------------------------
Rotinas definidas no banco de dados, identificadas por um nome pelo qual podem ser chamadas.
Um procedimento desses pode executar uma série de instruções, receber parâmetros e retornar valores.

Parâmetros: (MODO nome TIPO, MODO nome TIPO, MODO nome TIPO)
- IN: indica que o parâmetro é apenas para entrada/recebimento de dados, não podendo ser usado para retorno;
- OUT: usado para parâmetros de saída. Para esse tipo não pode ser informado um valor direto (como ‘teste’, 1 ou 2.3), 
deve ser passada uma variável “por referência”;
- INOUT: como é possível imaginar, este tipo de parâmetro pode ser usado para os dois fins (entrada e saída de dados). 
Nesse caso também deve ser informada uma variável e não um valor direto.

*/ 
-- ------------------------------------------------------------------------------------------------------------------
/* Sintaxe de criação e STORED PROCEDURE no MySQL:

DELIMITER $$
CREATE PROCEDURE nome_procedimento (parâmetros)
BEGIN

--> CORPO DO PROCEDIMENTO

END $$
DELIMITER ;
*/

DELIMITER $$
CREATE PROCEDURE PRC_SELECIONA_CLIENTES()
BEGIN
SELECT * FROM CLIENTE;
END $$
DELIMITER ;

-- Executando uma STORED PROCEDURE:
CALL PRC_SELECIONA_CLIENTES;

-- STORED PROCEDURE com parâmetros:
DELIMITER $$
CREATE PROCEDURE PRC_CLIENTES_QTD(IN quantidade INT)
BEGIN
SELECT * FROM CLIENTE
LIMIT quantidade;
END $$
DELIMITER ;

-- Executando uma SP(STORED PROCEDURE) com parâmetros:
CALL PRC_CLIENTES_QTD(3);

-- SP (STORED PROCEDURE) recebendo e retornando parâmetros:
DELIMITER $$
CREATE PROCEDURE PRC_ELEVAR_QUADRADO(INOUT numero INT)
BEGIN
SET numero = numero * numero;
END $$
DELIMITER ;

-- Execução:
SET @valor = 8;
CALL PRC_ELEVAR_QUADRADO(@valor);
SELECT @valor AS RESULT;

-- INSERT com SP
DELIMITER $$
CREATE PROCEDURE PRC_INSERT_CLIENTE(IN nome VARCHAR(45),IN sexo ENUM('M','F'),IN email VARCHAR(50),IN cpf VARCHAR(15))
BEGIN
INSERT INTO CLIENTE VALUES(NULL,nome,sexo,email,cpf);
END $$
DELIMITER ;

-- Execução:
CALL PRC_INSERT_CLIENTE('VALLE', 'M','email@email.com.br','12345678912');

-- UPDATE com SP
DELIMITER $$
CREATE PROCEDURE PRC_UPDATE_CLIENTE(IN sexo ENUM('M','F'),IN email VARCHAR(50),IN cpf VARCHAR(15), IN id INT)
BEGIN
UPDATE CLIENTE SET SEXO = sexo, EMAIL = email, CPF = cpf WHERE IDCLIENTE = ID;
END $$
DELIMITER ;

-- Execução:
CALL PRC_UPDATE_CLIENTE('F','email100@email.com.br','98986532145', 3);

-- DELETE com SP
DELIMITER $$
CREATE PROCEDURE PRC_DELETE_CLIENTE(IN id INT)
BEGIN
DELETE FROM CLIENTE WHERE IDCLIENTE = ID;
END $$
DELIMITER ;

-- Execução:
CALL PRC_DELETE_CLIENTE(1);

-- Excluindo uma SP(STORED PROCEDURE)
DROP PROCEDURE PRC_SELECIONA_CLIENTES;
DROP PROCEDURE PRC_INSERT_CLIENTE;
DROP PROCEDURE PRC_UPDATE_CLIENTE;
DROP PROCEDURE PRC_ELEVAR_QUADRADO;
DROP PROCEDURE prc_select_clientes;
