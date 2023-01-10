//const chalk = require("chalk");
//const ora = require("ora");
const config = require('config');
const oracledb = require('oracledb');
const fs = require('fs');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const sqlQuery = "SELECT * FROM MDA_ODS.EMAIL_PERF_ODS"

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
      user:config.get('oracleDB.name'),
      password:config.get('oracleDB.mdp'),
      tns:config.get('oracleDB.address')
    });

    const result = await connection.execute(
      `SELECT geo_group AS "Group", Geo, Geo_Color, year, 
      top_q1, total_score_q1 AS "Score Q1",
      top_q2, total_score_q2 AS "Score Q2",
      top_q3, total_score_q3 AS "Score Q3",
      top_q4, total_score_q4 AS "Score Q4",
      NVL(total_score_q1,0) + NVL(total_score_q2,0) + NVL(total_score_q3,0) + NVL(total_score_q4,0) AS "total score",
      (NVL(total_score_q1,0) + NVL(total_score_q2,0) + NVL(total_score_q3,0) + NVL(total_score_q4,0)) / 4 AS "change"
FROM TM1_UC_SC2022_GEO_SUMMARY
GROUP BY geo_group, Geo, Geo_Color, year, top_q1, "Score Q1", top_q2, "Score Q2", top_q3, "Score Q3", top_q4, "Score Q4", "total score", "change"
ORDER BY 4, 1, 2`

    );
    var json = JSON.stringify(result.rows);

    fs.writeFile('Y:\TM1_UC_SC2022_GEO_SUMMARY.json', json, 'utf8', function(erreur) {
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

run();

module.exports = oracledb.connection;