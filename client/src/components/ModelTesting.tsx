import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { FlaskConical, Send } from "lucide-react";
import { useModels } from "@/hooks/use-models";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: number;
  message: string;
  response: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ModelTesting() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { data: models } = useModels();
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !models?.[0]) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      message: currentMessage,
      response: "",
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/chat", {
        modelId: models[0].id,
        message: currentMessage,
      });
      
      const chatResponse = await response.json();
      
      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        message: chatResponse.message,
        response: chatResponse.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال الرسالة",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-morphism border-red-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <FlaskConical className="w-5 h-5 text-purple-400" />
          اختبار النماذج
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chat Interface */}
          <div className="bg-wolf-gray/30 rounded-lg p-4">
            <ScrollArea className="h-64 mb-4">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.isUser
                          ? 'bg-red-600 text-white'
                          : 'bg-wolf-gray text-gray-100'
                      }`}
                    >
                      <p className="text-sm">
                        {msg.isUser ? msg.message : msg.response}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-wolf-gray px-4 py-2 rounded-lg max-w-xs">
                      <p className="text-sm text-gray-400">جاري الكتابة...</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Chat Input */}
            <div className="flex gap-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="اكتب رسالتك..."
                className="flex-1 bg-wolf-dark border-red-500/30 text-white"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={isLoading || !currentMessage.trim()}
                className="bg-red-600 hover:bg-red-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Model Comparison */}
          <div className="space-y-4">
            {models?.slice(0, 3).map((model) => (
              <div key={model.id} className="bg-wolf-gray/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-white">{model.name}</span>
                  <span className="text-green-400 text-sm">
                    {model.accuracy ? `${(model.accuracy * 100).toFixed(1)}% دقة` : "N/A"}
                  </span>
                </div>
                <Progress 
                  value={model.accuracy ? model.accuracy * 100 : 0} 
                  className="w-full"
                />
              </div>
            ))}
            
            {!models || models.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                لا توجد نماذج متاحة للاختبار
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
