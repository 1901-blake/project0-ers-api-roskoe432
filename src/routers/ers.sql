create table "user" (
	userId serial primary key,
	username text not null unique,
	"password" text not null,
	firstname text not null,
	lastname text not null,
	"role" integer not null -- fk_role
);

create table "role" (
	roleId serial primary key,
	"role" text not null unique
);

create table reimbursement_status (
	statusId serial primary key,
	status text not null unique
);

create table reimbursement_type (
	typeId serial primary key,
	"type" text not null unique
);

create table reimbursement (
	reimbursementId serial primary key,
	author integer not null, -- fk_author
	amount money not null,
	dateSubmitted integer not null,
	dateResolved integer not null,
	description text not null,
	resolver integer not null, -- fk_resolver
	status integer not null, -- fk_status
	"type" integer not null -- fk_type
);

--| Create Foreign Keys |----------------------------------------------------------

alter table "user" add constraint fk_role
	foreign key ("role") references "role" (roleId) 
	on delete no action on update no action;

alter table reimbursement add constraint fk_resolver
    foreign key (resolver) references "user" (userId)
    on delete no action on update no action;

alter table reimbursement add constraint fk_status
    foreign key (status) references reimbursement_status (statusId)
    on delete no action on update no action;

alter table reimbursement add constraint fk_type
    foreign key ("type") references reimbursement_type (typeId)
    on delete no action on update no action;
   
alter table reimbursement add constraint fk_author
	foreign key (author) references "user" (userId)
	on delete no action on update no action;
	

