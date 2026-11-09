import * as migration_20261109_194514_initial from './20261109_194514_initial';
import * as migration_20261109_203601_add_blob_fields from './20261109_203601_add_blob_fields';

export const migrations = [
  {
    up: migration_20261109_194514_initial.up,
    down: migration_20261109_194514_initial.down,
    name: '20261109_194514_initial',
  },
  {
    up: migration_20261109_203601_add_blob_fields.up,
    down: migration_20261109_203601_add_blob_fields.down,
    name: '20261109_203601_add_blob_fields'
  },
];
