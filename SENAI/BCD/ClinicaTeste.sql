Create database Clinica;

use Clinica;


CREATE TABLE IF NOT EXISTS tbl_endereco (
  id INT NOT NULL AUTO_INCREMENT,
  logradouro VARCHAR(100) NOT NULL,
  bairro VARCHAR(45) NOT NULL,
  estado VARCHAR(45) NOT NULL,
  numero VARCHAR(45) NOT NULL,
  complemento VARCHAR(45) NULL,
  cep VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));


CREATE TABLE IF NOT EXISTS tbl_especialidade (
  id INT NOT NULL AUTO_INCREMENT,
  desc_especialidade VARCHAR(45) NULL,
  PRIMARY KEY (id));


CREATE TABLE IF NOT EXISTS tbl_telefone (
  id INT NOT NULL AUTO_INCREMENT,
  numero VARCHAR(20) NOT NULL,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS tbl_pessoa (
  id INT NOT NULL AUTO_INCREMENT,
  cpf VARCHAR(11) NOT NULL,
  nome VARCHAR(45) NOT NULL,
  data_nasc DATE NOT NULL,
  genero VARCHAR(30) NOT NULL,
  email VARCHAR(125) NOT NULL,
  data_cad TIMESTAMP NOT NULL,
  tbl_endereco_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_tbl_pessoa_tbl_endereco
    FOREIGN KEY (tbl_endereco_id)
    REFERENCES tbl_endereco (id)
    );

CREATE TABLE IF NOT EXISTS tbl_login (
  id INT NOT NULL AUTO_INCREMENT,
  login VARCHAR(125) NOT NULL,
  senha VARCHAR(500) NOT NULL,
  tbl_pessoa_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_tbl_login_tbl_pessoa1
    FOREIGN KEY (tbl_pessoa_id)
    REFERENCES tbl_pessoa (id)
    );
    
    CREATE TABLE IF NOT EXISTS tbl_perfis (
  id INT NOT NULL AUTO_INCREMENT,
  tipo VARCHAR(125) NOT NULL,
  tbl_login_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_tbl_perfis_tbl_login1
    FOREIGN KEY (tbl_login_id)
    REFERENCES tbl_login (id)
  );
  
  CREATE TABLE IF NOT EXISTS tbl_pessoa_has_tbl_telefone (
  tbl_pessoa_id INT NOT NULL,
  tbl_telefone_id INT NOT NULL,
  CONSTRAINT fk_tbl_pessoa_has_tbl_telefone_tbl_pessoa1
    FOREIGN KEY (tbl_pessoa_id)
    REFERENCES tbl_pessoa (id),
    CONSTRAINT fk_tbl_pessoa_has_tbl_telefone_tbl_telefone1
    FOREIGN KEY (tbl_telefone_id)
    REFERENCES tbl_telefone (id)
    );

CREATE TABLE IF NOT EXISTS tbl_paciente (
  id INT NOT NULL AUTO_INCREMENT,
  tbl_pessoa_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_tbl_paciente_tbl_pessoa1
    FOREIGN KEY (tbl_pessoa_id)
    REFERENCES tbl_pessoa (id)
    );

CREATE TABLE IF NOT EXISTS tbl_funcionario (
  id INT NOT NULL AUTO_INCREMENT,
  data_admissao DATE NOT NULL,
  crm VARCHAR(12) NOT NULL,
  tbl_pessoa_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_tbl_funcionario_tbl_pessoa1
    FOREIGN KEY (tbl_pessoa_id)
    REFERENCES tbl_pessoa (id)
    );

    CREATE TABLE IF NOT EXISTS tbl_consulta (
  id INT NOT NULL AUTO_INCREMENT,
  data_agendada DATE NOT NULL,
  hora TIME NOT NULL,
  tbl_paciente_id INT NOT NULL,
  tbl_funcionario_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_tbl_consulta_tbl_paciente1
    FOREIGN KEY (tbl_paciente_id)
    REFERENCES tbl_paciente (id),
  CONSTRAINT fk_tbl_consulta_tbl_funcionario1
    FOREIGN KEY (tbl_funcionario_id)
    REFERENCES tbl_funcionario (id)
    );

CREATE TABLE IF NOT EXISTS tbl_especialidade_has_tbl_funcionario (
  tbl_especialidade_id INT NOT NULL,
  tbl_funcionario_id INT NOT NULL,
  CONSTRAINT fk_tbl_especialidade_has_tbl_funcionario_tbl_especialidade1
    FOREIGN KEY (tbl_especialidade_id)
    REFERENCES tbl_especialidade (id),
  CONSTRAINT fk_tbl_especialidade_has_tbl_funcionario_tbl_funcionario1
    FOREIGN KEY (tbl_funcionario_id)
    REFERENCES tbl_funcionario (id)
  );

CREATE TABLE IF NOT EXISTS tbl_prontuario (
  id INT NOT NULL AUTO_INCREMENT,
  diagnostico VARCHAR(1000) NOT NULL,
  medicacao VARCHAR(300) NOT NULL,
  tbl_consulta_id INT NOT NULL,
  tbl_especialidade_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_tbl_prontuario_tbl_consulta1
    FOREIGN KEY (tbl_consulta_id)
    REFERENCES tbl_consulta (id),
  CONSTRAINT fk_tbl_prontuario_tbl_especialidade1
    FOREIGN KEY (tbl_especialidade_id)
    REFERENCES tbl_especialidade (id)
);


/* Parte dos Inserts */

INSERT INTO tbl_endereco (logradouro, bairro, estado, numero, complemento, cep)
VALUES
    ('Rua A', 'Centro', 'SP', '123', 'Apto 101', '12345-678'),
    ('Avenida B', 'Bairro X', 'RJ', '456', 'Casa 2', '54321-987'),
    ('Rua C', 'Bairro Y', 'MG', '789', NULL, '98765-432'),
    ('Rua D', 'Dua lipa', 'MT', '79', NULL, '14765-459');
    
INSERT INTO tbl_especialidade (desc_especialidade)
VALUES
    ('Clínico Geral'),
    ('Cardiologista'),
    ('Dermatologista');
    
    
    INSERT INTO tbl_pessoa (cpf, nome, data_nasc, genero, email, data_cad, tbl_endereco_id)
VALUES
    ('12345678901', 'João da Silva', '1990-05-15', 'Masculino', 'joao@example.com', NOW(), 1),
    ('98765432109', 'Maria Oliveira', '1985-09-20', 'Feminino', 'maria@example.com', NOW(), 2),
    ('45678901234', 'Pedro Santos', '1978-03-10', 'Masculino', 'pedro@example.com', NOW(), 3),
    ('11122233344', 'Dr. Carlos Souza', '1975-10-25', 'Masculino', 'carlos@example.com', NOW(), 3),
    ('22233344455', 'Dra. Ana Costa', '1980-07-12', 'Feminino', 'ana@example.com', NOW(), 4),
    ('33344455566', 'Dr. José Pereira', '1965-04-03', 'Masculino', 'jose@example.com', NOW(), 4);

INSERT INTO tbl_telefone (numero)
VALUES
    ('(11) 1234-5678'),
    ('(21) 9876-5432'),
    ('(31) 2255-5555'),
    ('(31) 5765-5555'),
    ('(31) 5555-5555'),
    ('(65) 5235-5555'),
    ('(21) 7645-5555'),
    ('(41) 87655-5555');
    
    INSERT INTO tbl_login (login, senha, tbl_pessoa_id)
VALUES
    ('12345678901', 'senha123', 1),
    ('98765432109', 'senha456', 2),
    ('45678901234', 'senha789', 3),
    ('11122233344', 'senha789', 4),
    ('22233344455', 'senha789', 5),
    ('33344455566', 'senha789', 6);
    
    
    INSERT INTO tbl_perfis (tipo, tbl_login_id)
VALUES
    ('Paciente', 1),
    ('Paciente', 2),
    ('Paciente', 3),
	('Médico', 4),
    ('Médico', 5),
    ('Médico', 6);
    
    
    INSERT INTO tbl_paciente (tbl_pessoa_id)
VALUES
    (1),
    (2),
    (3);
    
    
    INSERT INTO tbl_funcionario (data_admissao, crm, tbl_pessoa_id)
VALUES
    ('2020-01-01', 'CRM123456', 4),
    ('2019-05-15', 'CRM789012', 5),
    ('2022-03-10', 'CRM345678', 6);
    
    
    INSERT INTO tbl_telefone_has_pessoa (tbl_telefone_id, tbl_pessoa_id)
VALUES
    (1, 1), 
    (2, 2), 
    (3, 3), 
    (4, 4), 
	(4,8),
    (5, 5),
	(7,5) ,
    (6, 6);
    
    INSERT INTO tbl_especialidade_has_tbl_funcionario (tbl_especialidade_id, tbl_funcionario_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);
    
    INSERT INTO tbl_prontuario (diagnostico, medicacao, tbl_consulta_id, tbl_especialidade_id)
VALUES
    ('Gripe comum', 'Analgésico', 1, 1),
    ('Pressão alta', 'Betabloqueador', 2, 2),
    ('Dermatite', 'Creme hidratante', 3, 3);
 
 
    INSERT INTO tbl_consulta (data_agendada, hora, tbl_paciente_id, tbl_funcionario_id)
VALUES
    ('2024-04-15', '10:00:00', 1, 1), 
    ('2024-04-16', '11:30:00', 2, 2), 
    ('2024-04-17', '14:00:00', 3, 3),
    ('2024-04-18', '09:00:00', 3, 1), 
    ('2024-04-19', '15:30:00', 1, 2), 
    ('2024-04-20', '16:30:00', 2, 3);