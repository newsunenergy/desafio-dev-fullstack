#!/usr/bin/env node

import { exec } from 'child_process';
import net from 'net';

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_PORT = parseInt(process.env.MYSQL_PORT || '3306');

function checkMysql() {
  return new Promise((resolve) => {
    const socket = net.createConnection(MYSQL_PORT, MYSQL_HOST);

    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });

    socket.on('error', () => {
      resolve(false);
    });
  });
}

async function waitForMysql() {
  console.log('🔄 Waiting for MySQL...');
  let attempts = 0;
  const maxAttempts = 60;

  while (attempts < maxAttempts) {
    if (await checkMysql()) {
      console.log('✅ MySQL is ready!');
      return;
    }
    attempts++;
    console.log(`⏳ Attempt ${attempts}/${maxAttempts}...`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error('MySQL did not become available in time');
}

async function runMigrations() {
  return new Promise((resolve, reject) => {
    console.log('📊 Running migrations...');
    exec(
      'npx typeorm migration:run -d dist/database/data-source.js',
      (error, stdout, stderr) => {
        if (error) {
          console.log(
            '⚠️ Migration error (may be already applied):',
            error.message,
          );
        }
        if (stdout) console.log(stdout);
        if (stderr) console.log(stderr);
        resolve();
      },
    );
  });
}

async function main() {
  try {
    await waitForMysql();
    await runMigrations();
    console.log('🚀 Ready to start application!');
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
