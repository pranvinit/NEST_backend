var dbConfig = {
  synchronize: false,
  // setting up migration config (migrations are files that have a up (modifier) and down (demodifier) functions)
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      // use all the JS entity files in dist directory
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      // use all the TS entity files in src directory (TS-jest case)
      entities: ['**/*.entity.ts'],
      // runs all the migrations as soon as the db is created
      migrationsRun: true,
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      // set by heroku
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      // use all the JS entity files in dist directory
      entities: ['**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
