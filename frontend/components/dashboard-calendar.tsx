"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Mic, Play, Edit, Trash2 } from "lucide-react"

const mockShows = [
  {
    id: 1,
    title: "Morning News Brief",
    time: "06:00 - 07:00",
    presenter: "AI Sarah",
    status: "scheduled",
    listeners: "2.3K",
    type: "news",
  },
  {
    id: 2,
    title: "Tech Talk Tuesday",
    time: "14:00 - 15:00",
    presenter: "AI Marcus",
    status: "live",
    listeners: "1.8K",
    type: "technology",
  },
  {
    id: 3,
    title: "Evening Jazz",
    time: "20:00 - 22:00",
    presenter: "AI Luna",
    status: "scheduled",
    listeners: "3.1K",
    type: "music",
  },
  {
    id: 4,
    title: "Local Community Hour",
    time: "16:00 - 17:00",
    presenter: "AI David",
    status: "recording",
    listeners: "950",
    type: "community",
  },
]

const getStatusColor = (status: string) => {
  if (!status) return "bg-gray-700 text-gray-300 border-gray-600"

  switch (status) {
    case "live":
      return "bg-red-500 text-white border-red-500"
    case "recording":
      return "bg-orange-500 text-white border-orange-500"
    case "scheduled":
      return "bg-blue-500 text-white border-blue-500"
    default:
      return "bg-gray-700 text-gray-300 border-gray-600"
  }
}

const getTypeColor = (type: string) => {
  if (!type) return "bg-gray-700 text-gray-300"

  switch (type) {
    case "news":
      return "bg-purple-500 text-white"
    case "technology":
      return "bg-green-500 text-white"
    case "music":
      return "bg-pink-500 text-white"
    case "community":
      return "bg-yellow-500 text-black"
    default:
      return "bg-gray-700 text-gray-300"
  }
}

interface DashboardCalendarProps {
  onShowEdit: (show: any) => void
}

export function DashboardCalendar({ onShowEdit }: DashboardCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Widget */}
        <Card className="lg:col-span-1 bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Calendar className="w-5 h-5" />
              <span>Schedule Calendar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-white">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-sm text-gray-400 mt-2">{mockShows.length} shows scheduled</div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Shows */}
        <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Today's Programming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockShows.map((show) => (
                <div
                  key={show.id}
                  className="flex items-center justify-between p-4 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-750 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <Mic className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{show?.title || "Untitled Show"}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{show?.time || "TBD"}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{show?.listeners || "0"}</span>
                        </div>
                        <span>by {show?.presenter || "Unknown"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getTypeColor(show?.type)}>{show?.type || "general"}</Badge>
                    <Badge className={getStatusColor(show?.status)}>{show?.status || "unknown"}</Badge>
                    <div className="flex space-x-2">
                      {show?.status === "live" && (
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-700">
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onShowEdit(show)}
                        className="text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
