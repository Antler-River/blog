import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_nav_items_children_route" AS ENUM('/', '/guestbook');
  CREATE TYPE "public"."enum_header_nav_items_link_route" AS ENUM('/', '/guestbook');
  ALTER TYPE "public"."enum_header_nav_items_children_type" ADD VALUE 'route';
  ALTER TYPE "public"."enum_header_nav_items_link_type" ADD VALUE 'route';
  ALTER TABLE "header_nav_items_children" ADD COLUMN "route" "enum_header_nav_items_children_route";
  ALTER TABLE "header_nav_items" ADD COLUMN "link_route" "enum_header_nav_items_link_route";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_nav_items_children" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "header_nav_items_children" ALTER COLUMN "type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_header_nav_items_children_type";
  CREATE TYPE "public"."enum_header_nav_items_children_type" AS ENUM('reference', 'url');
  ALTER TABLE "header_nav_items_children" ALTER COLUMN "type" SET DEFAULT 'reference'::"public"."enum_header_nav_items_children_type";
  ALTER TABLE "header_nav_items_children" ALTER COLUMN "type" SET DATA TYPE "public"."enum_header_nav_items_children_type" USING "type"::"public"."enum_header_nav_items_children_type";
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_header_nav_items_link_type";
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'url');
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_header_nav_items_link_type";
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_header_nav_items_link_type" USING "link_type"::"public"."enum_header_nav_items_link_type";
  ALTER TABLE "header_nav_items_children" DROP COLUMN "route";
  ALTER TABLE "header_nav_items" DROP COLUMN "link_route";
  DROP TYPE "public"."enum_header_nav_items_children_route";
  DROP TYPE "public"."enum_header_nav_items_link_route";`)
}
