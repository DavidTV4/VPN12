'use client'

import { useState } from 'react'
import { Shield, Globe, Power, Wifi } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function VPNDashboard() {
  const [isConnected, setIsConnected] = useState(false)
  const [selectedServer, setSelectedServer] = useState('')
  const [autoConnect, setAutoConnect] = useState(false)

  const servers = [
    { id: 'us', name: 'United States', latency: 45 },
    { id: 'uk', name: 'United Kingdom', latency: 75 },
    { id: 'jp', name: 'Japan', latency: 120 },
    { id: 'de', name: 'Germany', latency: 60 },
    { id: 'au', name: 'Australia', latency: 150 },
  ]

  const handleConnect = () => {
    if (selectedServer) {
      setIsConnected(!isConnected)
    }
  }

  const handleServerChange = (value: string) => {
    setSelectedServer(value)
    if (autoConnect) {
      setIsConnected(true)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">SecureVPN</CardTitle>
          <CardDescription>Connect securely to the internet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className={isConnected ? "text-green-500" : "text-red-500"} />
              <span className="font-medium">Status:</span>
            </div>
            <span className={`font-medium ${isConnected ? "text-green-500" : "text-red-500"}`}>
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="server-select">Server Location</Label>
            <Select onValueChange={handleServerChange} value={selectedServer}>
              <SelectTrigger id="server-select">
                <SelectValue placeholder="Select a server" />
              </SelectTrigger>
              <SelectContent>
                {servers.map((server) => (
                  <SelectItem key={server.id} value={server.id}>
                    <div className="flex justify-between items-center">
                      <span>{server.name}</span>
                      <span className="text-sm text-muted-foreground">{server.latency} ms</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedServer && (
            <div className="flex items-center space-x-2">
              <Globe className="text-blue-500" />
              <span>Connected to: {servers.find(s => s.id === selectedServer)?.name}</span>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Wifi className={isConnected ? "text-green-500" : "text-gray-400"} />
            <span>IP Address: {isConnected ? "192.168.xxx.xxx" : "Not connected"}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="auto-connect"
              checked={autoConnect}
              onCheckedChange={setAutoConnect}
            />
            <Label htmlFor="auto-connect">Auto-connect</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            onClick={handleConnect}
            disabled={!selectedServer}
          >
            <Power className="mr-2 h-4 w-4" />
            {isConnected ? "Disconnect" : "Connect"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}