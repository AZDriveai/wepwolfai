import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Terminal, Play, Upload } from "lucide-react";
import { useTraining } from "@/hooks/use-training";
import { useModels } from "@/hooks/use-models";

export default function TrainingInterface() {
  const [selectedModel, setSelectedModel] = useState("");
  const [learningRate, setLearningRate] = useState("0.001");
  const [batchSize, setBatchSize] = useState("32");
  const [epochs, setEpochs] = useState("10");
  
  const { data: models } = useModels();
  const { data: trainingJobs, startTraining } = useTraining();

  const currentTraining = trainingJobs?.find(job => job.status === "running");

  const handleStartTraining = async () => {
    if (!selectedModel) return;
    
    await startTraining.mutateAsync({
      modelId: parseInt(selectedModel),
      totalEpochs: parseInt(epochs),
      learningRate: parseFloat(learningRate),
      batchSize: parseInt(batchSize),
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Training Console */}
      <Card className="glass-morphism border-red-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Terminal className="w-5 h-5 text-red-500" />
            وحدة التدريب
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Model Selection */}
          <div>
            <Label className="text-gray-300 mb-2 block">اختر النموذج</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="bg-wolf-gray border-red-500/30 text-white">
                <SelectValue placeholder="اختر نموذجاً" />
              </SelectTrigger>
              <SelectContent className="bg-wolf-gray border-red-500/30">
                {models?.map((model) => (
                  <SelectItem key={model.id} value={model.id.toString()}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Training Parameters */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300 mb-2 block">معدل التعلم</Label>
              <Input
                type="number"
                step="0.001"
                value={learningRate}
                onChange={(e) => setLearningRate(e.target.value)}
                className="bg-wolf-gray border-red-500/30 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300 mb-2 block">حجم الدفعة</Label>
              <Input
                type="number"
                value={batchSize}
                onChange={(e) => setBatchSize(e.target.value)}
                className="bg-wolf-gray border-red-500/30 text-white"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-300 mb-2 block">عدد الحقب</Label>
            <Input
              type="number"
              value={epochs}
              onChange={(e) => setEpochs(e.target.value)}
              className="bg-wolf-gray border-red-500/30 text-white"
            />
          </div>

          {/* File Upload */}
          <div>
            <Label className="text-gray-300 mb-2 block">بيانات التدريب</Label>
            <div className="border-2 border-dashed border-red-500/30 rounded-lg p-6 text-center hover:border-red-500/50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-gray-400">اسحب وأفلت ملفات التدريب هنا</p>
            </div>
          </div>

          {/* Start Training Button */}
          <Button 
            onClick={handleStartTraining}
            disabled={!selectedModel || startTraining.isPending}
            className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-800 hover:to-red-600 hover-lift"
          >
            <Play className="w-4 h-4 mr-2" />
            {startTraining.isPending ? "جاري البدء..." : "بدء التدريب"}
          </Button>
        </CardContent>
      </Card>

      {/* Live Training Progress */}
      <Card className="glass-morphism border-red-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            تقدم التدريب المباشر
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentTraining ? (
            <div className="space-y-6">
              {/* Current Training Job */}
              <div className="bg-wolf-gray/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-300">
                    {models?.find(m => m.id === currentTraining.modelId)?.name}
                  </span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">قيد التدريب</span>
                </div>
                
                {/* Progress Bar */}
                <Progress 
                  value={(currentTraining.progress || 0) * 100} 
                  className="mb-3"
                />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">الحقبة:</span>
                    <span className="text-white font-semibold ml-2">
                      {currentTraining.epoch}/{currentTraining.totalEpochs}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">الدقة:</span>
                    <span className="text-green-400 font-semibold ml-2">
                      {currentTraining.accuracy ? `${(currentTraining.accuracy * 100).toFixed(1)}%` : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">معدل الخسارة</span>
                  <span className="text-yellow-500 font-semibold">
                    {currentTraining.loss?.toFixed(4) || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">الوقت المتبقي</span>
                  <span className="text-blue-400 font-semibold">
                    {currentTraining.estimatedTimeRemaining ? 
                      `${Math.floor(currentTraining.estimatedTimeRemaining / 60)}h ${currentTraining.estimatedTimeRemaining % 60}m` 
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">استخدام GPU</span>
                  <span className="text-purple-400 font-semibold">
                    {currentTraining.gpuUsage ? `${(currentTraining.gpuUsage * 100).toFixed(0)}%` : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">لا توجد عمليات تدريب جارية حالياً</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
