import * as migration_20261109_194514_initial from './20261109_194514_initial'
import * as migration_20261109_203601_add_blob_fields from './20261109_203601_add_blob_fields'
import * as migration_20261109_231642_add_categories from './20261109_231642_add_categories'
import * as migration_20261110_163234_add_header from './20261110_163234_add_header'
import * as migration_20261110_211830_nav_finished from './20261110_211830_nav_finished'
import * as migration_20261110_214422_nav_bugfix from './20261110_214422_nav_bugfix'
import * as migration_20261111_005248_guestbook from './20261111_005248_guestbook'
import * as migration_20261111_005735_guestbook from './20261111_005735_guestbook'
import * as migration_20261111_020727_guestbook from './20261111_020727_guestbook'
import * as migration_20261111_021609_guestbook from './20261111_021609_guestbook'
import * as migration_20261113_220421_add_drafts from './20261113_220421_add_drafts'
import * as migration_20261119_015520_add_autosave from './20261119_015520_add_autosave'
import * as migration_20261119_015624_add_autosave_2 from './20261119_015624_add_autosave_2'

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
    name: '20261110_214422_nav_bugfix',
  },
  {
    up: migration_20261111_005248_guestbook.up,
    down: migration_20261111_005248_guestbook.down,
    name: '20261111_005248_guestbook',
  },
  {
    up: migration_20261111_005735_guestbook.up,
    down: migration_20261111_005735_guestbook.down,
    name: '20261111_005735_guestbook',
  },
  {
    up: migration_20261111_020727_guestbook.up,
    down: migration_20261111_020727_guestbook.down,
    name: '20261111_020727_guestbook',
  },
  {
    up: migration_20261111_021609_guestbook.up,
    down: migration_20261111_021609_guestbook.down,
    name: '20261111_021609_guestbook',
  },
  {
    up: migration_20261113_220421_add_drafts.up,
    down: migration_20261113_220421_add_drafts.down,
    name: '20261113_220421_add_drafts',
  },
  {
    up: migration_20261119_015520_add_autosave.up,
    down: migration_20261119_015520_add_autosave.down,
    name: '20261119_015520_add_autosave',
  },
  {
    up: migration_20261119_015624_add_autosave_2.up,
    down: migration_20261119_015624_add_autosave_2.down,
    name: '20261119_015624_add_autosave_2',
  },
]
