"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Edit,
  Play,
  Download,
  RefreshCw,
  Sparkles,
  Volume2,
} from "lucide-react"

const mockScripts = [
  {
    id: 1,
    title: "Morning News Brief - Tech Focus",
    show: "Morning News Brief",
    generatedAt: "2024-01-15 08:30",
    status: "pending",
    duration: "5 min",
    presenter: "AI Sarah",
    content: `Good morning, and welcome to your Morning News Brief. I'm Sarah, and it's Monday, January 15th.

Let's start with technology news. OpenAI has announced a major breakthrough in their latest language model, showing significant improvements in reasoning capabilities. The new model demonstrates enhanced problem-solving skills and better understanding of complex queries.

In other tech news, Apple has reported record quarterly earnings, driven primarily by strong iPhone sales in international markets. The company's services division also showed robust growth, contributing significantly to overall revenue.

Moving to local news, the city council has approved funding for a new digital infrastructure project aimed at improving internet connectivity in underserved areas. The initiative is expected to benefit over 10,000 residents and will be completed by the end of this year.

Weather update: Today will be partly cloudy with temperatures reaching 72°F. Perfect weather for outdoor activities this afternoon.

That's your morning brief. Stay tuned for more updates throughout the day. This is Sarah, wishing you a productive Monday.`,
    aiNotes: "Generated based on current tech trends and local community focus. Tone: Professional, informative.",
  },
  {
    id: 2,
    title: "Jazz Evening Introduction",
    show: "Jazz & Chill Evening",
    generatedAt: "2024-01-15 19:45",
    status: "approved",
    duration: "3 min",
    presenter: "AI Luna",
    content: `Welcome to Jazz & Chill Evening. I'm Luna, your host for the next two hours of smooth sounds and relaxing rhythms.

Tonight, we're taking a journey through the golden age of jazz, featuring classics from Miles Davis, John Coltrane, and Ella Fitzgerald. We'll also discover some contemporary artists who are keeping the jazz tradition alive with their innovative approaches.

Our first selection comes from the legendary album "Kind of Blue" - a masterpiece that continues to inspire musicians decades after its release. Let's begin with "So What" by Miles Davis...

[Music transition]

As we settle into this evening's musical journey, I want to remind you that Jazz & Chill Evening is brought to you by our community of music lovers. Your requests and feedback help shape our playlist, so don't hesitate to reach out.

Coming up after this track, we'll hear from a rising star in the contemporary jazz scene, followed by a classic from the Ella Fitzgerald songbook. Stay with us for an evening of pure musical bliss.`,
    aiNotes:
      "Warm, intimate tone suitable for evening jazz programming. Includes artist information and smooth transitions.",
  },
  {
    id: 3,
    title: "Community Spotlight - Local Business Feature",
    show: "Local Community Hour",
    generatedAt: "2024-01-15 15:20",
    status: "needs_revision",
    duration: "8 min",
    presenter: "AI David",
    content: `Hello everyone, and welcome to Community Spotlight. I'm David, and today we're shining a light on the incredible local businesses that make our community special.

Our featured business today is "Green Thumb Gardens," a family-owned nursery that's been serving our area for over 25 years. Founded by Maria and Carlos Rodriguez, this local gem has become the go-to destination for gardening enthusiasts and beginners alike.

What makes Green Thumb Gardens special isn't just their extensive selection of plants and gardening supplies, but their commitment to sustainable practices and community education. They offer free workshops every Saturday morning, covering topics from organic gardening to composting.

Maria Rodriguez shared with us: "We believe that gardening brings people together and helps create a more sustainable future for our children." The nursery sources many of their plants locally and partners with schools to create educational garden programs.

If you're looking to start your own garden or need expert advice on plant care, Green Thumb Gardens is located on Main Street, just past the community center. They're open Monday through Saturday, and their knowledgeable staff is always ready to help.

Coming up next, we'll hear about the upcoming community farmers market and how you can get involved as a vendor or volunteer.`,
    aiNotes:
      "Needs more specific details about location and contact information. Consider adding customer testimonials.",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "needs_revision":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="w-4 h-4" />
    case "pending":
      return <Clock className="w-4 h-4" />
    case "needs_revision":
      return <XCircle className="w-4 h-4" />
    default:
      return <FileText className="w-4 h-4" />
  }
}

export function ScriptReviewPage() {
  const [selectedScript, setSelectedScript] = useState(mockScripts[0])
  const [editMode, setEditMode] = useState(false)
  const [editedContent, setEditedContent] = useState("")

  const handleScriptSelect = (script: any) => {
    setSelectedScript(script)
    setEditMode(false)
    setEditedContent(script.content)
  }

  const handleEdit = () => {
    setEditMode(true)
    setEditedContent(selectedScript.content)
  }

  const handleSave = () => {
    // Here you would save the edited content
    setEditMode(false)
    console.log("Saving edited content:", editedContent)
  }

  const handleApprove = () => {
    console.log("Approving script:", selectedScript.id)
  }

  const handleReject = () => {
    console.log("Rejecting script:", selectedScript.id)
  }

  const handleRegenerate = () => {
    console.log("Regenerating script:", selectedScript.id)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Script Review</h1>
        <p className="text-gray-600">Review and approve AI-generated radio scripts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scripts List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Recent Scripts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockScripts.map((script) => (
                <div
                  key={script.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedScript.id === script.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => handleScriptSelect(script)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-sm">{script.title}</h3>
                    <Badge className={getStatusColor(script.status)}>
                      {getStatusIcon(script.status)}
                      <span className="ml-1 capitalize">{script.status.replace("_", " ")}</span>
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex items-center space-x-2">
                      <User className="w-3 h-3" />
                      <span>{script.presenter}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>{script.duration}</span>
                    </div>
                    <div>{script.generatedAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Script Content */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>{selectedScript.title}</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button size="sm" variant="outline">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Listen
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content" className="w-full">
              <TabsList>
                <TabsTrigger value="content">Script Content</TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
                <TabsTrigger value="ai-notes">AI Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                {editMode ? (
                  <div className="space-y-4">
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      rows={20}
                      className="font-mono text-sm"
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setEditMode(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm font-mono">{selectedScript.content}</pre>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleEdit} variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Script
                      </Button>
                      <Button onClick={handleRegenerate} variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                      {selectedScript.status === "pending" && (
                        <>
                          <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button onClick={handleReject} variant="destructive">
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="metadata" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Show</label>
                    <p className="text-sm text-gray-900">{selectedScript.show}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Presenter</label>
                    <p className="text-sm text-gray-900">{selectedScript.presenter}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Duration</label>
                    <p className="text-sm text-gray-900">{selectedScript.duration}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Generated</label>
                    <p className="text-sm text-gray-900">{selectedScript.generatedAt}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <Badge className={getStatusColor(selectedScript.status)}>
                      {selectedScript.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai-notes" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">AI Generation Notes</h3>
                        <p className="text-sm text-gray-600">{selectedScript.aiNotes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
