const constants = require('./constants');
const sqlScripts = require('./sql_scripts');
const appConf = require('./config');
const dbParams = appConf.read();
const { Client } = require('pg')
const ora = require('ora');

const client = new Client({
  user: dbParams.user,
  host: dbParams.host,
  database: dbParams.database,
  password: dbParams.password,
  port: dbParams.port
})

const spinner = ora();
spinner.spinner = constants.oraSpinner;

module.exports = {
  listInstructors,
  listStudents,
  listTasks,
  unreviewedTasks,
  reviewedTasks,
  reviewTask
};

function helperParams(params) {
  let paramsKeys = Object.keys(params).filter(param => param.length > 1 && param !== '$0');
  let paramsArr = [];
  for(let i = 0, limit = paramsKeys.length; i < limit; i++) {
    paramsArr.push(params[paramsKeys[i]])
  }
  return [paramsKeys, paramsArr];
}

function helperOutput(err, res, table) {
  if (!err) {
    spinner.succeed(constants.oraDone);
    table ? console.table(res.rows) : console.log(res.rows);
  } else {
    spinner.fail(constants.oraError);
    throw (new Error(err));
  }
}

function helperSelect(script, param = [], table = true) {
  spinner.start(constants.oraLoading);
  client.connect();
  client.query(script, param, (err, res) => {
    helperOutput(err, res, table);
    client.end();
  })
}

function listInstructors(params) {
  let keysAndArr = helperParams(params);
  helperSelect(sqlScripts.listInstructors(keysAndArr[0]), keysAndArr[1]);
}

function listStudents(params) {
  let keysAndArr = helperParams(params);
  helperSelect(sqlScripts.listStudents(keysAndArr[0]), keysAndArr[1]);
}

function listTasks(params) {
  let keysAndArr = helperParams(params);
  helperSelect(sqlScripts.listTasksByWeek(keysAndArr[0]), keysAndArr[1]);
}

function unreviewedTasks(params) {
  let keysAndArr = helperParams(params);
  helperSelect(sqlScripts.unreviewedTasks(keysAndArr[0]), keysAndArr[1], false);
}

function reviewedTasks(params) {
  let keysAndArr = helperParams(params);
  helperSelect(sqlScripts.reviewedTasks(keysAndArr[0]), keysAndArr[1], false)
}

function reviewTask(params) {
  spinner.start(constants.oraLoading);
  client.connect();
  client.query(sqlScripts.reviewTask, params, (err) => {
    if (err) {
      spinner.fail(constants.oraError);
      throw (new Error(err));
    }
  });
  client.query(sqlScripts.commit, (err) => {
    if (err) {
      spinner.fail(constants.oraError);
      throw (new Error(err));
    }
    spinner.succeed(constants.oraDone);
    client.end();
  });
}
