//const chalk = require("chalk");
//const ora = require("ora");
const oracledb = require('oracledb');
const config = require('config');
const fs = require('fs');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Configuration du fichier
const request = config.get("projectEmailPerformance.request");
const fileDestination = config.get("projectEmailPerformance.fileDestination");
const fileName = config.get("projectEmailPerformance.fileName");

// Configuration du serveur Oracle
const userName = config.get("oracleDB_MDA_ODS_PRD.name");
const userPassword = config.get("oracleDB_MDA_ODS_PRD.mdp");
const hostName = config.get("oracleDB_MDA_ODS_PRD.address");

// Oracle libaries
try {
  oracledb.initOracleClient({libDir: './instantclient_21_8'});
} catch (err) {
  console.error('Can\'t find Oracle Client libraries');
  console.error(err);
  process.exit(1);
}

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection({
      user : userName,
      password : userPassword,
      connectString : hostName
    });
    console.log("Connection at " + userName + " done");  

    const result = await connection.execute(
      request
    );
    console.log("Request " + request + " done");  
    var json = JSON.stringify(result.rows);

    fs.writeFile(fileDestination + fileName, json, 'utf8', function(erreur) {
      if (erreur) {
          console.log(erreur)};
      console.log("File " + fileName + " has been created at " + fileDestination);    
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