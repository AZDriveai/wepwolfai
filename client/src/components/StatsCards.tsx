import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Zap, Users, Server, Activity, Target, Sparkles } from "lucide-react"

export default function StatsCards() {
  const stats = [
    {
      title: "النماذج النشطة",
      value: "47",
      change: "+12%",
      icon: Brain,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
      progress: 85,
      description: "نماذج ذكية جاهزة للاستخدام",
    },
    {
      title: "عمليات التدريب",
      value: "1.2M",
      change: "+24%",
      icon: Zap,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/30",
      progress: 92,
      description: "عملية تدريب مكتملة بنجاح",
    },
    {
      title: "المستخدمون النشطون",
      value: "15.8K",
      change: "+18%",
      icon: Users,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
      progress: 78,
      description: "مستخدم نشط هذا الشهر",
    },
    {
      title: "معدل الأداء",
      value: "99.9%",
      change: "+0.1%",
      icon: Activity,
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30",
      progress: 99,
      description: "وقت تشغيل موثوق",
    },
    {
      title: "الطلبات اليومية",
      value: "2.4M",
      change: "+35%",
      icon: Server,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30",
      progress: 88,
      description: "طلب API يومياً",
    },
    {
      title: "معدل الدقة",
      value: "97.8%",
      change: "+2.1%",
      icon: Target,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/30",
      progress: 98,
      description: "دقة في النتائج",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card
            key={index}
            className={`glass-morphism ${stat.borderColor} hover-lift group cursor-pointer transform transition-all duration-500 hover:scale-105 mystical-glow`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div
                  className={`p-3 rounded-xl ${stat.bgColor} ${stat.borderColor} border group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <Badge className={`${stat.bgColor} ${stat.color} border-transparent px-3 py-1 font-bold`}>
                  {stat.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-yellow-400 group-hover:bg-clip-text transition-all duration-300">
                    {stat.value}
                  </span>
                  <Sparkles
                    className={`w-4 h-4 ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </div>
                <p className="text-gray-400 text-sm arabic-body font-medium">{stat.title}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 arabic-body">التقدم</span>
                  <span className="text-xs font-bold text-gray-400">{stat.progress}%</span>
                </div>
                <Progress value={stat.progress} className="h-2 bg-wolf-gray" />
              </div>

              <p className="text-xs text-gray-500 arabic-body leading-relaxed">{stat.description}</p>

              <div
                className={`h-1 bg-gradient-to-r from-${stat.color.split("-")[1]}-400 to-${stat.color.split("-")[1]}-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
              ></div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
