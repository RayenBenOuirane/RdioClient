"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Mic, Calendar } from "lucide-react"

interface ShowCreationModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  initialData?: any
}

const showTypes = [
  { value: "news", label: "News & Current Affairs", icon: "📰" },
  { value: "music", label: "Music & Entertainment", icon: "🎵" },
  { value: "talk", label: "Talk Show", icon: "🎙️" },
  { value: "technology", label: "Technology", icon: "💻" },
  { value: "community", label: "Community", icon: "🏘️" },
  { value: "sports", label: "Sports", icon: "⚽" },
]

const aiVoices = [
  { id: "sarah", name: "Sarah", description: "Professional news presenter", accent: "American" },
  { id: "marcus", name: "Marcus", description: "Tech enthusiast host", accent: "British" },
  { id: "luna", name: "Luna", description: "Smooth jazz presenter", accent: "Canadian" },
  { id: "david", name: "David", description: "Community advocate", accent: "Australian" },
]

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "ar", name: "Arabic" },
]

export function ShowCreationModal({ open, onClose, onSubmit, initialData }: ShowCreationModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    duration: "30",
    language: "en",
    voice: "",
    topics: "",
    schedule: {
      frequency: "daily",
      time: "09:00",
      days: [],
    },
    aiSettings: {
      creativity: 50,
      formality: 50,
      includeMusic: false,
      includeNews: true,
      localContent: true,
    },
  })

  useEffect(() => {
    if (initialData && typeof initialData === "object") {
      setFormData((prev) => ({ ...prev, ...initialData }))
    } else {
      // Reset form when no initial data
      setFormData({
        title: "",
        description: "",
        type: "",
        duration: "30",
        language: "en",
        voice: "",
        topics: "",
        schedule: {
          frequency: "daily",
          time: "09:00",
          days: [],
        },
        aiSettings: {
          creativity: 50,
          formality: 50,
          includeMusic: false,
          includeNews: true,
          localContent: true,
        },
      })
    }
  }, [initialData, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.type) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span>{initialData ? "Edit Show" : "Create New AI Radio Show"}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800">
              <TabsTrigger value="basic" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                Content
              </TabsTrigger>
              <TabsTrigger value="voice" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                Voice & Style
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
              >
                Schedule
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-300">
                    Show Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter show title"
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-gray-300">
                    Show Type
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select show type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {showTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-white hover:bg-gray-700">
                          <span className="flex items-center space-x-2">
                            <span>{type.icon}</span>
                            <span>{type.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your show's content and target audience"
                  rows={3}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-gray-300">
                    Duration (minutes)
                  </Label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="15" className="text-white hover:bg-gray-700">
                        15 minutes
                      </SelectItem>
                      <SelectItem value="30" className="text-white hover:bg-gray-700">
                        30 minutes
                      </SelectItem>
                      <SelectItem value="45" className="text-white hover:bg-gray-700">
                        45 minutes
                      </SelectItem>
                      <SelectItem value="60" className="text-white hover:bg-gray-700">
                        1 hour
                      </SelectItem>
                      <SelectItem value="90" className="text-white hover:bg-gray-700">
                        1.5 hours
                      </SelectItem>
                      <SelectItem value="120" className="text-white hover:bg-gray-700">
                        2 hours
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-gray-300">
                    Language
                  </Label>
                  <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code} className="text-white hover:bg-gray-700">
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topics" className="text-gray-300">
                  Topics & Keywords
                </Label>
                <Textarea
                  id="topics"
                  value={formData.topics}
                  onChange={(e) => handleInputChange("topics", e.target.value)}
                  placeholder="Enter topics, keywords, or themes (comma-separated)"
                  rows={3}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-gray-300">Content Settings</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="includeNews"
                          checked={formData.aiSettings.includeNews}
                          onChange={(e) => handleNestedChange("aiSettings", "includeNews", e.target.checked)}
                          className="accent-yellow-500"
                        />
                        <Label htmlFor="includeNews" className="text-sm text-gray-300">
                          Include News Updates
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="includeMusic"
                          checked={formData.aiSettings.includeMusic}
                          onChange={(e) => handleNestedChange("aiSettings", "includeMusic", e.target.checked)}
                          className="accent-yellow-500"
                        />
                        <Label htmlFor="includeMusic" className="text-sm text-gray-300">
                          Include Music Segments
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="localContent"
                          checked={formData.aiSettings.localContent}
                          onChange={(e) => handleNestedChange("aiSettings", "localContent", e.target.checked)}
                          className="accent-yellow-500"
                        />
                        <Label htmlFor="localContent" className="text-sm text-gray-300">
                          Local Content Focus
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="voice" className="space-y-4">
              <div className="space-y-4">
                <Label className="text-gray-300">Select AI Voice Presenter</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiVoices.map((voice) => (
                    <Card
                      key={voice.id}
                      className={`cursor-pointer transition-colors ${
                        formData.voice === voice.id
                          ? "border-yellow-500 bg-gray-800"
                          : "bg-gray-800 border-gray-700 hover:bg-gray-750"
                      }`}
                      onClick={() => handleInputChange("voice", voice.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Mic className="w-5 h-5 text-black" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{voice.name}</h3>
                            <p className="text-sm text-gray-400">{voice.description}</p>
                            <Badge variant="outline" className="text-xs mt-1 border-gray-600 text-gray-300">
                              {voice.accent}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-gray-300">Voice Style Settings</Label>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-gray-300">Creativity Level: {formData.aiSettings.creativity}%</Label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.aiSettings.creativity}
                      onChange={(e) => handleNestedChange("aiSettings", "creativity", Number.parseInt(e.target.value))}
                      className="w-full mt-2 accent-yellow-500"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-300">Formality Level: {formData.aiSettings.formality}%</Label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.aiSettings.formality}
                      onChange={(e) => handleNestedChange("aiSettings", "formality", Number.parseInt(e.target.value))}
                      className="w-full mt-2 accent-yellow-500"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency" className="text-gray-300">
                    Frequency
                  </Label>
                  <Select
                    value={formData.schedule.frequency}
                    onValueChange={(value) => handleNestedChange("schedule", "frequency", value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="daily" className="text-white hover:bg-gray-700">
                        Daily
                      </SelectItem>
                      <SelectItem value="weekly" className="text-white hover:bg-gray-700">
                        Weekly
                      </SelectItem>
                      <SelectItem value="weekdays" className="text-white hover:bg-gray-700">
                        Weekdays Only
                      </SelectItem>
                      <SelectItem value="weekends" className="text-white hover:bg-gray-700">
                        Weekends Only
                      </SelectItem>
                      <SelectItem value="custom" className="text-white hover:bg-gray-700">
                        Custom
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-gray-300">
                    Broadcast Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.schedule.time}
                    onChange={(e) => handleNestedChange("schedule", "time", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Show will be automatically generated and broadcast according to your schedule</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-800">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              {initialData ? "Update Show" : "Create Show"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
