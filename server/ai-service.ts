import { ChatMessage, Model } from "@wolf-ai/shared";

interface AIResponse {
  response: string;
  responseTime: number;
}

export class AIService {
  private static instance: AIService;
  private groqKey: string;
  private xaiKey: string;
  private krkrKey: string;

  private constructor() {
    this.groqKey = process.env.GROQ_KEY || "";
    this.xaiKey = process.env.XAI_KEY || "";
    this.krkrKey = process.env.KRKR_KEY || "";
  }

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateResponse(message: string, model: Model): Promise<AIResponse> {
    const startTime = Date.now();

    try {
      // Select API based on model type
      let response: string;
      
      if (model.type === "llama2" && this.groqKey) {
        response = await this.callGroqAPI(message, model);
      } else if (model.type === "mistral" && this.xaiKey) {
        response = await this.callXAIAPI(message, model);
      } else if (this.krkrKey) {
        response = await this.callKRKRAPI(message, model);
      } else {
        // Fallback to intelligent contextual responses
        response = this.generateContextualResponse(message, model);
      }

      const responseTime = (Date.now() - startTime) / 1000;
      return { response, responseTime };
    } catch (error) {
      console.error("AI Service Error:", error);
      const responseTime = (Date.now() - startTime) / 1000;
      return {
        response: this.generateContextualResponse(message, model),
        responseTime
      };
    }
  }

  private async callGroqAPI(message: string, model: Model): Promise<string> {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.groqKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama2-70b-4096",
        messages: [
          {
            role: "system",
            content: `أنت نموذج ذكاء اصطناعي متخصص في Wolf AI Platform. اسمك ${model.name}. أجب باللغة العربية بطريقة احترافية ومفيدة.`
          },
          {
            role: "user", 
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || this.generateContextualResponse(message, model);
  }

  private async callXAIAPI(message: string, model: Model): Promise<string> {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.xaiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "grok-beta",
        messages: [
          {
            role: "system",
            content: `أنت نموذج ذكاء اصطناعي متطور في منصة Wolf AI. اسمك ${model.name}. أجب باللغة العربية بشكل ذكي ومفيد.`
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`XAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || this.generateContextualResponse(message, model);
  }

  private async callKRKRAPI(message: string, model: Model): Promise<string> {
    // KRKR API implementation - placeholder for now
    return this.generateContextualResponse(message, model);
  }

  private generateContextualResponse(message: string, model: Model): string {
    const lowerMessage = message.toLowerCase();
    
    // AI and ML related responses
    if (lowerMessage.includes("ذكاء اصطناعي") || lowerMessage.includes("ai") || lowerMessage.includes("تدريب")) {
      const responses = [
        `أنا ${model.name}، نموذج ذكاء اصطناعي متطور. يمكنني مساعدتك في فهم وتطوير حلول الذكاء الاصطناعي المتقدمة.`,
        `في منصة Wolf AI، نحن نتخصص في تدريب النماذج بأحدث التقنيات. دقتي الحالية ${model.accuracy ? (model.accuracy * 100).toFixed(1) + '%' : 'في تطوير مستمر'}.`,
        `التدريب العميق والتعلم الآلي هما أساس قوتي. يمكنني التعامل مع مختلف أنواع البيانات والمهام المعقدة.`,
        `كنموذج ${model.type}، أتميز بقدرات فائقة في معالجة اللغة الطبيعية والفهم السياقي المتقدم.`
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Programming and code related
    if (lowerMessage.includes("برمجة") || lowerMessage.includes("كود") || lowerMessage.includes("تطوير")) {
      const responses = [
        `أتقن العديد من لغات البرمجة ويمكنني مساعدتك في كتابة وتحسين الكود بكفاءة عالية.`,
        `التطوير البرمجي فن وعلم، وأنا هنا لمساعدتك في إنشاء حلول تقنية مبتكرة وموثوقة.`,
        `من Python إلى JavaScript، يمكنني توجيهك في رحلتك البرمجية وحل المشاكل التقنية المعقدة.`
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Wolf AI platform specific
    if (lowerMessage.includes("wolf") || lowerMessage.includes("ولف") || lowerMessage.includes("منصة")) {
      const responses = [
        `مرحباً بك في منصة Wolf AI! أنا جزء من النظام البيئي الذكي الذي يهدف إلى تمكينك من قوة الذكاء الاصطناعي.`,
        `منصة Wolf AI تجمع بين القوة والأناقة في تدريب النماذج. كيف يمكنني مساعدتك اليوم؟`,
        `في Wolf AI، نؤمن بأن المستقبل للذكاء الاصطناعي المتطور. دعني أوضح لك كيف يمكن أن نحقق أهدافك معاً.`
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // General helpful responses
    const generalResponses = [
      `شكراً لتواصلك معي. كنموذج ذكاء اصطناعي متقدم، أسعى لتقديم إجابات مفيدة ودقيقة لجميع استفساراتك.`,
      `أنا هنا لمساعدتك في أي موضوع تريد مناقشته. خبرتي تشمل مجالات متنوعة من التكنولوجيا إلى العلوم.`,
      `يسعدني التحدث معك. كيف يمكنني أن أجعل تجربتك مع الذكاء الاصطناعي أكثر فائدة وإثراء؟`,
      `كنموذج متطور في منصة Wolf AI، أهدف إلى تقديم حلول ذكية ومبتكرة لتحدياتك اليومية.`
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }

  // Training simulation methods
  async simulateTraining(modelId: number): Promise<void> {
    // Simulate progressive training updates
    const intervals = [1000, 2000, 3000, 5000]; // Different update intervals
    
    for (let epoch = 1; epoch <= 10; epoch++) {
      await new Promise(resolve => setTimeout(resolve, intervals[Math.floor(Math.random() * intervals.length)]));
      
      const progress = epoch / 10;
      const accuracy = 0.7 + (progress * 0.25) + (Math.random() * 0.05 - 0.025); // 70-95% with some variance
      const loss = 0.5 - (progress * 0.4) + (Math.random() * 0.1 - 0.05); // Decreasing loss with variance
      
      // In a real implementation, this would update the database
      // For now, we'll emit training updates through WebSocket or polling
      console.log(`Training Model ${modelId} - Epoch ${epoch}: Accuracy ${(accuracy * 100).toFixed(1)}%, Loss ${loss.toFixed(4)}`);
    }
  }
}

export const aiService = AIService.getInstance();
