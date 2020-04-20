create user marcelo identified by 1234;
grant connect to marcelo;
grant all privileges to marcelo;

CREATE TABLE produto(
	id INTEGER,
	nome varchar(100),
	descricao varchar(100),
	valor decimal,
	CONSTRAINT produto_pk PRIMARY KEY (id)
);


CREATE SEQUENCE produto_seq
  MINVALUE 1
  MAXVALUE 999999999999999999999999999
  START WITH 1
  INCREMENT BY 1
  CACHE 20;

insert into produto values (PRODUTO_SEQ.nextval, 'notebook', 'ideapad330s',3700);
insert into produto values (PRODUTO_SEQ.nextval, 'smartphone', 'Huawei Mate 10 Pro',3000);
insert into produto values (PRODUTO_SEQ.nextval, 'Mesa', 'Mesa de Vidro',500);