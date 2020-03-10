-- select challenges by week
select id as challenge_id,
       tag as challenge_week,
       title as challenge_title
from challenges
where lower(tag) like '%' || '2' || '%';

-- select tasks needed to be evaluated by batch name and week
select id as submission_id,
       "createdAt" as submitted_at,
       user_id,
       user_name,
       batch_name,
       challenge_week,
       challenge_title,
       link as answer
from tasks
join (select users.id as user_id,
             users.name as user_name,
             batches.name as batch_name
      from users
      join roles
      on users.id_role = roles.id
      join batches
      on users.id_batch_current = batches.id
      where lower(roles.name) like '%' || 'student' || '%'
      and lower(batches.name) like '%' || 'prime' || '%') as batchStudents
on tasks.id_user = batchStudents.user_id
join (select id as challenge_id,
             tag as challenge_week,
             title as challenge_title,
             material as challenge_material
      from challenges
      where tag like '%' || '3' || '%') as weekChallenge
on tasks.id_challenge = weekChallenge.challenge_id
where score is null
order by user_id, submitted_at asc;

-- select tasks by challenge id, batch name and week
select id as submission_id,
       "createdAt" as submitted_at,
       user_id,
       user_name,
       batch_name,
       challenge_week,
       challenge_title,
       link as answer,
       score,
       instructor_name,
       feedback
from tasks
join (select users.id as user_id,
             users.name as user_name,
             batches.name as batch_name
      from users
      join roles
      on users.id_role = roles.id
      join batches
      on users.id_batch_current = batches.id
      where lower(roles.name) like '%' || 'student' || '%'
      and lower(batches.name) like '%' || 'prime' || '%') as batchStudents
on tasks.id_user = batchStudents.user_id
join (select id as challenge_id,
             tag as challenge_week,
             title as challenge_title,
             material as challenge_material
      from challenges
      where id = '113') as weekChallenge
on tasks.id_challenge = weekChallenge.challenge_id
left join (select users.id instructor_id,
           users.name as instructor_name
           from users
           join roles
           on users.id_role = roles.id
           where lower(roles.name) like '%' || 'instructor' || '%') as instructor
on tasks.id_instructor = instructor.instructor_id
order by user_id, submitted_at asc;

-- select tasks by challenge name, batch name and week
select id as submission_id,
       "createdAt" as submitted_at,
       user_id,
       user_name,
       batch_name,
       challenge_week,
       challenge_title,
       link as answer,
       score,
       instructor_name,
       feedback
from tasks
join (select users.id as user_id,
             users.name as user_name,
             batches.name as batch_name
      from users
      join roles
      on users.id_role = roles.id
      join batches
      on users.id_batch_current = batches.id
      where lower(roles.name) like '%' || 'student' || '%'
      and lower(batches.name) like '%' || 'prime' || '%') as batchStudents
on tasks.id_user = batchStudents.user_id
join (select id as challenge_id,
             tag as challenge_week,
             title as challenge_title,
             material as challenge_material
      from challenges
      where lower(title) like '%' || 'case' || '%') as weekChallenge
on tasks.id_challenge = weekChallenge.challenge_id
left join (select users.id instructor_id,
           users.name as instructor_name
           from users
           join roles
           on users.id_role = roles.id
           where lower(roles.name) like '%' || 'instructor' || '%') as instructor
on tasks.id_instructor = instructor.instructor_id
order by user_id, submitted_at asc;

-- Task scoring by id
update  tasks
        -- Score
set     score = 100,
        -- Feedback
        feedback = 'Good Job!',
        -- Instructor's ID (Daniel is 783)
        id_instructor = 783
        -- Task's ID (Submission's ID)
where   id = 43855;
commit;

SELECT id, name,
SUM (CASE cid WHEN 163 THEN score ELSE 0 END) AS passgen,
SUM (CASE cid WHEN 160 THEN score ELSE 0 END) AS highscore,
SUM (CASE cid WHEN 145 THEN score ELSE 0 END) AS shop,
SUM (CASE cid WHEN 146 THEN score ELSE 0 END) AS tokox,
ROUND(AVG (score)) AS average
	FROM ( SELECT u.id, u.name, t.score, t.id_challenge as cid,
	ROW_NUMBER() OVER (PARTITION BY t.id_challenge, t.id_user ORDER BY t."createdAt") as upload
	FROM users u left join tasks t on t.id_user = u.id )
	AS rawData
WHERE id BETWEEN 745 and 779
And cid in (163, 160, 145, 146, 1)
AND upload = 1
GROUP by id, name