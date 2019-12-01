create schema if not exists todo;

create table category (
  id serial primary key,
  "name" varchar(255) not null
);

create table "user" (
  id serial primary key,
  "name" varchar(255) not null
);

create table todo (
  id serial primary key,
  description text not null,
  completed boolean default false,
  trash boolean default false,
  category_id serial references category(id) on delete cascade,
  user_id serial references "user"(id) on delete cascade
);

-- serve per modificare la struttura della tabella, modifico user_id (non può essere null)
ALTER TABLE todo ALTER COLUMN user_id SET NOT NULL;

-- creare nuovo utente
insert into "user" ("name") values ('Laura'),('Stefano');

-- cercare nel campo name della tabella user
select * from "user" where name like '%fan%';

insert into category ("name") values ('Mestieri di casa');

-- eliminare category per id
delete from category where id in (3,4);

-- modificare name category 
update category set name = 'Lavoro' where name = 'hgfdsa';

-- creare todoooo
insert into todo (description, category_id, user_id)
values ('Pulire il bagno', 1, 1), ('Comprare la carta igienica', 2, 2);

-- unisco più tabelle tra di loro attraverso category_id e user_id
select t.id, t.description, c."name", u."name"
from todo t
join category c on t.category_id = c.id
join "user" u on t.user_id = u.id;

