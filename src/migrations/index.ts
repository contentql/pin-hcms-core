import * as migration_20241203_063102_migration from './20241203_063102_migration';

export const migrations = [
  {
    up: migration_20241203_063102_migration.up,
    down: migration_20241203_063102_migration.down,
    name: '20241203_063102_migration'
  },
];
