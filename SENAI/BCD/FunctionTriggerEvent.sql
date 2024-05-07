-- ------------------------------------------------------------------------------------------------------------------
--                        				 FUNCTION, TRIGGER e EVENT
-- ------------------------------------------------------------------------------------------------------------------


/* ---------------------------------------------------------------------------------------------------------
------------------------------------             FUNCTION          -----------------------------------------
------------------------------------------------------------------------------------------------------------
No MySQL, as funções são blocos de código reutilizáveis que realizam operações específicas e podem aceitar parâmetros 
como entrada e retornar valores como saída. Elas são muito úteis para simplificar consultas complexas, encapsular 
lógica de negócios e promover a reutilização de código.

A palavra-chave DETERMINISTIC em uma função no MySQL indica que a função sempre produzirá o mesmo resultado quando 
fornecidos os mesmos parâmetros de entrada. Isso significa que a função não depende de fatores externos, como valores 
de tabelas de banco de dados ou variáveis de sistema, para produzir seu resultado.
*/

-- EXEMPLO: 
/*
	--------- IMC - FAIXAS DE PESO ---------
	Abaixo do Peso (IMC abaixo de 18,5)
	Peso Normal (IMC entre 18,5 e 24,9)
	Sobrepeso (IMC entre 25 e 29,9)
	Obesidade (IMC entre 30 e 34,9)
	Obesidade Grau II (IMC entre 35 e 39,9)
	Obesidade Grau III (IMC acima de 40) ou obesidade mórbida
*/

-- CRIA UMA FUNÇÃO PARA CALCULAR E RETORNAR O IMC
-- A CLÁUSULA RETURNS PODE SER ESPECIFIFICADA APENAS POR UMA FUNCTION, É USADA PARA INDICAR O TIPO DE RETORNO DA FUNÇÃO, 
-- E O CORPO DA FUNÇÃO DEVE CONTER O RETURN COM O VALOR A SER RETORNADO.

DELIMITER //

CREATE FUNCTION FN_CALCULAR_IMC(peso DECIMAL(5,2), altura DECIMAL(3,2))
RETURNS DECIMAL(5,2)
DETERMINISTIC 
BEGIN
    DECLARE imc DECIMAL(5,2);
    SET imc = peso / (altura * altura);
    RETURN imc;
END//

DELIMITER ;

-- EXECUTANDO
SELECT FN_CALCULAR_IMC(90,1.76) AS IMC;

-- EXCLUI UMA FUNÇÃO
DROP FUNCTION FN_CALCULAR_IMC;

/* ---------------------------------------------------------------------------------------------------------
------------------------------------             TRIGGER          ------------------------------------------
------------------------------------------------------------------------------------------------------------
No MySQL, um trigger é um tipo de procedimento armazenado que é ativado automaticamente em resposta a 
determinados eventos em uma tabela. Esses eventos podem incluir inserções, atualizações ou exclusões de 
registros na tabela associada ao trigger.

Eventos Disparadores:
Um trigger pode ser acionado por um dos seguintes eventos em uma tabela: BEFORE INSERT, AFTER INSERT, 
BEFORE UPDATE, AFTER UPDATE, BEFORE DELETE ou AFTER DELETE.

Estrutura:
Um trigger é composto por um nome, um tipo de evento (BEFORE ou AFTER), um ou mais eventos que disparam o 
trigger (INSERT, UPDATE, DELETE), o nome da tabela associada e o bloco de código que é executado quando o trigger é acionado.
*/

-- Como exemplo utilizaremos dois bancos de dados, sendo um deles para BACKUP
CREATE DATABASE LOJA;

USE LOJA;

CREATE TABLE PRODUTO(
	IDPRODUTO INT NOT NULL AUTO_INCREMENT,
	NOME VARCHAR(30),
	VALOR DECIMAL(10,2),
    PRIMARY KEY(IDPRODUTO)
);

-- Database de BACKUP
CREATE DATABASE LOJA_BACKUP;

USE LOJA_BACKUP;

CREATE TABLE BKP_PRODUTO(
	IDBKP INT NOT NULL AUTO_INCREMENT,
	IDPRODUTO INT,
	NOME VARCHAR(30),
	VALOR DECIMAL(10,2),
    PRIMARY KEY (IDBKP)
);


