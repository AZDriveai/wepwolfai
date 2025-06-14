"use client"

import type React from "react"

import { Crown, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface MenuItem {
  id: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  badge?: string
  isNew?: boolean
}

interface SidebarProps {
  menuItems: MenuItem[]
  activeSection: string
  onSectionChange: (section: string) => void
}

export default function Sidebar({ menuItems, activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-72 glass-morphism border-r border-red-500/30 min-h-screen flex flex-col shadow-aura">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-red-500/20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl blood-crown mystical-glow flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white arabic-title">Wolf AI</h2>
            <p className="text-sm text-gray-400 arabic-body">لوحة التحكم الرئيسية</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                isActive
                  ? "bg-gradient-to-r from-red-600/30 to-red-700/20 border-r-4 border-red-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-red-500/10"
              } sidebar-nav`}
            >
              <div
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isActive ? "bg-red-500/30 text-red-400" : "bg-wolf-gray group-hover:bg-red-500/20"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 text-right">
                <span className="font-medium arabic-body text-sm">{item.label}</span>
              </div>

              {item.badge && (
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs px-2 py-1">{item.badge}</Badge>
              )}

              {item.isNew && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs px-2 py-1 animate-pulse">
                  جديد
                </Badge>
              )}

              {/* Hover effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isActive ? "opacity-100" : ""
                }`}
              ></div>
            </button>
          )
        })}
      </nav>

      <Separator className="bg-red-500/20" />

      {/* User Profile Section */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-wolf-gray/50 hover:bg-red-500/10 transition-colors cursor-pointer group">
          <Avatar className="w-10 h-10 border-2 border-red-500/30">
            <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-800 text-white font-bold">
              م
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-right">
            <p className="text-sm font-medium text-white arabic-body">المدير العام</p>
            <p className="text-xs text-gray-400 arabic-body">admin@wolfai.com</p>
          </div>
          <Settings className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-white hover:bg-red-500/10 arabic-body"
        >
          <LogOut className="w-4 h-4 ml-2" />
          تسجيل الخروج
        </Button>
      </div>
    </div>
  )
}
