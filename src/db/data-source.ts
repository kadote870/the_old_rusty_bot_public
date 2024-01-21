import { DataSource } from 'typeorm';
import { Player } from './entities/player.entity';

export const DATA_BASE_PATH = './src/db/rusty-db.db';

export const AppDataSource = new DataSource({
   type: 'sqlite',
   database: DATA_BASE_PATH,
   entities: [Player],
   synchronize: true,
});

// prettier-ignore
const rustyDB = ` ` + '\x1b[32m' + `____            _           ____  ____
|  _ \\ _   _ ___| |_ _   _  |  _ \\| __ )
| |_) | | | / __| __| | | | | | | |  _ \\
|  _ <| |_| \\__ \\ |_| |_| | | |_| | |_) |
|_| \\_\\\\__,_|___/\\__|\\__, | |____/|____/` + '\x1b[0m' + `  DB is online
                     ` + '\x1b[32m' + `|___/` + '\x1b[0m'

AppDataSource.initialize()
   .then(() => {
      console.log(rustyDB);
   })
   .catch((err) => {
      console.error('Error during Data Source initialization', err);
   });
