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
  status: statusEnum('status').notNull(),
});

export const Users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  email: text('email'),
});
