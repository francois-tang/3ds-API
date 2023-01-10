//const chalk = require("chalk");
//const ora = require("ora");
const oracledb = require('oracledb');
const config = require('config');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


const   fs          = require('fs');

const   myUser      = config.get("oracleDB.name");
const   mypw        = config.get("oracleDB.mdp");
const   host        = config.get("oracleDB.address");

// Oracle libaries
try {
  oracledb.initOracleClient({libDir: 'C:\\Users\\FTG1\\Documents\\Projects\\API\\instantclient_21_8'});
} catch (err) {
  console.error('Can\'t find Oracle Client libraries');
  console.error(err);
  process.exit(1);
}

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection( {
      user          : myUser,
      password      : mypw,
      connectString : host
    });

    const result = await connection.execute(
      `SELECT *
      FROM MDA_ODS.EMAIL_PERF_ODS
      WHERE YEAR = '2023'`
    );
    var json = JSON.stringify(result.rows);

    fs.writeFile('C:/Users/FTG1/Desktop/test.json', json, 'utf8', function(erreur) {
      if (erreur) {
          console.log(erreur)};
      console.log("File has been created");    
  })

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run()

module.exports = oracledb.connection;