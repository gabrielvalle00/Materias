/* DDL - Criação de estrutura:
   Banco de dados
   Tabelas originadas na normalização;
   Chaves;
*/


create database loja;

use loja;

CREATE TABLE tbl_cliente(
	id INT NOT NULL AUTO_INCREMENT,
    cpf varchar(45) not null ,
	nome VARCHAR(45) NOT NULL,
    sobrenome varchar(45) not null,
	PRIMARY KEY (id)
  );


CREATE TABLE tbl_entregador(
	id INT NOT NULL AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
    sobrenome varchar(45) not null,
    veiculo varchar(45) not null, 
	PRIMARY KEY (id)
  );
  
  
  CREATE TABLE tbl_produto(
	id INT NOT NULL AUTO_INCREMENT,
	nome_produto VARCHAR(45) NOT NULL,
    preco_unitario double not null,
	PRIMARY KEY (id)
  );
  
  
  CREATE TABLE tbl_contatos(
	id INT NOT NULL AUTO_INCREMENT,
	id_cliente int NOT NULL,
    telefone varchar(19) not null,
	PRIMARY KEY (id),
    constraint fk_cliente_telefone foreign key (id_cliente) references tbl_cliente(id)
  );
  
  
   CREATE TABLE tbl_endereco(
	id INT NOT NULL AUTO_INCREMENT,
	id_cliente int NOT NULL,
    cep varchar(19) not null,
    numero int not null,
    complemento varchar (45),
	PRIMARY KEY (id),
    constraint fk_cliente_endereco foreign key (id_cliente) references tbl_cliente(id)
  );
  
  
   CREATE TABLE tbl_pedido(
	id INT NOT NULL AUTO_INCREMENT,
	id_cliente int NOT NULL,
    id_entregador int not null,
    id_produto int not null,
    data_pedido date not null,
    hora_pedido time not null,
    hora_entrega time not null,
    hora_fim time not null,
    quantidade int not null,
	PRIMARY KEY (id),
    constraint fk_cliente_pedido foreign key (id_cliente) references tbl_cliente(id),
    constraint fk_entregador_pedido foreign key (id_entregador) references tbl_entregador(id),
    constraint fk_peoduto_pedido foreign key (id_produto) references tbl_produto(id)
  );
  
desc tbl_pedido;


-- Populando as tabelas


insert ignore into tbl_cliente (cpf, nome, sobrenome) values 
('838.879.271-76','Antônio','Custódio '),
('282.794.051-51','Bruna','Oliveira Neto'),
('714.626.501-39','Carla','Silva '),
('101.346.425-70','Carlos','Silva '),
('829.070.043-10','Evandro','Oliveira '),
('455.745.981-16','James','Armstrong '),
('894.979.642-26','Luis','Filho Teixeira'),
('199.535.473-27','Paula','Custódio Mattos'),
('164.684.026-70','Tatiane','Oliveira Teixeira'),
('484.584.060-04','Tatiane','Silva Souza');
 
select * from  tbl_cliente;


insert ignore into tbl_entregador (nome, sobrenome, veiculo) values 
('Pedro' ,'henrique','moto'),
('Thiago','filho','moto'),
('Vítor','hugo','moto'),
('Erivaldo','souza','bicicleta');

select * from  tbl_entregador;


insert ignore into tbl_contatos (id_cliente, telefone) values 
('1','19-26713-0996'),
('2','19-23779-0730'),
('2','19-65099-7930'),
('3','19-70369-6223'),
('4','19-26629-1637'),
('4','19-04200-6656'),
('5','19-08540-4259'),
('5','19-43807-6196'),
('5','19-81435-9997'),
('6','19-21656-6673'),
('7','19-82890-0575'),
('8','19-68006-4771'),
('9','19-84570-8790'),
('10','19-23800-1397');


select * from  tbl_contatos;



insert ignore into tbl_produto (nome_produto, preco_unitario) values 
('Refrigerante - 2L','12'),
('Refrigerante - Lata','6'),
('X-Bacon','18'),
('X-Burguer','15'),
('X-Egg','17'),
('X-Frango','20'),
('X-Tudo','22');


select * from  tbl_produto;


