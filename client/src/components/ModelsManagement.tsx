import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Download, Upload, Search } from "lucide-react";
import { useModels } from "@/hooks/use-models";
import { useTraining } from "@/hooks/use-training";
import { useToast } from "@/hooks/use-toast";
import ModelCard from "./ModelCard";

export default function ModelsManagement() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [newModel, setNewModel] = useState({
    name: "",
    type: "",
    description: ""
  });

  const { data: models, createModel, deleteModel } = useModels();
  const { startTraining } = useTraining();
  const { toast } = useToast();

  const modelTypes = [
    { value: "llama2", label: "Llama 2", emoji: "🦙" },
    { value: "mistral", label: "Mistral", emoji: "💨" },
    { value: "codellama", label: "Code Llama", emoji: "💻" },
    { value: "gpt", label: "GPT", emoji: "🧠" },
    { value: "claude", label: "Claude", emoji: "🤖" }
  ];

  const filteredModels = models?.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || model.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleCreateModel = async () => {
    if (!newModel.name || !newModel.type) {
      toast({
        title: "خطأ في الإدخال",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    try {
      await createModel.mutateAsync(newModel);
      setShowCreateDialog(false);
      setNewModel({ name: "", type: "", description: "" });
      toast({
        title: "تم إنشاء النموذج بنجاح",
        description: "تم إضافة النموذج الجديد إلى المكتبة",
      });
    } catch (error) {
      toast({
        title: "خطأ في إنشاء النموذج",
        description: "حدث خطأ أثناء إنشاء النموذج",
        variant: "destructive",
      });
    }
  };

  const handleDeleteModel = async (id: number) => {
    try {
      await deleteModel.mutateAsync(id);
      toast({
        title: "تم حذف النموذج",
        description: "تم حذف النموذج بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف النموذج",
        variant: "destructive",
      });
    }
  };

  const handleTrainModel = async (modelId: number) => {
    try {
      await startTraining.mutateAsync({
        modelId,
        totalEpochs: 10,
        learningRate: 0.001,
        batchSize: 32,
      });
      toast({
        title: "بدء التدريب",
        description: "تم بدء عملية تدريب النموذج بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ في التدريب",
        description: "حدث خطأ أثناء بدء التدريب",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">إدارة النماذج</h2>
          <p className="text-gray-400">إدارة وتنظيم مكتبة نماذج الذكاء الاصطناعي</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-red-500/30 text-red-400 hover:bg-red-500/20"
          >
            <Download className="w-4 h-4 mr-2" />
            تحميل نموذج
          </Button>
          
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                نموذج جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-wolf-gray border-red-500/20">
              <DialogHeader>
                <DialogTitle className="text-white">إنشاء نموذج جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300">اسم النموذج</Label>
                  <Input
                    value={newModel.name}
                    onChange={(e) => setNewModel(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="أدخل اسم النموذج"
                    className="bg-wolf-dark border-red-500/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">نوع النموذج</Label>
                  <Select 
                    value={newModel.type} 
                    onValueChange={(value) => setNewModel(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="bg-wolf-dark border-red-500/30 text-white">
                      <SelectValue placeholder="اختر نوع النموذج" />
                    </SelectTrigger>
                    <SelectContent className="bg-wolf-gray border-red-500/30">
                      {modelTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <span className="flex items-center gap-2">
                            <span>{type.emoji}</span>
                            <span>{type.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">الوصف</Label>
                  <Textarea
                    value={newModel.description}
                    onChange={(e) => setNewModel(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="وصف مختصر للنموذج وقدراته"
                    className="bg-wolf-dark border-red-500/30 text-white resize-none"
                    rows={3}
                  />
                </div>
                <Button 
                  onClick={handleCreateModel}
                  disabled={!newModel.name || !newModel.type || createModel.isPending}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  {createModel.isPending ? "جاري الإنشاء..." : "إنشاء النموذج"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في النماذج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-wolf-gray border-red-500/30 text-white"
          />
        </div>
        
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:w-48 bg-wolf-gray border-red-500/30 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-wolf-gray border-red-500/30">
            <SelectItem value="all">جميع الأنواع</SelectItem>
            {modelTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                <span className="flex items-center gap-2">
                  <span>{type.emoji}</span>
                  <span>{type.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels?.map((model) => (
          <ModelCard
            key={model.id}
            model={model}
            onDelete={handleDeleteModel}
            onTrain={handleTrainModel}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredModels?.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-wolf-gray rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">لا توجد نماذج</h3>
          <p className="text-gray-400 mb-4">
            {searchTerm ? "لم يتم العثور على نماذج مطابقة لبحثك" : "ابدأ بإنشاء نموذج جديد أو تحميل نموذج موجود"}
          </p>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="bg-red-600 hover:bg-red-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            إنشاء نموذج جديد
          </Button>
        </div>
      )}
    </div>
  );
}
