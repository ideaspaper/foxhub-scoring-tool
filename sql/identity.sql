-- select students
select users.id,
       users.name,
       users.email,
       users.github,
       users.id_batch_register,
       users.id_batch_current,
       users.id_slack
from users
join roles
on users.id_role = roles.id
where lower(roles.name) like '%' || 'student' || '%';

-- select students by students name and batches name
select users.id as id,
       users.name as name,
       batches.name as batch
from users
join roles
on users.id_role = roles.id
join batches
on users.id_batch_current = batches.id
where lower(roles.name) like '%' || 'student' || '%'
and lower(batches.name) like '%' || 'prime' || '%'
and lower(users.name) like '%' || 'michael' || '%';

-- select students by name
select users.id as id,
       users.name as name,
       users.email as email,
       users.github as github,
       users.id_batch_register,
       users.id_batch_current,
       users.id_slack as slack
from users
join roles
on users.id_role = roles.id
where lower(roles.name) like '%' || 'student' || '%'
and lower(users.name) like '%' || 'harefa' || '%';

-- select instructors
select * from users
join roles
on users.id_role = roles.id
where lower(roles.name) like '%' || 'instructor' || '%';

-- select instructors by name
select * from users
join roles
on users.id_role = roles.id
where lower(roles.name) like '%' || 'instructor' || '%'
and lower(users.name) like '%' || 'daniel' || '%';