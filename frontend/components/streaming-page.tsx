"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Radio,
  Play,
  Pause,
  Square,
  Volume2,
  Users,
  Signal,
  Settings,
  BarChart3,
  Globe,
  Activity,
  Clock,
  Headphones,
} from "lucide-react"

const streamingStats = {
  status: "live",
  listeners: 1247,
  peakListeners: 1580,
  uptime: "2h 34m",
  bitrate: "320 kbps",
  quality: "Excellent",
  bandwidth: "2.1 MB/s",
}

const recentListeners = [
  { country: "United States", listeners: 423, percentage: 34 },
  { country: "Canada", listeners: 187, percentage: 15 },
  { country: "United Kingdom", listeners: 156, percentage: 12.5 },
  { country: "Australia", listeners: 134, percentage: 10.7 },
  { country: "Germany", listeners: 98, percentage: 7.9 },
  { country: "France", listeners: 87, percentage: 7 },
  { country: "Others", listeners: 162, percentage: 12.9 },
]

const streamingHistory = [
  {
    date: "2024-01-15",
    duration: "8h 15m",
    peakListeners: 1580,
    avgListeners: 1247,
    status: "completed",
  },
  {
    date: "2024-01-14",
    duration: "7h 45m",
    peakListeners: 1423,
    avgListeners: 1156,
    status: "completed",
  },
  {
    date: "2024-01-13",
    duration: "8h 30m",
    peakListeners: 1672,
    avgListeners: 1334,
    status: "completed",
  },
]

export function StreamingPage() {
  const [isStreaming, setIsStreaming] = useState(true)
  const [streamQuality, setStreamQuality] = useState("high")

  const handleStreamToggle = () => {
    setIsStreaming(!isStreaming)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-100 text-red-800 border-red-200"
      case "offline":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "starting":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Streaming & Broadcasting</h1>
        <p className="text-gray-600">Monitor and control your live radio stream</p>
      </div>

      <Tabs defaultValue="live" className="w-full">
        <TabsList>
          <TabsTrigger value="live">Live Stream</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Stream Settings</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          {/* Stream Control */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Radio className="w-5 h-5" />
                  <span>Live Stream Control</span>
                </div>
                <Badge className={getStatusColor(streamingStats.status)}>
                  <Signal className="w-3 h-3 mr-1" />
                  {streamingStats.status.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-4 py-8">
                <Button
                  size="lg"
                  onClick={handleStreamToggle}
                  className={isStreaming ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                >
                  {isStreaming ? (
                    <>
                      <Square className="w-5 h-5 mr-2" />
                      Stop Stream
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Start Stream
                    </>
                  )}
                </Button>
                <Button size="lg" variant="outline" disabled={!isStreaming}>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </Button>
                <Button size="lg" variant="outline">
                  <Settings className="w-5 h-5 mr-2" />
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Current Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{streamingStats.listeners.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Current Listeners</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {streamingStats.peakListeners.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Peak Today</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{streamingStats.uptime}</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{streamingStats.bitrate}</div>
                    <div className="text-sm text-gray-600">Stream Quality</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stream Health */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Stream Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Audio Quality</span>
                    <span className="font-medium text-green-600">{streamingStats.quality}</span>
                  </div>
                  <Progress value={95} className="w-full" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Connection Stability</span>
                    <span className="font-medium text-green-600">Stable</span>
                  </div>
                  <Progress value={98} className="w-full" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Bandwidth Usage</span>
                    <span className="font-medium text-blue-600">{streamingStats.bandwidth}</span>
                  </div>
                  <Progress value={65} className="w-full" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Listener Locations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentListeners.map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Globe className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium">{location.country}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{location.listeners}</span>
                        <div className="w-16">
                          <Progress value={location.percentage} className="h-2" />
                        </div>
                        <span className="text-xs text-gray-500 w-8">{location.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Listeners</span>
                    <span className="font-medium">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg. Session Duration</span>
                    <span className="font-medium">23m 45s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Peak Concurrent</span>
                    <span className="font-medium">1,580</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Bounce Rate</span>
                    <span className="font-medium">12.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Device Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mobile</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={65} className="w-16 h-2" />
                      <span className="text-sm text-gray-600">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Desktop</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={25} className="w-16 h-2" />
                      <span className="text-sm text-gray-600">25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tablet</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={10} className="w-16 h-2" />
                      <span className="text-sm text-gray-600">10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Shows</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Morning News Brief</span>
                    <span className="text-sm font-medium">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Jazz Evening</span>
                    <span className="text-sm font-medium">987</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tech Talk</span>
                    <span className="text-sm font-medium">756</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Community Hour</span>
                    <span className="text-sm font-medium">543</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Stream Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Stream URL</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value="rtmp://stream.radiostation.com/live"
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                    />
                    <Button size="sm" variant="outline">
                      Copy
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Stream Key</label>
                  <div className="flex space-x-2">
                    <input
                      type="password"
                      value="sk_live_abc123def456ghi789"
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                    />
                    <Button size="sm" variant="outline">
                      Show
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Auto-restart on disconnect</label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="auto-restart" defaultChecked />
                    <label htmlFor="auto-restart" className="text-sm text-gray-700">
                      Automatically restart stream if connection is lost
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Headphones className="w-5 h-5" />
                  <span>Audio Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Bitrate</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option value="128">128 kbps</option>
                    <option value="192">192 kbps</option>
                    <option value="256">256 kbps</option>
                    <option value="320" selected>
                      320 kbps
                    </option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Sample Rate</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option value="22050">22.05 kHz</option>
                    <option value="44100" selected>
                      44.1 kHz
                    </option>
                    <option value="48000">48 kHz</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Buffer Size</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option value="1024">1024 samples</option>
                    <option value="2048" selected>
                      2048 samples
                    </option>
                    <option value="4096">4096 samples</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Streaming History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-900">Date</th>
                      <th className="text-left p-4 font-medium text-gray-900">Duration</th>
                      <th className="text-left p-4 font-medium text-gray-900">Peak Listeners</th>
                      <th className="text-left p-4 font-medium text-gray-900">Avg Listeners</th>
                      <th className="text-left p-4 font-medium text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {streamingHistory.map((session, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4">{session.date}</td>
                        <td className="p-4">{session.duration}</td>
                        <td className="p-4">{session.peakListeners.toLocaleString()}</td>
                        <td className="p-4">{session.avgListeners.toLocaleString()}</td>
                        <td className="p-4">
                          <Badge className="bg-green-100 text-green-800">{session.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
