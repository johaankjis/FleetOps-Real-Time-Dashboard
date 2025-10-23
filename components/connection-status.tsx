"use client"

import { Wifi, WifiOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAppSelector } from "@/lib/store/hooks"

export function ConnectionStatus() {
  const isConnected = useAppSelector((state) => state.fleet.isConnected)
  const lastUpdate = useAppSelector((state) => state.fleet.lastUpdate)

  return (
    <div className="flex items-center gap-3">
      <Badge variant={isConnected ? "default" : "destructive"} className="gap-1.5">
        {isConnected ? (
          <>
            <Wifi className="h-3 w-3" />
            Connected
          </>
        ) : (
          <>
            <WifiOff className="h-3 w-3" />
            Disconnected
          </>
        )}
      </Badge>
      <span className="text-sm text-muted-foreground">Last update: {new Date(lastUpdate).toLocaleTimeString()}</span>
    </div>
  )
}
