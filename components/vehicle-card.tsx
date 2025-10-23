"use client"

import { Battery, Droplet, Gauge, MapPin, Thermometer } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Vehicle } from "@/lib/types"
import { cn } from "@/lib/utils"

interface VehicleCardProps {
  vehicle: Vehicle
  onClick?: () => void
}

const statusConfig = {
  active: { label: "Active", className: "bg-success text-success-foreground" },
  idle: { label: "Idle", className: "bg-muted text-muted-foreground" },
  maintenance: { label: "Maintenance", className: "bg-warning text-warning-foreground" },
  offline: { label: "Offline", className: "bg-secondary text-secondary-foreground" },
  alert: { label: "Alert", className: "bg-destructive text-destructive-foreground" },
}

export function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  const status = statusConfig[vehicle.status]
  const batteryColor =
    vehicle.telemetry.battery > 50
      ? "text-success"
      : vehicle.telemetry.battery > 20
        ? "text-warning"
        : "text-destructive"

  return (
    <Card
      className={cn(
        "p-4 transition-all hover:shadow-md cursor-pointer",
        vehicle.status === "alert" && "border-destructive",
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{vehicle.name}</h3>
          <p className="text-sm text-muted-foreground font-mono">{vehicle.id}</p>
        </div>
        <Badge className={status.className}>{status.label}</Badge>
      </div>

      {vehicle.mission && <p className="mt-2 text-sm text-foreground">{vehicle.mission}</p>}

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{vehicle.location.address}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono">{Math.round(vehicle.telemetry.speed)} mph</span>
          </div>
          <div className="flex items-center gap-2">
            <Battery className={cn("h-4 w-4", batteryColor)} />
            <span className="text-sm font-mono">{Math.round(vehicle.telemetry.battery)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-accent" />
            <span className="text-sm font-mono">{Math.round(vehicle.telemetry.temperature)}°F</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplet className="h-4 w-4 text-chart-2" />
            <span className="text-sm font-mono">{Math.round(vehicle.telemetry.fuel)}%</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground">Updated {new Date(vehicle.lastUpdate).toLocaleTimeString()}</p>
      </div>
    </Card>
  )
}
