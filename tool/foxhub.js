/**
 * CLI commands
 * 
 * [app] ─────> [config-----] ─────> [read-------]
 *         |                    └──> [write------]
 *         └──> [instructors] ═════> [n|name]
 *         └──> [students---] ═════> [n|name, b|batch]
 *         └──> [tasks------] ─────> [list-------] ═════> [w|week]
 *                              └──> [unreviewed-] ═════> [n|student_name, w|week]
 *                              └──> [reviewed---] ═════> [n|student_name, w|week]
 *                              └──> [review-----] ═════> [s|score, f|feedback, i|instructor_id, t|task_id]
 * Legend:
 * ─── = command
 * ═══ = option
 */

const constants = require('./src/constants');
const appConf = require('./src/config');
const appTask = require('./src/tasks');

const yargs = require('yargs')
  .usage('usage: $0 <command>')

  .command('config', 'Configure database setting', (y) => {
    argv = y
      .usage('usage: $0 config <command> [options]')
      .command('read', 'Read database config file', () => { }, (y) => {
        appConf.read(true); // Call read database config function
      })
      .command('write', 'Write database config file', () => { }, (y) => {
        appConf.write(); // Call write database config function
      })
      .demandCommand(1, 1, constants.yargsDemandOneCommand)
  })

  .command('instructors', 'Search instructors', (y) => {
    argv = y
      .usage('usage: $0 instructors [options]')
      .option('n', {
        alias: 'name',
        description: 'Instructor name',
        type: 'string',
        nargs: 1,
        demandOption: false
      })
      .check((argv) => {
        if (argv.name && !isNaN(argv.name)) {
          throw (new Error(constants.yargsArgvCheckFailed));
        }
        return true;
      })
  }, (y) => {
    appTask.listInstructors(y);
  })

  .command('students', 'Search students', (y) => {
    argv = y
      .usage('usage: $0 students [options]')
      .option('n', {
        alias: 'name',
        description: 'Student name',
        type: 'string',
        nargs: 1,
        demandOption: false
      })
      .option('b', {
        alias: 'batch',
        description: 'Student batch name',
        type: 'string',
        nargs: 1,
        demandOption: false
      })
      .check((argv) => {
        if (argv.name && !isNaN(argv.name)) {
          throw (new Error(constants.yargsArgvCheckFailed));
        }
        if (argv.batch && !isNaN(argv.batch)) {
          throw (new Error(constants.yargsArgvCheckFailed));
        }
        return true;
      })
  }, (y) => {
    appTask.listStudents(y);
  })

  .command('tasks', 'Do something about tasks on FoxHub', (y) => {
    argv = y
      .usage('usage: $0 tasks <command> [options]')
      .command('list', 'List all tasks on FoxHub', (y) => {
        argv = y
          .option('w', {
            alias: 'week',
            description: 'Week',
            type: 'number',
            nargs: 1,
            demandOption: false
          })
          .check((argv) => {
            if (argv.week && isNaN(argv.week)) {
              throw (new Error(constants.yargsArgvCheckFailed));
            }
            return true;
          })
      }, (y) => {
        appTask.listTasks(y);
      })
      .command('unreviewed', 'List all unreviewed tasks on FoxHub', (y) => {
        argv = y
          .option('n', {
            alias: 'student_name',
            description: 'Student name',
            type: 'string',
            nargs: 1,
            demandOption: false
          })
          .option('w', {
            alias: 'week',
            description: 'Week',
            type: 'number',
            nargs: 1,
            demandOption: false
          })
          .check((argv) => {
            if (!argv.student_name && !argv.week) {
              throw (new Error(constants.yargsDemandAtLeastOneOption));
            }
            if (argv.student_name && !isNaN(argv.student_name)) {
              throw (new Error(constants.yargsArgvCheckFailed));
            }
            if (argv.week && isNaN(argv.week)) {
              throw (new Error(constants.yargsArgvCheckFailed));
            }
            return true;
          })
      }, (y) => {
        appTask.unreviewedTasks(y);
      })

      .command('reviewed', 'List all reviewed tasks on FoxHub', (y) => {
        argv = y
          .option('n', {
            alias: 'student_name',
            description: 'Student name',
            type: 'string',
            nargs: 1,
            demandOption: true
          })
          .option('w', {
            alias: 'week',
            description: 'Week',
            type: 'string',
            nargs: 1,
            demandOption: false
          })
          .check((argv) => {
            if (argv.student_name && !isNaN(argv.student_name)) {
              throw (new Error(constants.yargsArgvCheckFailed));
            }
            if (argv.week && isNaN(argv.week)) {
              throw (new Error(constants.yargsArgvCheckFailed));
            }
            return true;
          })
      }, (y) => {
        appTask.reviewedTasks(y);
      })

      .command('review', 'Review a task on FoxHub by its ID', (y) => {
        argv = y
          .option('s', {
            alias: 'score',
            description: 'Task score',
            type: 'number',
            nargs: 1,
            demandOption: true
          })
          .option('f', {
            alias: 'feedback',
            description: 'Task feedback',
            type: 'string',
            nargs: 1,
            demandOption: true
          })
          .option('i', {
            alias: 'instructor_id',
            description: 'Instructor ID',
            type: 'number',
            nargs: 1,
            demandOption: true
          })
          .option('t', {
            alias: 'task_id',
            description: 'Task ID',
            type: 'number',
            nargs: 1,
            demandOption: true
          })
          .check((argv) => {
            if (!isNaN(argv.score) && isNaN(argv.feedback) && !isNaN(argv.instructor_id) && !isNaN(argv.task_id)) {
              return true;
            } else {
              throw (new Error(constants.yargsArgvCheckFailed));
            }
          })
      }, (y) => {
        appTask.reviewTask([y.score, y.feedback, y.instructor_id, y.task_id]);
      })
      .demandCommand(1, 1, constants.yargsDemandOneCommand)
  })

  .demandCommand(1, 1, constants.yargsDemandOneCommand)
  .help('help')
  .wrap(null)
  .argv