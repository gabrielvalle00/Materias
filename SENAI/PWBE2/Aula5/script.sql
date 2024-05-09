-- -----------------------------------------------------
-- Schema db_clientes_api
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_clientes_api
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_clientes_api` ;
USE `db_clientes_api` ;

-- -----------------------------------------------------
-- Table `db_clientes_api`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_clientes_api`.`cliente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(15) NOT NULL,
  `data_nasc` DATE NOT NULL,
  `dat_cad` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `db_clientes_api`.`telefone`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_clientes_api`.`telefone` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `tipo` ENUM("CEL", "RES", "COM", "REC") NOT NULL,
  `numero` VARCHAR(15) NOT NULL,
  `dat_cad` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_cliente_id_telefone_id_cliente`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `db_clientes_api`.`cliente` (`id`));

-- -----------------------------------------------------
-- Table `db_clientes_api`.`endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_clientes_api`.`endereco` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `logradouro` VARCHAR(45) NOT NULL,
  `numero` VARCHAR(10) NOT NULL,
  `bairro` VARCHAR(45) NOT NULL,
  `complemento` VARCHAR(45) NULL,
  `cep` VARCHAR(10) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `uf` CHAR(2) NOT NULL,
  `dat_cad` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_cliente_id_endereco_id_cliente`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `db_clientes_api`.`cliente` (`id`));