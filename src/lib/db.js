import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const openDb = async () => {
  return open({
    filename: './tasks.db',
    driver: sqlite3.Database
  });
};

export default openDb;
