"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Volume2,
  Mic,
  Play,
  Pause,
  Download,
  Upload,
  Settings,
  AudioWaveformIcon as Waveform,
  User,
  Clock,
  FileAudio,
  Headphones,
} from "lucide-react"

const mockVoices = [
  {
    id: "sarah",
    name: "Sarah",
    type: "Professional News",
    accent: "American",
    gender: "Female",
    status: "active",
    usage: 85,
    samples: 12,
  },
  {
    id: "marcus",
    name: "Marcus",
    type: "Tech Enthusiast",
    accent: "British",
    gender: "Male",
    status: "active",
    usage: 72,
    samples: 8,
  },
  {
    id: "luna",
    name: "Luna",
    type: "Smooth Jazz Host",
    accent: "Canadian",
    gender: "Female",
    status: "active",
    usage: 91,
    samples: 15,
  },
  {
    id: "david",
    name: "David",
    type: "Community Advocate",
    accent: "Australian",
    gender: "Male",
    status: "training",
    usage: 45,
    samples: 5,
  },
]

const mockAudioFiles = [
  {
    id: 1,
    name: "Morning News Brief - Jan 15",
    duration: "5:23",
    size: "12.4 MB",
    format: "MP3",
    quality: "320kbps",
    voice: "Sarah",
    generatedAt: "2024-01-15 08:30",
    status: "ready",
  },
  {
    id: 2,
    name: "Jazz Evening Intro - Jan 14",
    duration: "3:45",
    size: "8.7 MB",
    format: "MP3",
    quality: "320kbps",
    voice: "Luna",
    generatedAt: "2024-01-14 19:45",
    status: "ready",
  },
  {
    id: 3,
    name: "Community Spotlight - Local Business",
    duration: "8:12",
    size: "18.9 MB",
    format: "MP3",
    quality: "320kbps",
    voice: "David",
    generatedAt: "2024-01-15 15:20",
    status: "processing",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "training":
      return "bg-yellow-100 text-yellow-800"
    case "ready":
      return "bg-blue-100 text-blue-800"
    case "processing":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function AudioManagementPage() {
  const [selectedVoice, setSelectedVoice] = useState(mockVoices[0])
  const [playingAudio, setPlayingAudio] = useState<number | null>(null)

  const handlePlayAudio = (audioId: number) => {
    if (playingAudio === audioId) {
      setPlayingAudio(null)
    } else {
      setPlayingAudio(audioId)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Audio & Voice Management</h1>
        <p className="text-gray-600">Manage AI voices and generated audio content</p>
      </div>

      <Tabs defaultValue="voices" className="w-full">
        <TabsList>
          <TabsTrigger value="voices">AI Voices</TabsTrigger>
          <TabsTrigger value="audio">Audio Files</TabsTrigger>
          <TabsTrigger value="settings">Audio Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="voices" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Voice List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mic className="w-5 h-5" />
                  <span>Available Voices</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockVoices.map((voice) => (
                    <div
                      key={voice.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedVoice.id === voice.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedVoice(voice)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{voice.name}</h3>
                        <Badge className={getStatusColor(voice.status)}>{voice.status}</Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>{voice.type}</div>
                        <div className="flex items-center space-x-2">
                          <User className="w-3 h-3" />
                          <span>
                            {voice.gender} • {voice.accent}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Usage: {voice.usage}%</span>
                          <span>{voice.samples} samples</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Voice Details */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Volume2 className="w-5 h-5" />
                    <span>{selectedVoice.name} Voice Profile</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      Test Voice
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Voice Type</label>
                    <p className="text-sm text-gray-900">{selectedVoice.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Accent</label>
                    <p className="text-sm text-gray-900">{selectedVoice.accent}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Gender</label>
                    <p className="text-sm text-gray-900">{selectedVoice.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <Badge className={getStatusColor(selectedVoice.status)}>{selectedVoice.status}</Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Usage Statistics</label>
                  <Progress value={selectedVoice.usage} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>{selectedVoice.usage}% used this month</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Voice Samples</label>
                  <div className="space-y-2">
                    {Array.from({ length: 3 }, (_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Waveform className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">Sample {i + 1} - News Introduction</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Play className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audio" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Generated Audio Files</h2>
              <p className="text-gray-600">Manage your AI-generated radio content</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Audio
              </Button>
              <Button>
                <FileAudio className="w-4 h-4 mr-2" />
                Generate New
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-900">File Name</th>
                      <th className="text-left p-4 font-medium text-gray-900">Duration</th>
                      <th className="text-left p-4 font-medium text-gray-900">Voice</th>
                      <th className="text-left p-4 font-medium text-gray-900">Quality</th>
                      <th className="text-left p-4 font-medium text-gray-900">Status</th>
                      <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAudioFiles.map((file) => (
                      <tr key={file.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div>
                            <div className="font-medium text-gray-900">{file.name}</div>
                            <div className="text-sm text-gray-600">
                              {file.size} • {file.format}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <span>{file.duration}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-600" />
                            <span>{file.voice}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{file.quality}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(file.status)}>{file.status}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePlayAudio(file.id)}
                              disabled={file.status === "processing"}
                            >
                              {playingAudio === file.id ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                            </Button>
                            <Button size="sm" variant="outline" disabled={file.status === "processing"}>
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Audio Quality Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Default Bitrate</label>
                  <Select defaultValue="320">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="128">128 kbps</SelectItem>
                      <SelectItem value="192">192 kbps</SelectItem>
                      <SelectItem value="256">256 kbps</SelectItem>
                      <SelectItem value="320">320 kbps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Sample Rate</label>
                  <Select defaultValue="44100">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="22050">22.05 kHz</SelectItem>
                      <SelectItem value="44100">44.1 kHz</SelectItem>
                      <SelectItem value="48000">48 kHz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Output Format</label>
                  <Select defaultValue="mp3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp3">MP3</SelectItem>
                      <SelectItem value="wav">WAV</SelectItem>
                      <SelectItem value="flac">FLAC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Headphones className="w-5 h-5" />
                  <span>Voice Processing</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Speech Speed: 1.0x</label>
                  <input type="range" min="0.5" max="2.0" step="0.1" defaultValue="1.0" className="w-full" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Pitch Adjustment: 0</label>
                  <input type="range" min="-10" max="10" step="1" defaultValue="0" className="w-full" />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="noise-reduction" defaultChecked />
                  <label htmlFor="noise-reduction" className="text-sm text-gray-700">
                    Enable noise reduction
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="auto-normalize" defaultChecked />
                  <label htmlFor="auto-normalize" className="text-sm text-gray-700">
                    Auto-normalize audio levels
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
