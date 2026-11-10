import * as migration_20261109_194514_initial from './20261109_194514_initial';
import * as migration_20261109_203601_add_blob_fields from './20261109_203601_add_blob_fields';
import * as migration_20261109_231642_add_categories from './20261109_231642_add_categories';
import * as migration_20261110_163234_add_header from './20261110_163234_add_header';
import * as migration_20261110_211830_nav_finished from './20261110_211830_nav_finished';
import * as migration_20261110_214422_nav_bugfix from './20261110_214422_nav_bugfix';

export const migrations = [
  {
    up: migration_20261109_194514_initial.up,
    down: migration_20261109_194514_initial.down,
    name: '20261109_194514_initial',
  },
  {
    up: migration_20261109_203601_add_blob_fields.up,
    down: migration_20261109_203601_add_blob_fields.down,
    name: '20261109_203601_add_blob_fields',
  },
  {
    up: migration_20261109_231642_add_categories.up,
    down: migration_20261109_231642_add_categories.down,
    name: '20261109_231642_add_categories',
  },
  {
    up: migration_20261110_163234_add_header.up,
    down: migration_20261110_163234_add_header.down,
    name: '20261110_163234_add_header',
  },
  {
    up: migration_20261110_211830_nav_finished.up,
    down: migration_20261110_211830_nav_finished.down,
    name: '20261110_211830_nav_finished',
  },
  {
    up: migration_20261110_214422_nav_bugfix.up,
    down: migration_20261110_214422_nav_bugfix.down,
    name: '20261110_214422_nav_bugfix'
  },
];
