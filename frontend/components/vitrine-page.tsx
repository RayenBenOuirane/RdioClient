"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  Radio,
  Sparkles,
  Users,
  Clock,
  Globe,
  Mic,
  Volume2,
  TrendingUp,
  Star,
  Download,
  Share,
  Heart,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const featuredShows = [
  {
    id: "1",
    title: "AI Tech Weekly",
    description: "Exploring the latest in artificial intelligence and technology trends",
    duration: "45 min",
    category: "Technology",
    presenters: ["Alex Chen", "Sarah Williams"],
    listeners: "12.4K",
    rating: 4.8,
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["AI", "Technology", "Innovation"],
    isLive: false,
    nextAiring: "Today at 2:00 PM",
  },
  {
    id: "2",
    title: "Morning Global News",
    description: "Your daily briefing on world events and breaking news",
    duration: "30 min",
    category: "News",
    presenters: ["Marcus Johnson"],
    listeners: "8.7K",
    rating: 4.6,
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["News", "Global", "Current Events"],
    isLive: true,
    nextAiring: "Live Now",
  },
  {
    id: "3",
    title: "Local Community Spotlight",
    description: "Highlighting local businesses, events, and community stories",
    duration: "25 min",
    category: "Community",
    presenters: ["Emma Rodriguez", "David Kim"],
    listeners: "5.2K",
    rating: 4.9,
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["Local", "Community", "Business"],
    isLive: false,
    nextAiring: "Tomorrow at 6:00 PM",
  },
  {
    id: "4",
    title: "Jazz & Chill Evening",
    description: "Smooth jazz selections with AI-curated playlists and commentary",
    duration: "60 min",
    category: "Music",
    presenters: ["Sophia Turner"],
    listeners: "15.8K",
    rating: 4.7,
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["Jazz", "Music", "Relaxation"],
    isLive: false,
    nextAiring: "Tonight at 8:00 PM",
  },
]

const platformStats = [
  { label: "Total Shows", value: "150+", icon: Radio },
  { label: "Active Listeners", value: "45.2K", icon: Users },
  { label: "Hours Streamed", value: "2,400", icon: Clock },
  { label: "Countries Reached", value: "28", icon: Globe },
]

const aiFeatures = [
  {
    title: "Intelligent Script Generation",
    description: "AI creates engaging, contextual scripts based on topics, region, and timeframe",
    icon: Sparkles,
  },
  {
    title: "Natural Voice Synthesis",
    description: "High-quality TTS with multiple presenter personalities and voices",
    icon: Mic,
  },
  {
    title: "Dynamic Content Curation",
    description: "Smart content selection and real-time adaptation to audience preferences",
    icon: TrendingUp,
  },
  {
    title: "Automated Broadcasting",
    description: "Seamless scheduling and automated show transitions with quality control",
    icon: Volume2,
  },
]

export function VitrinePage() {
  const [playingShow, setPlayingShow] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Technology", "News", "Community", "Music"]

  const filteredShows =
    selectedCategory === "All" ? featuredShows : featuredShows.filter((show) => show.category === selectedCategory)

  const handlePlayShow = (showId: string) => {
    if (playingShow === showId) {
      setPlayingShow(null)
    } else {
      setPlayingShow(showId)
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-8 py-12 text-white">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Radio className="w-6 h-6" />
              </div>
              <Badge className="bg-white/20 text-white border-white/30">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Broadcasting
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              The Future of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Radio Broadcasting
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              Create, manage, and broadcast professional radio shows with AI-generated content, natural voice synthesis,
              and intelligent automation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Play className="w-5 h-5 mr-2" />
                Listen Live
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                Explore Shows
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {platformStats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Shows */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Shows</h2>
            <p className="text-gray-600">Discover our most popular AI-generated radio content</p>
          </div>
          <div className="flex space-x-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-600" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredShows.map((show) => (
            <Card key={show.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={show.thumbnail || "/placeholder.svg"} alt={show.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4">
                  {show.isLive ? (
                    <Badge className="bg-red-600 text-white">
                      <Radio className="w-3 h-3 mr-1" />
                      LIVE
                    </Badge>
                  ) : (
                    <Badge variant="secondary">{show.category}</Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <Button
                    size="sm"
                    className="bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => handlePlayShow(show.id)}
                  >
                    {playingShow === show.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{show.title}</h3>
                    <p className="text-gray-600 text-sm">{show.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {show.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{show.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{show.listeners}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{show.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {show.presenters.map((presenter, index) => (
                          <Avatar key={index} className="w-6 h-6 border-2 border-white">
                            <AvatarFallback className="text-xs">
                              {presenter
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{show.presenters.join(", ")}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {playingShow === show.id && (
                    <div className="space-y-2">
                      <Progress value={35} className="w-full" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>15:30</span>
                        <span>{show.duration}</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Next airing:</span>
                      <span className="text-sm font-medium text-blue-600">{show.nextAiring}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Features Showcase */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Powered by Advanced AI</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform leverages cutting-edge artificial intelligence to create, manage, and broadcast professional
            radio content automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiFeatures.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Radio Station?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join the future of broadcasting with AI-powered content creation, automated scheduling, and
            professional-quality voice synthesis.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Creating Shows
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
              <Download className="w-5 h-5 mr-2" />
              Download Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
