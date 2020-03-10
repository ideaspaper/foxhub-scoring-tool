/**
 * Database configuration file
 */
const dbConfFile = './src/db_conf.json';

/**
 * yargs messages
 */
const yargsArgvCheckFailed = 'Arguments check failed';
const yargsDemandOneCommand = 'You need exactly one command';
const yargsDemandAtLeastOneOption = 'You need at least one option';

/**
 * fs messages
 */
const fsFileNotFound = 'file not found';

/**
 * Ora messages and configurations
 */
const oraSpinner = 'dots';
const oraLoading = 'Loading';
const oraDone = 'Done';
const oraError = 'Error';

module.exports = {
  dbConfFile,
  yargsArgvCheckFailed,
  yargsDemandOneCommand,
  yargsDemandAtLeastOneOption,
  fsFileNotFound,
  oraSpinner,
  oraLoading,
  oraDone,
  oraError
};