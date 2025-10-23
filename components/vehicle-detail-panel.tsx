"use client"

import type React from "react"

import { X, MapPin, Activity, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppSelector } from "@/lib/store/hooks"

interface VehicleDetailPanelProps {
  vehicleId: string
  onClose: () => void
}

const statusConfig = {
  active: { label: "Active", className: "bg-success text-success-foreground" },
  idle: { label: "Idle", className: "bg-muted text-muted-foreground" },
  maintenance: { label: "Maintenance", className: "bg-warning text-warning-foreground" },
  offline: { label: "Offline", className: "bg-secondary text-secondary-foreground" },
  alert: { label: "Alert", className: "bg-destructive text-destructive-foreground" },
}

export function VehicleDetailPanel({ vehicleId, onClose }: VehicleDetailPanelProps) {
  const vehicle = useAppSelector((state) => state.fleet.vehicles.find((v) => v.id === vehicleId))

  if (!vehicle) return null

  const status = statusConfig[vehicle.status]

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{vehicle.name}</h2>
          <p className="text-muted-foreground font-mono">{vehicle.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={status.className}>{status.label}</Badge>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {vehicle.mission && (
        <div className="mb-6 p-4 bg-primary/10 rounded-lg">
          <div className="flex items-center gap-2 text-primary">
            <Activity className="h-4 w-4" />
            <span className="font-semibold">Current Mission</span>
          </div>
          <p className="mt-1 text-foreground">{vehicle.mission}</p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">LOCATION</h3>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-foreground">{vehicle.location.address}</p>
              <p className="text-sm text-muted-foreground font-mono">
                {vehicle.location.lat.toFixed(4)}, {vehicle.location.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">TELEMETRY</h3>
          <div className="grid grid-cols-2 gap-4">
            <TelemetryItem label="Speed" value={`${Math.round(vehicle.telemetry.speed)} mph`} />
            <TelemetryItem label="Battery" value={`${Math.round(vehicle.telemetry.battery)}%`} />
            <TelemetryItem label="Temperature" value={`${Math.round(vehicle.telemetry.temperature)}°F`} />
            <TelemetryItem label="Fuel" value={`${Math.round(vehicle.telemetry.fuel)}%`} />
            <TelemetryItem label="Odometer" value={`${vehicle.telemetry.odometer.toLocaleString()} mi`} />
            <TelemetryItem
              label="Last Update"
              value={new Date(vehicle.lastUpdate).toLocaleTimeString()}
              icon={<Clock className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

function TelemetryItem({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon?: React.ReactNode
}) {
  return (
    <div className="p-3 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <p className="text-xs text-muted-foreground uppercase">{label}</p>
      </div>
      <p className="text-lg font-semibold font-mono">{value}</p>
    </div>
  )
}
