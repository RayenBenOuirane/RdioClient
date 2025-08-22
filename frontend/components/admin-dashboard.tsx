"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Radio,
  Clock,
  Play,
  Volume2,
  Mic,
  FileText,
  Plus,
  Headphones,
  MessageCircle,
  ThumbsUp,
  UserCheck,
} from "lucide-react"

interface AdminDashboardProps {
  onCreateShow: () => void
}

const dashboardStats = [
  {
    title: "Total Listeners",
    value: "12,847",
    change: "+12.3% Today",
    icon: Users,
    iconBg: "bg-[#FAE381]",
    iconColor: "text-black",
  },
  {
    title: "Active Shows",
    value: "25",
    change: "+4% This week",
    icon: Radio,
    iconBg: "bg-[#FAE381]",
    iconColor: "text-black",
  },
  {
    title: "Shows Aired",
    value: "156",
    change: "+8.2% This month",
    icon: Mic,
    iconBg: "bg-[#FAE381]",
    iconColor: "text-black",
  },
  {
    title: "Avg. Listen Time",
    value: "24m",
    change: "+2m from last week",
    icon: Headphones,
    iconBg: "bg-[#FAE381]",
    iconColor: "text-black",
  },
]

const engagementData = [
  { name: "Comment Rate", value: 78, icon: MessageCircle },
  { name: "Poll Participation", value: 65, icon: ThumbsUp },
  { name: "Listener Retention", value: 82, icon: UserCheck },
]

const currentShows = [
  {
    id: 1,
    title: "Morning News Brief",
    presenter: "AI Sarah",
    time: "06:00 Am",
    duration: "30m",
    listeners: 1420,
    status: "LIVE",
    statusColor: "bg-red-500",
  },
  {
    id: 2,
    title: "Tech Talk Tuesday",
    presenter: "AI Marcus",
    time: "11:00 Pm",
    duration: "45m",
    listeners: 0,
    status: "Scheduled",
    statusColor: "bg-blue-500",
  },
  {
    id: 3,
    title: "Jazz Evening",
    presenter: "AI Luna",
    time: "20:00 Pm",
    duration: "60m",
    listeners: 0,
    status: "Recording",
    statusColor: "bg-orange-500",
  },
    {
    id: 4,
    title: "Jazz Evening",
    presenter: "AI Luna",
    time: "20:00 Pm",
    duration: "60m",
    listeners: 0,
    status: "Recording",
    statusColor: "bg-green-500",
  },
]

const quickActions = [
  {
    title: "Create Show",
    description: "Generate a new AI radio show",
    icon: Plus,
    action: "create-show",
  },
  {
    title: "Schedule Show",
    description: "Organize upcoming shows",
    icon: Clock,
    action: "schedule",
  },
  {
    title: "Review Scripts",
    description: "Check pending script approvals",
    icon: FileText,
    action: "scripts",
  },
  {
    title: "Audio Library",
    description: "Manage voice and audio files",
    icon: Volume2,
    action: "audio",
  },
]

export function AdminDashboard({ onCreateShow }: AdminDashboardProps) {
  const handleQuickAction = (action: string) => {
    switch (action) {
      case "create-show":
        onCreateShow()
        break
      default:
        console.log(`Action: ${action}`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your AI-powered radio platform, create shows, and monitor performance</p>
        </div>
          <Button onClick={onCreateShow} className="bg-[#F6F6F6] hover:bg-[#F6F6F6] text-black font-medium h-15 ">
            <Plus className="w-4 h-4 mr-2" />
            Create Show
          </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="bg-[#110F0F] border-[#110F0F]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-xs text-green-400">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
{/* Listener Engagement */}
        <Card className="bg-[#110F0F] border-[#110F0F]">
          <CardHeader>
            <CardTitle className="text-white">Listener Engagement</CardTitle>
            <p className="text-sm text-gray-400">Average engagement rates across all shows</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {engagementData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{item.value}%</span>
                </div>
                <div className="w-full bg-[#161616]  rounded-full h-2">
                  <div
                    className="bg-[#FAE381] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Current Shows */}
        <Card className="bg-[#110F0F] border-[#110F0F]">
          <CardHeader>
            <CardTitle className="text-white">Current Shows</CardTitle>
            <p className="text-sm text-gray-400">Explore what's live right now</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentShows.map((show) => (
              <div key={show.id} className="flex items-center justify-between p-4 bg-[#161616]  rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10  rounded-lg flex items-center justify-center">
                    <Radio className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{show.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{show.presenter}</span>
                      <span>{show.time}</span>
                      <span>{show.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {show.listeners > 0 && (
                    <div className="flex items-center space-x-1 text-sm text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{show.listeners.toLocaleString()}</span>
                    </div>
                  )}
                  <Badge className={`${show.statusColor} text-white border-0 font-medium`}>{show.status}</Badge>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-700">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        {/* Quick Actions */}
      <Card className="bg-[#110F0F] border-[#110F0F]">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
          <p className="text-sm text-gray-400">Access your essential tools instantly</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 p-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-[#161616] rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                onClick={() => handleQuickAction(action.action)}
              >
                <div className="w-10 h-10 bg-[#FAE381] rounded-lg flex items-center justify-center flex-shrink-0">
                  <action.icon className="w-5 h-5 text-black" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-white text-sm">{action.title}</h3>
                  <p className="text-xs text-gray-400 truncate">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>

      
    </div>
  )
}
