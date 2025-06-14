import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Play, Pause, Trash2, Settings } from "lucide-react";
import type { Model } from "@wolf-ai/shared";

interface ModelCardProps {
  model: Model;
  onDelete: (id: number) => void;
  onTrain: (id: number) => void;
}

export default function ModelCard({ model, onDelete, onTrain }: ModelCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">نشط</Badge>;
      case "training":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">قيد التدريب</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">غير نشط</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "llama2":
        return "🦙";
      case "mistral":
        return "💨";
      case "codellama":
        return "💻";
      default:
        return "🤖";
    }
  };

  return (
    <Card 
      className="glass-morphism border-red-500/20 hover-lift transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{getTypeIcon(model.type)}</div>
            <div>
              <CardTitle className="text-lg text-white font-bold">{model.name}</CardTitle>
              <p className="text-sm text-gray-400 mt-1">{model.type}</p>
            </div>
          </div>
          {getStatusBadge(model.status)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Model Description */}
        {model.description && (
          <p className="text-sm text-gray-300 leading-relaxed">{model.description}</p>
        )}
        
        {/* Accuracy Display */}
        {model.accuracy && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">الدقة</span>
              <span className="text-sm font-semibold text-green-400">
                {(model.accuracy * 100).toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={model.accuracy * 100} 
              className="h-2"
            />
          </div>
        )}
        
        {/* Version and Date */}
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>الإصدار: {model.version}</span>
          <span>{new Date(model.createdAt).toLocaleDateString('ar-SA')}</span>
        </div>
        
        {/* Action Buttons */}
        <div className={`flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
          <Button
            size="sm"
            onClick={() => onTrain(model.id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            disabled={model.status === "training"}
          >
            <Play className="w-3 h-3 mr-1" />
            {model.status === "training" ? "جاري التدريب" : "تدريب"}
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="border-red-500/30 text-red-400 hover:bg-red-500/20"
          >
            <Settings className="w-3 h-3" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(model.id)}
            className="border-red-500/30 text-red-400 hover:bg-red-500/20"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
