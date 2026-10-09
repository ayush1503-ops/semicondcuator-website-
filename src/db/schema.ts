import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const enquiryTypeEnum = pgEnum("enquiry_type", [
  "course",
  "service",
  "partnership",
  "career",
  "general",
]);

export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  type: enquiryTypeEnum("type").notNull().default("general"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  organization: text("organization"),
  interest: text("interest"),
  subject: text("subject"),
  message: text("message").notNull(),
  source: text("source"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Enquiry = typeof enquiries.$inferSelect;
export type NewEnquiry = typeof enquiries.$inferInsert;
