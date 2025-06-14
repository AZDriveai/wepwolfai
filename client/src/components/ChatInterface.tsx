"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Send,
  Mic,
  ImageIcon,
  Code,
  Search,
  Sparkles,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Crown,
  Brain,
  Wand2,
} from "lucide-react"
import { useModels } from "@/hooks/use-models"
import { apiRequest } from "@/lib/queryClient"
import { useToast } from "@/hooks/use-toast"

interface ChatMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  model?: string
  responseTime?: number
  isCode?: boolean
  isApp?: boolean
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "assistant",
      content:
        "مرحباً! أنا Wolf AI، مساعدك الذكي المتطور. يمكنني مساعدتك في:\n\n• الإجابة على الأسئلة المعقدة\n• كتابة وشرح الكود البرمجي\n• إنشاء تطبيقات ويب كاملة\n• تحليل البيانات والمشاريع\n\nكيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date(),
      model: "Wolf AI",
    },
  ])

  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState("1")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const { data: models } = useModels()
  const { toast } = useToast()

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await apiRequest("POST", "/api/chat", {
        modelId: Number.parseInt(selectedModel),
        message: inputMessage,
      })

      const chatResponse = await response.json()

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: chatResponse.response,
        timestamp: new Date(),
        model: models?.find((m) => m.id === Number.parseInt(selectedModel))?.name,
        responseTime: chatResponse.responseTime,
        isCode: inputMessage.toLowerCase().includes("كود") || inputMessage.toLowerCase().includes("code"),
        isApp: inputMessage.toLowerCase().includes("تطبيق") || inputMessage.toLowerCase().includes("app"),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال الرسالة",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "تم النسخ",
      description: "تم نسخ المحتوى إلى الحافظة",
    })
  }

  const formatMessage = (content: string, isCode?: boolean) => {
    if (isCode) {
      return (
        <div className="bg-wolf-dark rounded-xl p-5 border border-red-500/30 shadow-aura">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-400 arabic-body">كود برمجي</span>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">جاهز للنسخ</Badge>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(content)}
              className="text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <pre className="text-sm text-gray-100 overflow-x-auto bg-black/30 p-3 rounded-lg">
            <code>{content}</code>
          </pre>
        </div>
      )
    }

    return (
      <div className="prose prose-invert max-w-none">
        {content.split("\n").map((line, index) => (
          <p key={index} className="text-gray-100 leading-relaxed mb-3 arabic-body" style={{ lineHeight: "1.8" }}>
            {line}
          </p>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] max-w-4xl mx-auto">
      {/* Enhanced Chat Header */}
      <Card className="glass-morphism border-red-500/30 mb-4 shadow-aura">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-4 text-white">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mystical-glow animate-pulse">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"></div>
              </div>
              <div>
                <span className="text-xl font-bold arabic-title">Wolf AI</span>
                <p className="text-sm text-gray-400 font-normal arabic-body">مساعد ذكي متطور • نشط الآن</p>
              </div>
            </CardTitle>

            <div className="flex items-center gap-3">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/40 px-3 py-1 animate-pulse">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></div>
                متصل
              </Badge>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-wolf-gray border border-red-500/40 rounded-lg px-4 py-2 text-sm text-white hover:border-red-500/60 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50"
              >
                {models?.map((model) => (
                  <option key={model.id} value={model.id} className="bg-wolf-gray">
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Chat Messages */}
      <Card className="glass-morphism border-red-500/20 flex-1 flex flex-col">
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "assistant" && (
                    <Avatar className="w-8 h-8 border-2 border-red-500/30">
                      <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-800 text-white text-xs">
                        W
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className={`max-w-3xl ${message.type === "user" ? "ml-12" : "mr-12"}`}>
                    <div
                      className={`rounded-2xl p-4 ${
                        message.type === "user" ? "bg-red-600 text-white" : "bg-wolf-gray border border-red-500/20"
                      }`}
                    >
                      {formatMessage(message.content, message.isCode)}
                    </div>

                    {/* Message Footer */}
                    <div className="flex items-center justify-between mt-2 px-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {message.model && <span>{message.model}</span>}
                        {message.responseTime && <span>• {message.responseTime.toFixed(1)}s</span>}
                        <span>
                          • {message.timestamp.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>

                      {message.type === "assistant" && (
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-500 hover:text-green-400">
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-500 hover:text-red-400">
                            <ThumbsDown className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-gray-500 hover:text-white"
                            onClick={() => copyToClipboard(message.content)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {message.type === "user" && (
                    <Avatar className="w-8 h-8 border-2 border-yellow-500/30">
                      <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white text-xs">
                        أ
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <Avatar className="w-8 h-8 border-2 border-red-500/30">
                    <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-800 text-white text-xs">
                      W
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-wolf-gray border border-red-500/20 rounded-2xl p-4 max-w-xs">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400">جاري الكتابة...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        {/* Enhanced Chat Input */}
        <div className="border-t border-red-500/30 p-6 bg-gradient-to-r from-wolf-gray/50 to-wolf-dark/50">
          <div className="flex items-end gap-4">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب رسالتك هنا... (Enter للإرسال، Shift+Enter لسطر جديد)"
                className="min-h-[60px] max-h-40 bg-wolf-gray/80 border-red-500/40 text-white resize-none pr-16 pl-4 py-4 rounded-xl focus:border-red-500/60 focus:ring-2 focus:ring-red-500/30 arabic-body"
                style={{ direction: "rtl", textAlign: "right" }}
                disabled={isLoading}
              />

              {/* Enhanced Quick Actions */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-gray-500 hover:text-white hover:bg-red-500/20 transition-colors"
                >
                  <ImageIcon className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-gray-500 hover:text-white hover:bg-red-500/20 transition-colors"
                >
                  <Mic className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-gray-500 hover:text-white hover:bg-red-500/20 transition-colors"
                >
                  <Code className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-gray-500 hover:text-white hover:bg-red-500/20 transition-colors"
                >
                  <Wand2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 h-14 w-14 p-0 mystical-glow btn-enhanced rounded-xl"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-6 h-6" />
              )}
            </Button>
          </div>

          {/* Enhanced Suggested Prompts */}
          <div className="flex flex-wrap gap-3 mt-4">
            <Button
              size="sm"
              variant="outline"
              className="border-red-500/40 text-red-400 hover:bg-red-500/20 text-sm px-4 py-2 rounded-full hover-lift"
              onClick={() => setInputMessage("أنشئ لي تطبيق ويب متقدم لإدارة المشاريع")}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              إنشاء تطبيق متقدم
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-red-500/40 text-red-400 hover:bg-red-500/20 text-sm px-4 py-2 rounded-full hover-lift"
              onClick={() => setInputMessage("اكتب لي كود Python متقدم لتحليل البيانات الضخمة")}
            >
              <Code className="w-4 h-4 mr-2" />
              برمجة متقدمة
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-red-500/40 text-red-400 hover:bg-red-500/20 text-sm px-4 py-2 rounded-full hover-lift"
              onClick={() => setInputMessage("حلل هذه البيانات وقدم رؤى ذكية")}
            >
              <Brain className="w-4 h-4 mr-2" />
              تحليل ذكي
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-red-500/40 text-red-400 hover:bg-red-500/20 text-sm px-4 py-2 rounded-full hover-lift"
              onClick={() => setInputMessage("ما هي أحدث تقنيات الذكاء الاصطناعي؟")}
            >
              <Search className="w-4 h-4 mr-2" />
              استكشاف تقني
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
