import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Key, Plus, Edit, Trash2 } from "lucide-react";
import { useApiKeys } from "@/hooks/use-api-keys";
import { useModels } from "@/hooks/use-models";
import { useToast } from "@/hooks/use-toast";

export default function APIKeyManagement() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [maxRequests, setMaxRequests] = useState("1000");

  const { data: apiKeys, createApiKey, deleteApiKey } = useApiKeys();
  const { data: models } = useModels();
  const { toast } = useToast();

  const handleCreateKey = async () => {
    if (!keyName || !selectedModel) return;

    try {
      await createApiKey.mutateAsync({
        name: keyName,
        modelId: parseInt(selectedModel),
        maxRequests: parseInt(maxRequests),
      });
      
      setShowCreateDialog(false);
      setKeyName("");
      setSelectedModel("");
      setMaxRequests("1000");
      
      toast({
        title: "تم إنشاء المفتاح بنجاح",
        description: "تم إنشاء مفتاح API جديد وهو جاهز للاستخدام",
      });
    } catch (error) {
      toast({
        title: "خطأ في إنشاء المفتاح",
        description: "حدث خطأ أثناء إنشاء مفتاح API",
        variant: "destructive",
      });
    }
  };

  const handleDeleteKey = async (id: number) => {
    try {
      await deleteApiKey.mutateAsync(id);
      toast({
        title: "تم حذف المفتاح",
        description: "تم حذف مفتاح API بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف مفتاح API",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-400">نشط</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500/20 text-gray-400">غير نشط</Badge>;
      case "suspended":
        return <Badge className="bg-red-500/20 text-red-400">معلق</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400">{status}</Badge>;
    }
  };

  return (
    <Card className="glass-morphism border-red-500/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <Key className="w-5 h-5 text-yellow-500" />
            إدارة مفاتيح API
          </CardTitle>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                مفتاح جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-wolf-gray border-red-500/20">
              <DialogHeader>
                <DialogTitle className="text-white">إنشاء مفتاح API جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300">اسم المفتاح</Label>
                  <Input
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                    placeholder="أدخل اسم المفتاح"
                    className="bg-wolf-dark border-red-500/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">النموذج</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="bg-wolf-dark border-red-500/30 text-white">
                      <SelectValue placeholder="اختر النموذج" />
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
                <div>
                  <Label className="text-gray-300">الحد الأقصى للطلبات</Label>
                  <Input
                    type="number"
                    value={maxRequests}
                    onChange={(e) => setMaxRequests(e.target.value)}
                    className="bg-wolf-dark border-red-500/30 text-white"
                  />
                </div>
                <Button 
                  onClick={handleCreateKey}
                  disabled={!keyName || !selectedModel || createApiKey.isPending}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  {createApiKey.isPending ? "جاري الإنشاء..." : "إنشاء المفتاح"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-red-500/20">
                <TableHead className="text-gray-300">اسم المفتاح</TableHead>
                <TableHead className="text-gray-300">النموذج</TableHead>
                <TableHead className="text-gray-300">الاستخدام</TableHead>
                <TableHead className="text-gray-300">الحالة</TableHead>
                <TableHead className="text-gray-300">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys?.map((apiKey) => {
                const model = models?.find(m => m.id === apiKey.modelId);
                const usagePercentage = (apiKey.usage || 0) * 100;
                
                return (
                  <TableRow key={apiKey.id} className="border-red-500/10 hover:bg-red-500/5">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="font-medium text-white">{apiKey.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {model?.name || "Unknown"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={usagePercentage} className="w-20" />
                        <span className="text-sm text-gray-400">
                          {usagePercentage.toFixed(0)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(apiKey.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="p-2 hover:bg-red-500/20 text-red-500"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="p-2 hover:bg-red-500/20 text-red-400"
                          onClick={() => handleDeleteKey(apiKey.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
