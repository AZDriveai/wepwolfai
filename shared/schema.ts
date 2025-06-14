import { pgTable, text, serial, integer, timestamp, real } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"
import type { z } from "zod"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const models = pgTable("models", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'llama2', 'mistral', 'codellama', etc.
  status: text("status").notNull().default("inactive"), // 'active', 'training', 'inactive'
  accuracy: real("accuracy"),
  version: text("version"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const trainingJobs = pgTable("training_jobs", {
  id: serial("id").primaryKey(),
  modelId: integer("model_id")
    .references(() => models.id)
    .notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'running', 'completed', 'failed'
  progress: real("progress").default(0),
  epoch: integer("epoch").default(0),
  totalEpochs: integer("total_epochs").notNull(),
  learningRate: real("learning_rate").notNull(),
  batchSize: integer("batch_size").notNull(),
  loss: real("loss"),
  accuracy: real("accuracy"),
  estimatedTimeRemaining: integer("estimated_time_remaining"), // in minutes
  gpuUsage: real("gpu_usage"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const apiKeys = pgTable("api_keys", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  key: text("key").notNull().unique(),
  modelId: integer("model_id").references(() => models.id),
  usage: real("usage").default(0), // percentage of quota used
  maxRequests: integer("max_requests").default(1000),
  currentRequests: integer("current_requests").default(0),
  status: text("status").notNull().default("active"), // 'active', 'inactive', 'suspended'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastUsed: timestamp("last_used"),
})

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  modelId: integer("model_id")
    .references(() => models.id)
    .notNull(),
  message: text("message").notNull(),
  response: text("response").notNull(),
  responseTime: real("response_time"), // in seconds
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
})

export const insertModelSchema = createInsertSchema(models).pick({
  name: true,
  type: true,
  description: true,
})

export const insertTrainingJobSchema = createInsertSchema(trainingJobs).pick({
  modelId: true,
  totalEpochs: true,
  learningRate: true,
  batchSize: true,
})

export const insertApiKeySchema = createInsertSchema(apiKeys).pick({
  name: true,
  modelId: true,
  maxRequests: true,
})

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  modelId: true,
  message: true,
})

// Types
export type InsertUser = z.infer<typeof insertUserSchema>
export type User = typeof users.$inferSelect

export type InsertModel = z.infer<typeof insertModelSchema>
export type Model = typeof models.$inferSelect

export type InsertTrainingJob = z.infer<typeof insertTrainingJobSchema>
export type TrainingJob = typeof trainingJobs.$inferSelect

export type InsertApiKey = z.infer<typeof insertApiKeySchema>
export type ApiKey = typeof apiKeys.$inferSelect

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>
export type ChatMessage = typeof chatMessages.$inferSelect