/* 
Criar TRIGGER que seja acionada após cada INSERT na tabela PRODUTO, essa TRIGGER contém um 
procedimento que realiza um INSERT na tabela BKP_PRODUTO do banco de LOJA_BACKUP
*/
USE LOJA;
DELIMITER ||
CREATE TRIGGER BACKUP_PRODUTO
AFTER INSERT ON PRODUTO
FOR EACH ROW
BEGIN	
	INSERT INTO LOJA_BACKUP.BKP_PRODUTO VALUES(NULL,NEW.IDPRODUTO,
	NEW.NOME,NEW.VALOR);
END||

DELIMITER ;

-- Inserir novos registros na tabela produtos do banco LOJA, verificar a cada INSERT a tabela BKP_PRODUTO do banco LOJA_BACKUP
INSERT INTO PRODUTO VALUES(NULL,'LIVRO MYSQL SERVER',100.00);
SELECT * FROM LOJA_BACKUP.BKP_PRODUTO;

INSERT INTO PRODUTO VALUES(NULL,'LIVRO NODE JS',130.00);
SELECT * FROM LOJA_BACKUP.BKP_PRODUTO;

INSERT INTO PRODUTO VALUES(NULL,'LIVRO REAC NATIVE',190.00);
SELECT * FROM LOJA_BACKUP.BKP_PRODUTO;

--  Criar uma tabela que registra cada item vinculado a um pedido
USE LOJA;
CREATE TABLE IF NOT EXISTS ITENS_PEDIDO (
    ID INT NOT NULL AUTO_INCREMENT,
    IDPEDIDO INT NOT NULL,
    IDPRODUTO INT NOT NULL,
    QUANTIDADE INT NOT NULL,
    PRIMARY KEY (ID , IDPEDIDO , IDPRODUTO),
    CONSTRAINT `fk_itens_pedido_to_produto` FOREIGN KEY (`IDPRODUTO`)
        REFERENCES `loja`.`produto` (`IDPRODUTO`)
);

-- Criar a tabela estoque para controlar o saldo/entrad/saída de itens
CREATE TABLE IF NOT EXISTS ESTOQUE(
	ID INT NOT NULL AUTO_INCREMENT,
    IDPRODUTO INT NOT NULL,
    IDFORNECEDOR INT NOT NULL,
	QTD_ATUAL INT NOT NULL,
    QTD_MIN INT NOT NULL,
    QTD_MAX INT NOT NULL,
    PRIMARY KEY(ID,IDPRODUTO, IDFORNECEDOR),
     CONSTRAINT `fk_estoque_to_produto` FOREIGN KEY (`IDPRODUTO`)
        REFERENCES `loja`.`produto` (`IDPRODUTO`)
);
-- Inserir uma entrada na tabela estoque
INSERT INTO ESTOQUE VALUES(NULL, 1, 333, 10,30,3);

-- Criar TRIGGER para atualizar o saldo disponível no estoque
DELIMITER ||
CREATE TRIGGER ATUALIZA_ESTOQUE
AFTER INSERT ON ITENS_PEDIDO
FOR EACH ROW
BEGIN	
	UPDATE ESTOQUE SET QTD_ATUAL=QTD_ATUAL-NEW.QUANTIDADE WHERE IDPRODUTO = NEW.IDPRODUTO;
END||
DELIMITER ;

-- Inserir um item na tabela pedido e verificar se atualização na tabela estoque ocorreu normalmente
INSERT INTO ITENS_PEDIDO VALUES(NULL, 26, 9,3);
SELECT * FROM ESTOQUE;

-- Deletar uma TRIGGER
DROP TRIGGER BACKUP_PRODUTO;
DROP TRIGGER ATUALIZA_ESROQUE;

/* ---------------------------------------------------------------------------------------------------------
------------------------------------             EVENTS          -------------------------------------------
------------------------------------------------------------------------------------------------------------
No MySQL, um evento (EVENT) é um procedimento que é executado a partir de um agendamento com hora marcada.
Um evento pode realizar uma ou mais tarefas de forma automática em um horário específico ou intevalos regulares.
*/ 
-- Verifica se o agendador de eventos (EVENTS) estão habilitados no MySQL
SELECT @@EVENT_SCHEDULER;
SHOW VARIABLES LIKE 'event_scheduler';

-- Para habilitar utilizamos:
SET GLOBAL EVENT_SCHEDULER = ON;

DELIMITER $$
CREATE EVENT ATUALIZA_A_CADA_MINUTO 
ON SCHEDULE EVERY 1 MINUTE 
DO 
BEGIN
INSERT INTO ITENS_PEDIDO VALUES(NULL, 26, 1,3);
END $$
DELIMITER ;

-- Excluir um evento
DROP EVENT ATUALIZA_A_CADA_MINUTO;
