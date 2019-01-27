--| FUNCTIONS & PROCEDURES |----------------------------------------------------------

create or replace function insertUser(p_username text, p_password text, p_firstname text, p_lastname text, p_email text, p_role varchar)
returns void as $$
	declare
		v_id int;
	begin
		select roleid from "role" where "role"."role" = p_role into v_id;
		insert into "user" (username, "password", firstname, lastname, email, "role")
			values (p_username, p_password, p_firstname, p_lastname, p_email, v_id);
	end;
$$ language plpgsql;

create or replace function to_secs(p_date timestamp)
returns int as $$
	declare 
		v_sec int;
	begin
		select extract(epoch from p_date) into v_sec;
		return v_sec;
	end;
$$ language plpgsql;

create or replace function insert_reimbursement(
	p_author int,
	p_amount int,
	p_datesubmitted timestamp,
	p_dateresolved timestamp,
	p_description text,
	p_resolver int,
	p_status int,
	p_type int
)
returns void as $$
	declare
		v_sub int;
		v_res int;
	begin 
		select to_secs(p_datesubmitted) into v_sub;
		select to_secs(p_dateresolved) into v_res;
		insert into reimbursement (author, amount, datesubmitted, dateresolved, description, resolver, status, "type")
			values (p_author, p_amount, v_sub, v_res, p_description, p_resolver, p_status, p_type);
	end;
$$ language plpgsql;

--| TABLES |----------------------------------------------------------

create table "user" (
	userid serial primary key,
	username text not null unique,
	"password" text not null,
	firstname text not null,
	lastname text not null,
	email text not null,
	"role" integer not null -- fk_role
);

create table "role" (
	roleid serial primary key,
	"role" text not null unique
);

create table reimbursementstatus (
	statusid serial primary key,
	status text not null unique
);

create table reimbursementtype (
	typeid serial primary key,
	"type" text not null unique
);

create table reimbursement (
	reimbursementid serial primary key,
	author integer not null, -- fk_author
	amount money not null,
	datesubmitted integer not null,
	dateresolved integer not null,
	description text not null,
	resolver integer not null, -- fk_resolver
	status integer not null, -- fk_status
	"type" integer not null -- fk_type
);

--| FOREIGN KEYS |----------------------------------------------------------

alter table "user" add constraint fk_role
	foreign key ("role") references "role" (roleid) 
	on delete no action on update no action;

alter table reimbursement add constraint fk_resolver
    foreign key (resolver) references "user" (userId)
    on delete no action on update no action;

alter table reimbursement add constraint fk_status
    foreign key (status) references reimbursementstatus (statusid)
    on delete no action on update no action;

alter table reimbursement add constraint fk_type
    foreign key ("type") references reimbursementtype (typeid)
    on delete no action on update no action;
   
alter table reimbursement add constraint fk_author
	foreign key (author) references "user" (userid)
	on delete no action on update no action;
	
--| INSERTIONS |----------------------------------------------------------

insert into "role" ("role") values ('admin');
insert into "role" ("role") values ('finance manager');
insert into "role" ("role") values ('associate');

insert into reimbursementstatus (status) values ('pending');
insert into reimbursementstatus (status) values ('approved');
insert into reimbursementstatus (status) values ('denied');

insert into reimbursementtype ("type") values ('lodging');
insert into reimbursementtype ("type") values ('travel');
insert into reimbursementtype ("type") values ('food');
insert into reimbursementtype ("type") values ('other');

select insertUser('bsnow32', 'booger47', 'ben', 'snow', 'bsnow@gmail.com', 'admin');
select insertUser('John', 'fmadmin', 'John', 'Doe', 'jd@gmail.com', 'finance manager');
select insertUser('Larry', 'password', 'Larry', 'Fine', 'larry@gmail.com', 'associate');
select insertUser('Curly', 'password', 'Curly', 'Howard', 'curly@gmail.com', 'associate');
select insertUser('Moe', 'password', 'Moe', 'Howard', 'moe@gmail.com', 'associate');

select insert_reimbursement(3, 1000, '2019-01-01 08:00:00', '2019-01-01 09:30:00', 'For my flip flops', 2, 3, 3);
select insert_reimbursement(4, 200, '2019-01-04 10:30:00', '1970-01-01', 'Gas Expenses', 2, 1, 2);
select insert_reimbursement(5, 75, '2019-01-10 08:00:00', '2019-01-11 08:00:00', 'Hotel Stay', 2, 2, 1);
select insert_reimbursement(3, 10000, '2019-01-11 12:00:00', '2019-01-11 12:01:00', 'Tooth Brush', 2, 3, 4);

-- drop table reimbursement;
-- drop table "user";
-- drop table reimbursementstatus;
-- drop table reimbursementtype;
-- drop table "role";