import { integer, pgTable, pgEnum, timestamp, text } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', [
  'open',
  'paid',
  'void',
  'uncollectable',
]);

export const Invoices = pgTable('invoices', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createTS: timestamp('createTS').defaultNow().notNull(),
  value: integer('value').notNull(),
  description: text('description').notNull(),
  userId: text('userId').notNull(),
  status: statusEnum('status').notNull(),
});
