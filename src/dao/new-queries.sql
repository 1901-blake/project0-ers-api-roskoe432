/* Select user with role */
select
u.userid as "id",
u.username,
u."password",
u.firstname, 
u.lastname,
u.email,
u."role" as "roleid",
r."role"
from "user" as u 
inner join 
"role" as r
on u."role" = r.roleid;


/* Select reimbursement with joins */
select 
r.reimbursementid as "id",
r.author as "authorid",
r.amount,
r.datesubmitted as "submitted",
r.dateresolved as "resolved",
r.description as "desc",
r.resolver as "resolverid",
r.status as "statusid",
r."type" as "typeid",
u.username as "authorname",
u2.username as "resolvername",
s.status as "statusname", 
t."type" as "typename"
from reimbursement as r
    join "user" as u
        on u.userid = r.author
    join "user" as u2
    	on u2.userid = r.resolver
    join reimbursementstatus as s
        on s.statusid = r.status
    join reimbursementtype as t
        on t.typeid = r."type";
