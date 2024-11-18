import { integer, pgTable, pgEnum, timestamp, text } from 'drizzle-orm/pg-core';

import { AVAILABLE_STATUSES } from '@/data/invoice';

export type Status = (typeof AVAILABLE_STATUSES)[number]['id'];

const statuses = AVAILABLE_STATUSES.map(({ id }) => id) as Array<Status>;

export const statusEnum = pgEnum(
  'status',
  statuses as [Status, ...Array<Status>],
);

export const Invoices = pgTable('invoices', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createTS: timestamp('createTS').defaultNow().notNull(),
  value: integer('value').notNull(),
  description: text('description').notNull(),
  userId: text('userId').notNull(),
  status: statusEnum('status').notNull(),
});
