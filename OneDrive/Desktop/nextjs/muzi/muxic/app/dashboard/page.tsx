'use client'

interface Video {
  "id": string,
  "type": string,
  "extractedId": string,
  "title": string,
  "smallimg": string,
  "bigimg": string,
  "active": boolean,
  "upvotes": number,
  "userId": string,
  "haveUpvoted": boolean
}

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, Play, Pause, SkipForward } from "lucide-react"
import axios from 'axios'
import { useSession } from 'next-auth/react'


export default function Component() {
  const [videoUrl, setVideoUrl] = useState('')
  const [queue, setQueue] = useState<Video[]>([])
  const [currentVideo, setCurrentVideo] = useState({})
  const [isPlaying, setIsPlaying] = useState(true)

  console.log(queue)

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    const session = useSession()
    // console.log(user)
    // console.log("problem is here")

    const response = await axios.post('/api/streams',{url:videoUrl,createrId: session.data?.user.id})
    console.log(response)
    setVideoUrl('')
  }

  useEffect( () => {
    
    const fetchStreams = async () => {
      try {
        const res = await fetch('/api/streams/fetchstreams')

        const streams = await res.json()

        setQueue(streams)
      } catch (error) {
        return error
      }
    }

    fetchStreams()

  },[videoUrl,handleVideoSubmit])

  const handleVote = (id: string) => {
    
  }

  const playNext = () => {
    if (queue.length > 0) {
      setCurrentVideo(queue[0])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Song Voting Queue</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card className="bg-white/10 backdrop-blur-lg">
              <CardContent className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Currently Playing</h2>
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  <img src={currentVideo.title} alt={currentVideo.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">{currentVideo.title}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white border-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={playNext}
                      className="text-white border-white hover:bg-white/20 flex items-center gap-2"
                    >
                      <SkipForward className="h-4 w-4" />
                      Play Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg mt-8">
              <CardContent className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Add a Song</h2>
                <form onSubmit={handleVideoSubmit} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Paste YouTube URL here"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="flex-grow bg-white/20 border-white/30 text-black placeholder-white/10"
                  />
                  <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">Add</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/10 backdrop-blur-lg">
            <CardContent className="p-4">
              <h2 className="text-2xl font-semibold mb-4">Upcoming Songs</h2>
              <div className="space-y-4">
                {queue.map((video) => (
                  <div key={video.id} className="flex items-center gap-4 bg-white/5 p-2 rounded-lg">
                    <img src={video.smallimg} alt={video.title} className="w-20 h-15 object-cover rounded" />
                    <div className="flex-grow">
                      <h3 className="font-medium">{video.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleVote(video.id)}
                          className={`text-white hover:bg-white/20 ${
                            video.haveUpvoted !== false ? 'bg-white/20' : ''
                          }`}
                        >
                          <ThumbsUp className={`h-4 w-4 ${
                            video.haveUpvoted === false ? 'fill-current' : ''
                          }`} />
                        </Button>
                        <span className="text-sm font-medium">{video.upvotes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}