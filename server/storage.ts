import { 
  users, models, trainingJobs, apiKeys, chatMessages,
  type User, type InsertUser,
  type Model, type InsertModel,
  type TrainingJob, type InsertTrainingJob,
  type ApiKey, type InsertApiKey,
  type ChatMessage, type InsertChatMessage
} from "@wolf-ai/shared";
import { nanoid } from "nanoid";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Models
  getAllModels(): Promise<Model[]>;
  getModel(id: number): Promise<Model | undefined>;
  createModel(model: InsertModel): Promise<Model>;
  updateModel(id: number, updates: Partial<Model>): Promise<Model | undefined>;
  deleteModel(id: number): Promise<boolean>;

  // Training Jobs
  getAllTrainingJobs(): Promise<TrainingJob[]>;
  getTrainingJob(id: number): Promise<TrainingJob | undefined>;
  getTrainingJobsByModel(modelId: number): Promise<TrainingJob[]>;
  createTrainingJob(job: InsertTrainingJob): Promise<TrainingJob>;
  updateTrainingJob(id: number, updates: Partial<TrainingJob>): Promise<TrainingJob | undefined>;

  // API Keys
  getAllApiKeys(): Promise<ApiKey[]>;
  getApiKey(id: number): Promise<ApiKey | undefined>;
  getApiKeyByKey(key: string): Promise<ApiKey | undefined>;
  createApiKey(apiKey: InsertApiKey): Promise<ApiKey>;
  updateApiKey(id: number, updates: Partial<ApiKey>): Promise<ApiKey | undefined>;
  deleteApiKey(id: number): Promise<boolean>;

  // Chat Messages
  getChatMessages(modelId: number, limit?: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private models: Map<number, Model>;
  private trainingJobs: Map<number, TrainingJob>;
  private apiKeys: Map<number, ApiKey>;
  private chatMessages: Map<number, ChatMessage>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.models = new Map();
    this.trainingJobs = new Map();
    this.apiKeys = new Map();
    this.chatMessages = new Map();
    this.currentId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample models
    const sampleModels = [
      { name: "Llama-2-7B-Chat", type: "llama2", status: "active", accuracy: 0.952, version: "v1.0", description: "Advanced conversational AI model optimized for Arabic language" },
      { name: "Mistral-7B-Instruct", type: "mistral", status: "active", accuracy: 0.928, version: "v1.0", description: "High-performance instruction-following model" },
      { name: "CodeLlama-13B", type: "codellama", status: "training", accuracy: 0.895, version: "v1.0", description: "Specialized code generation and understanding model" },
    ];

    sampleModels.forEach(modelData => {
      const id = this.currentId++;
      const model: Model = {
        id,
        ...modelData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.models.set(id, model);
    });

    // Create sample training jobs
    const sampleTrainingJobs = [
      {
        modelId: 3,
        status: "running",
        progress: 0.68,
        epoch: 7,
        totalEpochs: 10,
        learningRate: 0.001,
        batchSize: 32,
        loss: 0.0342,
        accuracy: 0.942,
        estimatedTimeRemaining: 135,
        gpuUsage: 0.87,
      }
    ];

    sampleTrainingJobs.forEach(jobData => {
      const id = this.currentId++;
      const job: TrainingJob = {
        id,
        ...jobData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.trainingJobs.set(id, job);
    });

    // Create sample API keys
    const sampleApiKeys = [
      {
        name: "Production API",
        key: "wolf_" + nanoid(32),
        modelId: 1,
        usage: 0.65,
        maxRequests: 10000,
        currentRequests: 6500,
        status: "active",
        lastUsed: new Date(),
      },
      {
        name: "Development API",
        key: "wolf_" + nanoid(32),
        modelId: 2,
        usage: 0.23,
        maxRequests: 5000,
        currentRequests: 1150,
        status: "active",
        lastUsed: new Date(Date.now() - 3600000),
      }
    ];

    sampleApiKeys.forEach(keyData => {
      const id = this.currentId++;
      const apiKey: ApiKey = {
        id,
        ...keyData,
        createdAt: new Date(),
      };
      this.apiKeys.set(id, apiKey);
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      id,
      ...insertUser,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Models
  async getAllModels(): Promise<Model[]> {
    return Array.from(this.models.values());
  }

  async getModel(id: number): Promise<Model | undefined> {
    return this.models.get(id);
  }

  async createModel(insertModel: InsertModel): Promise<Model> {
    const id = this.currentId++;
    const model: Model = {
      id,
      name: insertModel.name,
      type: insertModel.type,
      description: insertModel.description || null,
      status: "inactive",
      accuracy: null,
      version: "v1.0",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.models.set(id, model);
    return model;
  }

  async updateModel(id: number, updates: Partial<Model>): Promise<Model | undefined> {
    const model = this.models.get(id);
    if (!model) return undefined;
    
    const updatedModel = { ...model, ...updates, updatedAt: new Date() };
    this.models.set(id, updatedModel);
    return updatedModel;
  }

  async deleteModel(id: number): Promise<boolean> {
    return this.models.delete(id);
  }

  // Training Jobs
  async getAllTrainingJobs(): Promise<TrainingJob[]> {
    return Array.from(this.trainingJobs.values());
  }

  async getTrainingJob(id: number): Promise<TrainingJob | undefined> {
    return this.trainingJobs.get(id);
  }

  async getTrainingJobsByModel(modelId: number): Promise<TrainingJob[]> {
    return Array.from(this.trainingJobs.values()).filter(job => job.modelId === modelId);
  }

  async createTrainingJob(insertJob: InsertTrainingJob): Promise<TrainingJob> {
    const id = this.currentId++;
    const job: TrainingJob = {
      id,
      ...insertJob,
      status: "pending",
      progress: 0,
      epoch: 0,
      loss: null,
      accuracy: null,
      estimatedTimeRemaining: null,
      gpuUsage: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.trainingJobs.set(id, job);
    return job;
  }

  async updateTrainingJob(id: number, updates: Partial<TrainingJob>): Promise<TrainingJob | undefined> {
    const job = this.trainingJobs.get(id);
    if (!job) return undefined;
    
    const updatedJob = { ...job, ...updates, updatedAt: new Date() };
    this.trainingJobs.set(id, updatedJob);
    return updatedJob;
  }

  // API Keys
  async getAllApiKeys(): Promise<ApiKey[]> {
    return Array.from(this.apiKeys.values());
  }

  async getApiKey(id: number): Promise<ApiKey | undefined> {
    return this.apiKeys.get(id);
  }

  async getApiKeyByKey(key: string): Promise<ApiKey | undefined> {
    return Array.from(this.apiKeys.values()).find(apiKey => apiKey.key === key);
  }

  async createApiKey(insertApiKey: InsertApiKey): Promise<ApiKey> {
    const id = this.currentId++;
    const apiKey: ApiKey = {
      id,
      name: insertApiKey.name,
      modelId: insertApiKey.modelId || null,
      maxRequests: insertApiKey.maxRequests || 1000,
      key: "wolf_" + nanoid(32),
      usage: 0,
      currentRequests: 0,
      status: "active",
      createdAt: new Date(),
      lastUsed: null,
    };
    this.apiKeys.set(id, apiKey);
    return apiKey;
  }

  async updateApiKey(id: number, updates: Partial<ApiKey>): Promise<ApiKey | undefined> {
    const apiKey = this.apiKeys.get(id);
    if (!apiKey) return undefined;
    
    const updatedApiKey = { ...apiKey, ...updates };
    this.apiKeys.set(id, updatedApiKey);
    return updatedApiKey;
  }

  async deleteApiKey(id: number): Promise<boolean> {
    return this.apiKeys.delete(id);
  }

  // Chat Messages
  async getChatMessages(modelId: number, limit: number = 50): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.modelId === modelId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async createChatMessage(insertMessage: InsertChatMessage & { response?: string; responseTime?: number }): Promise<ChatMessage> {
    const id = this.currentId++;
    
    const message: ChatMessage = {
      id,
      modelId: insertMessage.modelId,
      message: insertMessage.message,
      response: insertMessage.response || "",
      responseTime: insertMessage.responseTime || 0,
      createdAt: new Date(),
    };
    
    this.chatMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
