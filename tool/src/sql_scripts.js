/**
 * Select instructors
 */
const listInstructors = function (paramsKeys) {
  let customSqls = {};
  for (let i = 1, limit = paramsKeys.length; i <= limit; i++) {
    if (paramsKeys[i - 1] === 'name') {
      customSqls['custom1'] = `and lower(users.name) like '%' || $${i} || '%'`;
    }
  }

  let sql = `
    select users.id,
           users.name,
           users.email,
           users.github
    from users
    join roles
    on users.id_role = roles.id
    where 1 = 1
    and lower(roles.name) like '%' || 'instructor' || '%'
    ${customSqls.custom1 || ''}
    order by users.name asc;`;

  return sql;
};

/**
 * Select students
 */
const listStudents = function (paramsKeys) {
  let customSqls = {};
  for (let i = 1, limit = paramsKeys.length; i <= limit; i++) {
    if (paramsKeys[i - 1] === 'name') {
      customSqls['custom1'] = `and lower(users.name) like '%' || $${i} || '%'`;
    } else if (paramsKeys[i - 1] === 'batch') {
      customSqls['custom2'] = `and lower(batches.name) like '%' || $${i} || '%'`;
    }
  }

  let sql = `
    select users.id as id,
           batches.name as batch_name,
           users.name as name,
           users.email as email
    from users
    join roles
    on users.id_role = roles.id
    join batches
    on users.id_batch_current = batches.id
    where 1 = 1
    and lower(roles.name) like '%' || 'student' || '%'
    ${customSqls.custom1 || ''}
    ${customSqls.custom2 || ''}
    order by users.name asc;`;

  return sql;
};

/**
 * Select tasks
 */
const listTasksByWeek = function (paramsKeys) {
  let customSqls = {};
  for (let i = 1, limit = paramsKeys.length; i <= limit; i++) {
    if (paramsKeys[i - 1] === 'week') {
      customSqls['custom1'] = `and tag like '%' || $${i} || '%'`;
    }
  }

  let sql = `
    select id as challenge_id,
           tag as challenge_week,
           title as challenge_title
    from challenges
    where 1 = 1
    ${customSqls.custom1 || ''}
    order by tag, id asc;`;

  return sql;
};

/**
 * Select unreviewed tasks
 */
const unreviewedTasks = function (paramsKeys) {
  let customSqls = {};
  for (let i = 1, limit = paramsKeys.length; i <= limit; i++) {
    if (paramsKeys[i - 1] === 'week') {
      customSqls['custom1'] = `and tag like '%' || $${i} || '%'`;
    } else if (paramsKeys[i - 1] === 'student_name') {
      customSqls['custom2'] = `and lower(user_name) like '%' || $${i} || '%'`;
    }
  }

  let sql = `
    select id as submission_id,
           "createdAt" as submitted_at,
           challenge_id,
           challenge_title,
           user_name,
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
          where 1 = 1
          and lower(roles.name) like '%' || 'student' || '%') as batchStudents
    on tasks.id_user = batchStudents.user_id
    join (select id as challenge_id,
                 tag as challenge_week,
                 title as challenge_title,
                 material as challenge_material
          from challenges
          where 1 = 1
          ${customSqls.custom1 || ''}) as weekChallenge
    on tasks.id_challenge = weekChallenge.challenge_id
    where 1 = 1
    and score is null
    ${customSqls.custom2 || ''}
    order by user_id, submitted_at asc;`;

  return sql;
};

/**
 * Select reviewed tasks
 */
const reviewedTasks = function (paramsKeys) {
  let customSqls = {};
  for (let i = 1, limit = paramsKeys.length; i <= limit; i++) {
    if (paramsKeys[i - 1] === 'student_name') {
      customSqls['custom1'] = `and lower(users.name) like '%' || $${i} || '%'`;
    } else if (paramsKeys[i - 1] === 'week') {
      customSqls['custom2'] = `and tag like '%' || $${i} || '%'`;
    }
  }

  let sql = `
    select id as submission_id,
           "createdAt" as submitted_at,
           user_id,
           user_name,
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
          where 1 = 1
          and lower(roles.name) like '%' || 'student' || '%'
          ${customSqls.custom1 || ''}) as batchStudents
    on tasks.id_user = batchStudents.user_id
    join (select id as challenge_id,
                 tag as challenge_week,
                 title as challenge_title,
                 material as challenge_material
          from challenges
          where 1 = 1
          ${customSqls.custom2 || ''}) as weekChallenge
    on tasks.id_challenge = weekChallenge.challenge_id
    left join (select users.id instructor_id,
                      users.name as instructor_name
               from users
               join roles
               on users.id_role = roles.id
               where 1 = 1
               and lower(roles.name) like '%' || 'instructor' || '%') as instructor
    on tasks.id_instructor = instructor.instructor_id
    where 1 = 1
    and score is not null
    order by user_id, submitted_at asc;`

  return sql;
};

/**
 * Updating score, feedback, and id instructor on a task by its submission id (scoring)
 */
const reviewTask = `
update  tasks
set     score = $1,
        feedback = $2,
        id_instructor = $3
where   id = $4;`;

/**
 * COMMIT changes to database
 */
const commit = 'commit;';

module.exports = {
  listStudents,
  listInstructors,
  listTasksByWeek,
  unreviewedTasks,
  reviewedTasks,
  reviewTask,
  commit
};