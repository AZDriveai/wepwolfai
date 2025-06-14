import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { aiService } from "./ai-service";
import { insertModelSchema, insertTrainingJobSchema, insertApiKeySchema, insertChatMessageSchema } from "@wolf-ai/shared";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Models
  app.get("/api/models", async (req, res) => {
    try {
      const models = await storage.getAllModels();
      res.json(models);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch models" });
    }
  });

  app.post("/api/models", async (req, res) => {
    try {
      const validatedData = insertModelSchema.parse(req.body);
      const model = await storage.createModel(validatedData);
      res.status(201).json(model);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create model" });
      }
    }
  });

  app.put("/api/models/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const model = await storage.updateModel(id, req.body);
      if (!model) {
        res.status(404).json({ message: "Model not found" });
        return;
      }
      res.json(model);
    } catch (error) {
      res.status(500).json({ message: "Failed to update model" });
    }
  });

  app.delete("/api/models/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteModel(id);
      if (!deleted) {
        res.status(404).json({ message: "Model not found" });
        return;
      }
      res.json({ message: "Model deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete model" });
    }
  });

  // Training Jobs
  app.get("/api/training-jobs", async (req, res) => {
    try {
      const jobs = await storage.getAllTrainingJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch training jobs" });
    }
  });

  app.post("/api/training-jobs", async (req, res) => {
    try {
      const validatedData = insertTrainingJobSchema.parse(req.body);
      const job = await storage.createTrainingJob(validatedData);
      
      // Start training simulation in background
      setTimeout(async () => {
        await aiService.simulateTraining(job.id);
      }, 1000);
      
      res.status(201).json(job);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create training job" });
      }
    }
  });

  app.put("/api/training-jobs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const job = await storage.updateTrainingJob(id, req.body);
      if (!job) {
        res.status(404).json({ message: "Training job not found" });
        return;
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: "Failed to update training job" });
    }
  });

  // API Keys
  app.get("/api/api-keys", async (req, res) => {
    try {
      const apiKeys = await storage.getAllApiKeys();
      res.json(apiKeys);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch API keys" });
    }
  });

  app.post("/api/api-keys", async (req, res) => {
    try {
      const validatedData = insertApiKeySchema.parse(req.body);
      const apiKey = await storage.createApiKey(validatedData);
      res.status(201).json(apiKey);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create API key" });
      }
    }
  });

  app.put("/api/api-keys/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const apiKey = await storage.updateApiKey(id, req.body);
      if (!apiKey) {
        res.status(404).json({ message: "API key not found" });
        return;
      }
      res.json(apiKey);
    } catch (error) {
      res.status(500).json({ message: "Failed to update API key" });
    }
  });

  app.delete("/api/api-keys/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteApiKey(id);
      if (!deleted) {
        res.status(404).json({ message: "API key not found" });
        return;
      }
      res.json({ message: "API key deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete API key" });
    }
  });

  // Chat Messages
  app.get("/api/chat/:modelId", async (req, res) => {
    try {
      const modelId = parseInt(req.params.modelId);
      const messages = await storage.getChatMessages(modelId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      
      // Get the model for AI response
      const model = await storage.getModel(validatedData.modelId);
      if (!model) {
        res.status(404).json({ message: "Model not found" });
        return;
      }

      // Generate AI response using the AI service
      const aiResponse = await aiService.generateResponse(validatedData.message, model);
      
      // Create chat message with AI response
      const message = await storage.createChatMessage({
        modelId: validatedData.modelId,
        message: validatedData.message,
        response: aiResponse.response,
        responseTime: aiResponse.responseTime
      });
      
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  // Dashboard Stats
  app.get("/api/stats", async (req, res) => {
    try {
      const models = await storage.getAllModels();
      const trainingJobs = await storage.getAllTrainingJobs();
      const apiKeys = await storage.getAllApiKeys();
      
      const stats = {
        activeModels: models.filter(m => m.status === "active").length,
        trainingJobs: trainingJobs.filter(j => j.status === "running").length,
        apiKeys: apiKeys.filter(k => k.status === "active").length,
        requests: apiKeys.reduce((sum, key) => sum + (key.currentRequests || 0), 0)
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
