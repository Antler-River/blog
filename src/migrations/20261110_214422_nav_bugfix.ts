import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer
  );
  
  ALTER TABLE "header_nav_items_children" DROP CONSTRAINT "header_nav_items_children_page_id_pages_id_fk";
  
  ALTER TABLE "header_nav_items" DROP CONSTRAINT "header_nav_items_link_page_id_pages_id_fk";
  
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
  DROP INDEX "header_nav_items_children_page_idx";
  DROP INDEX "header_nav_items_link_link_page_idx";
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "header_rels_categories_id_idx" ON "header_rels" USING btree ("categories_id");
  ALTER TABLE "header_nav_items_children" DROP COLUMN "page_id";
  ALTER TABLE "header_nav_items" DROP COLUMN "link_page_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "header_rels" CASCADE;
  ALTER TABLE "header_nav_items_children" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "header_nav_items_children" ALTER COLUMN "type" SET DEFAULT 'page'::text;
  DROP TYPE "public"."enum_header_nav_items_children_type";
  CREATE TYPE "public"."enum_header_nav_items_children_type" AS ENUM('page', 'url');
  ALTER TABLE "header_nav_items_children" ALTER COLUMN "type" SET DEFAULT 'page'::"public"."enum_header_nav_items_children_type";
  ALTER TABLE "header_nav_items_children" ALTER COLUMN "type" SET DATA TYPE "public"."enum_header_nav_items_children_type" USING "type"::"public"."enum_header_nav_items_children_type";
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_type" SET DEFAULT 'page'::text;
  DROP TYPE "public"."enum_header_nav_items_link_type";
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('page', 'url');
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_type" SET DEFAULT 'page'::"public"."enum_header_nav_items_link_type";
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_header_nav_items_link_type" USING "link_type"::"public"."enum_header_nav_items_link_type";
  ALTER TABLE "header_nav_items_children" ADD COLUMN "page_id" integer;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_page_id" integer;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_nav_items_children_page_idx" ON "header_nav_items_children" USING btree ("page_id");
  CREATE INDEX "header_nav_items_link_link_page_idx" ON "header_nav_items" USING btree ("link_page_id");`)
}
