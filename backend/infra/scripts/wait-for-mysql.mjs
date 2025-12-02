import { execFile } from 'node:child_process';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

function checkMysql() {
  const rootPassword = process.env.MYSQL_ROOT_PASSWORD;

  execFile(
    'docker',
    [
      'exec',
      'mysql_db',
      'mysqladmin',
      'ping',
      '--protocol=TCP',
      '-h',
      '127.0.0.1',
      '-u',
      'root',
      `--password=${rootPassword}`,
    ],
    (error) => {
      if (error) {
        process.stdout.write('.');
        return setTimeout(checkMysql, 1000);
      }

      console.log('\n\n🟢 MySQL is ready and accepting connections\n\n');
      process.exit(0);
    },
  );
}

console.log('\n\n🔴 Waiting for MySQL to accept connections...');
checkMysql();