insert ignore into tbl_endereco (id_cliente, cep, numero, complemento) values 
('1','13178-414','769','frente'),
('2','13178-404','93',''),
('3','13177-412','249','AP14 BL24'),
('4','13180-414','140',''),
('5','13180-413','536','AP44 BL10'),
('6','13170-409','776','fundos'),
('7','13182-412','400','Casa A'),
('8','13180-410','886','fundos'),
('9','13178-408','488',''),
('10','13178-411','47','AP26 BL12');

select * from  tbl_endereco;


insert ignore into tbl_pedido (id_cliente, id_entregador, id_produto, data_pedido, hora_pedido, hora_entrega, hora_fim, quantidade) values 
('4','1','4','2023-12-01','17:30:00','18:03:00','','2'),
('6','1','1','2023-12-02','17:30:00','19:03:00','','1'),
('3','2','3','2023-12-03','17:30:00','20:03:00','','2'),
('5','2','7','2023-12-04','17:30:00','21:03:00','','3'),
('9','1','2','2023-12-05','17:30:00','18:03:00','','1'),
('5','1','5','2023-12-06','17:30:00','19:03:00','','3'),
('3','1','2','2023-12-07','17:30:00','20:03:00','','1'),
('9','1','4','2023-12-08','17:30:00','21:03:00','','3'),
('5','1','6','2023-12-09','17:30:00','18:03:00','','1'),
('3','1','2','2023-12-10','17:30:00','19:03:00','','2'),
('9','1','6','2023-12-11','17:30:00','20:03:00','','2'),
('7','1','4','2023-12-12','17:30:00','21:03:00','','3'),
('3','2','1','2023-12-13','17:30:00','18:03:00','','3'),
('9','2','1','2023-12-14','17:30:00','19:03:00','','3'),
('4','2','6','2023-12-15','17:30:00','22:30:00','','1'),
('1','2','1','2023-12-16','17:30:00','21:03:00','','3'),
('3','2','1','2023-12-17','17:30:00','18:03:00','','2'),
('2','2','3','2023-12-18','17:30:00','19:03:00','','2'),
('10','2','7','2023-12-19','17:30:00','20:03:00','','3'),
('4','3','5','2023-12-20','17:30:00','21:03:00','','2'),
('2','3','3','2023-12-21','17:30:00','18:03:00','','2'),
('3','3','5','2023-12-22','17:30:00','19:03:00','','2'),
('8','3','2','2023-12-23','17:30:00','23:03:00','','2'),
('2','3','1','2023-12-24','17:30:00','21:03:00','','1'),
('5','3','5','2023-12-25','17:30:00','18:03:00','','3'),
('9','3','5','2023-12-26','17:30:00','18:55:00','','1'),
('2','4','6','2023-12-27','17:30:00','19:03:00','','3'),
('3','4','3','2023-12-28','17:30:00','20:03:00','','3'),
('4','4','2','2023-12-29','17:30:00','22:05:00','','1');


select * from tbl_pedido;

-- Selecione todos os pedidos de um determinado cliente;

select * from tbl_pedido
where id_cliente= 4;

-- Altere a hora_fim de todos os pedidos para 23h45;

update tbl_pedido set hora_fim = '23:45';

-- Selecione em ordem crescente o total de pedido por entregadores (agrupar por entregadores e somar total de pedidos);

SELECT tbl_entregador.nome, count(tbl_pedido.id_entregador) as 'Total de entregas'
FROM tbl_pedido
join
tbl_entregador on tbl_pedido.id_entregador = tbl_entregador.id
group by tbl_pedido.id_entregador 
order by count(tbl_pedido.id_entregador) asc;

-- Selecione em ordem crescente o total de pedido por clientes (agrupar por clientes e somar total de pedidos);

SELECT tbl_cliente.nome, count(tbl_pedido.id_cliente) as 'Total de pedidos'
FROM tbl_pedido
join
tbl_cliente on tbl_pedido.id_cliente = tbl_cliente.id
group by tbl_pedido.id_cliente 
order by count(tbl_pedido.id_cliente) asc;

-- Excluir o último registro do cliente Evandro Oliveira (selecione todos os pedidos ordenando por data para ver qual é o último);

select * from tbl_pedido
where id_cliente=5;

delete from tbl_pedido
where id=25;


-- Excluir o segundo registro do cliente Carlos Silva (selecione todos os pedidos ordenando por data para ver qual é o último);

select * from tbl_pedido
where id_cliente=4;

delete from tbl_pedido
where id=15;