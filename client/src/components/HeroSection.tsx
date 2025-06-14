import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Sparkles, Zap, Shield, Globe } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-bounce delay-1000"></div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Content Section */}
          <div className="space-y-8 text-center lg:text-right">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 ml-2" />
                منصة الذكاء الاصطناعي المتقدمة
              </Badge>

              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
                Wolf AI
                <span className="block text-3xl lg:text-4xl mt-2 text-blue-400">مستقبل الذكاء الاصطناعي</span>
              </h1>

              <p className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                اكتشف قوة الذكاء الاصطناعي مع منصة Wolf AI المتطورة. قم بتدريب النماذج، إنشاء التطبيقات، وإدارة مشاريعك
                بسهولة تامة.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="w-5 h-5 ml-2" />
                ابدأ الآن مجاناً
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
              >
                <Globe className="w-5 h-5 ml-2" />
                استكشف المنصة
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">سرعة فائقة</h3>
                  <p className="text-gray-400 text-sm">معالجة فورية للبيانات</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">أمان متقدم</h3>
                  <p className="text-gray-400 text-sm">حماية شاملة للبيانات</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Globe className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">وصول عالمي</h3>
                  <p className="text-gray-400 text-sm">متاح في كل مكان</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Visual Section */}
          <div className="relative">
            <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Wolf AI Engine</h3>
                  <p className="text-gray-300">محرك الذكاء الاصطناعي المتطور</p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/30 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
