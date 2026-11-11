import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "guestbook_entries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "guestbook_entries_id" integer;
  CREATE INDEX "guestbook_entries_updated_at_idx" ON "guestbook_entries" USING btree ("updated_at");
  CREATE INDEX "guestbook_entries_created_at_idx" ON "guestbook_entries" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_guestbook_entries_fk" FOREIGN KEY ("guestbook_entries_id") REFERENCES "public"."guestbook_entries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_guestbook_entries_id_idx" ON "payload_locked_documents_rels" USING btree ("guestbook_entries_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "guestbook_entries" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "guestbook_entries" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_guestbook_entries_fk";
  
  DROP INDEX "payload_locked_documents_rels_guestbook_entries_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "guestbook_entries_id";`)
}
