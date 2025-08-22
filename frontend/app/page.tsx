"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Radio,
  FileText,
  Volume2,
  AirplayIcon as Broadcast,
  Settings,
  Plus,
  Menu,
  X,
  BarChart3,
} from "lucide-react"
import { DashboardCalendar } from "@/components/dashboard-calendar"
import { ShowCreationModal } from "@/components/show-creation-modal"
import { ScriptReviewPage } from "@/components/script-review-page"
import { AudioManagementPage } from "@/components/audio-management-page"
import { StreamingPage } from "@/components/streaming-page"
import { AdminDashboard } from "@/components/admin-dashboard"

const navigation = [
  { name: "Dashboard", icon: BarChart3, id: "dashboard" },
  { name: "Schedule", icon: Calendar, id: "schedule" },
  { name: "Script Review", icon: FileText, id: "scripts" },
  { name: "Audio & Voice", icon: Volume2, id: "audio" },
  { name: "Streaming", icon: Broadcast, id: "streaming" },
  { name: "Settings", icon: Settings, id: "settings" },
]

export default function RadioDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showModal, setShowModal] = useState(false)
  const [selectedShow, setSelectedShow] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleShowCreate = (showData: any) => {
    if (showData) {
      console.log("Creating show:", showData)
      setShowModal(false)
      setSelectedShow(null)
    }
  }

  const handleShowEdit = (show: any) => {
    if (show && show.id) {
      setSelectedShow(show)
      setShowModal(true)
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard onCreateShow={() => setShowModal(true)} />
      case "schedule":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Radio Schedule</h1>
                <p className="text-gray-400">Manage your daily programming schedule</p>
              </div>
              <Button
                onClick={() => setShowModal(true)}
                className="bg-[#FDD630] hover:bg-yellow-600 text-black font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Show
              </Button>
            </div>
            <DashboardCalendar onShowEdit={handleShowEdit} />
          </div>
        )
      case "scripts":
        return <ScriptReviewPage />
      case "audio":
        return <AudioManagementPage />
      case "streaming":
        return <StreamingPage />
      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="text-gray-400">Configure your radio platform</p>
            </div>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <p className="text-gray-400">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-400">Select a section from the sidebar</p>
          </div>
        )
    }
  }

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 ease-in-out bg-[#110F0F]  border-gray-800 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="border-b border-gray-800 p-6">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <div className="w-8 h-8 bg-[#FDD630] rounded-lg flex items-center justify-center">
              <Radio className="w-5 h-5 text-black" />
            </div>
            {sidebarOpen && (
              <div>
                <h2 className="font-semibold text-white">AIRadio</h2>
                <p className="text-xs text-gray-400">Admin Dashboard</p>
                
              </div>
            )}
          </div>
          
        </div>

        

        {/* Sidebar Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-[#FDD630] text-black font-medium"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
                title={!sidebarOpen ? item.name : undefined}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm">{item.name}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-300">AD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-gray-400 truncate">admin@radiostation.com</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">


        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto bg-black">{renderContent()}</main>
      </div>

      {/* Modal */}
      <ShowCreationModal
        open={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedShow(null)
        }}
        onSubmit={handleShowCreate}
        initialData={selectedShow || undefined}
      />
    </div>
  )
}
