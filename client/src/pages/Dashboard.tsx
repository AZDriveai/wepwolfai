import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import Sidebar from "@/components/Sidebar";
import TrainingInterface from "@/components/TrainingInterface";
import APIKeyManagement from "@/components/APIKeyManagement";
import ModelTesting from "@/components/ModelTesting";
import ModelsManagement from "@/components/ModelsManagement";
import ChatInterface from "@/components/ChatInterface";
import AppGenerator from "@/components/AppGenerator";
import StatsCards from "@/components/StatsCards";
import { Crown, Brain, GraduationCap, Key, BarChart3, Settings, MessageSquare, Wand2 } from "lucide-react";

const menuItems = [
  { id: "dashboard", icon: Crown, label: "لوحة التحكم" },
  { id: "chat", icon: MessageSquare, label: "المحادثة الذكية" },
  { id: "generator", icon: Wand2, label: "مولد التطبيقات" },
  { id: "models", icon: Brain, label: "إدارة النماذج" },
  { id: "training", icon: GraduationCap, label: "تدريب النماذج" },
  { id: "api", icon: Key, label: "مفاتيح API" },
  { id: "analytics", icon: BarChart3, label: "التحليلات" },
  { id: "settings", icon: Settings, label: "الإعدادات" },
];

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showHero, setShowHero] = useState(true);

  const renderContent = () => {
    switch (activeSection) {
      case "training":
        return <TrainingInterface />;
      case "api":
        return <APIKeyManagement />;
      case "models":
        return <ModelsManagement />;
      case "chat":
        return <ChatInterface />;
      case "generator":
        return <AppGenerator />;
      default:
        return (
          <div className="space-y-8">
            <div className="mb-8 dark-energy shadow-aura rounded-lg p-6">
              <h2 className="text-3xl font-bold lightning-text mb-2">مرحباً بك في Wolf AI</h2>
              <p className="text-gray-300">سيد الذكاء الاصطناعي وملك النماذج المتقدمة</p>
            </div>
            <StatsCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TrainingInterface />
              <ModelTesting />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-wolf-dark text-gray-100">
      {showHero && <HeroSection onEnterDashboard={() => setShowHero(false)} />}
      
      {!showHero && (
        <>
          {/* Navigation Header */}
          <nav className="glass-morphism sticky top-0 z-50 border-b border-red-500/20 shadow-aura">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg blood-crown mystical-glow flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-xl lightning-text">Wolf AI</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors shadow-aura">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 mystical-glow"></div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Dashboard */}
          <main className="min-h-screen bg-gradient-to-br from-wolf-dark via-wolf-gray to-wolf-dark">
            <div className="flex">
              <Sidebar 
                menuItems={menuItems}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
              
              {/* Main Content */}
              <div className="flex-1 p-8">
                {renderContent()}
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
