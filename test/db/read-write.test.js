import tap from 'tap';
import { getDB, saveDB } from '../../src/utils/db/index.js';
import 'must/register.js';

tap.mochaGlobals();

describe('DB should work', async () => {
  it('should be able to read from DB', async () => {
    const db = await getDB();
    db.todos.must.not.be.null();
  });

  it('should be able to write to DB', async () => {
    const db = await getDB();
    const date = new Date().getTime();
    db.test = date;

    await saveDB(db);

    const newDB = await getDB();
    newDB.test.must.be.equal(db.test);
  });
});
