create table user (
	userId serial primary key,
	username text not null unique,
	password text not null,
	firstname text not null,
	lastname text not null,
	role: integer not null -- Role Object
);

create table role (
	roleId serial primary key,
	role text unique
);

create table reimbursement_status (
	statusId serial primary key,
	status text not null unique
);

create table reimbursement_type (
	typeId serial primary key,
	type text not null unique
);

create table reimbursement (
	reimbursementId serial primary key,
	author integer not null,
	amount money not null,
	dateSubmitted timestamp not null,
	dateResolved timestamp not null,
	description text not null,
	resolver integer, -- Foreign Key To User
	status integer, -- Foreign Key To Reimbursement Status
	type integer -- Foreign Key To Reimbursement Type
);

--| Create Foreign Keys |----------------------------------------------------------

-- Reimbursement Table Keys
alter table reimbursement add constraint fk_resolver
    foreign key (reimbursement.resolver) references user (userId)
    on delete no action on update no action;

alter table reimbursement add constraint fk_status
    foreign key (reimbursement.status) references reimbursement_status (statusId)
    on delete no action on update no action;

alter table reimbursement add constraint fk_type
    foreign key (reimbursement.type) references reimbursement_type (typeId)
    on delete not action on update no action;

-- Possible Other Keys

-- User Table Keys
-- alter table user add constraint fk_role
-- 	foreign key (user.role) references role (roleId) 
--     on delete no action on update no action;

