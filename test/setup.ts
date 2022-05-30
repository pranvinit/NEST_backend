import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';

// wipes the test.sqlite db before each test
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (e) {
    // do nothing if test.sqlite does not exist
  }
});

// closes the TypeOrm connection to the db after each test
global.afterEach(async () => {
  const conn = getConnection();
  await conn.close();
});
