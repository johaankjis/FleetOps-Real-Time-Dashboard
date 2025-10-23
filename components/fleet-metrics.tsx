"use client"

import { Activity, AlertTriangle, Battery, Car, Gauge, Wrench } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useAppSelector } from "@/lib/store/hooks"

export function FleetMetrics() {
  const metrics = useAppSelector((state) => state.fleet.metrics)

  const metricCards = [
    {
      label: "Total Vehicles",
      value: metrics.totalVehicles,
      icon: Car,
      color: "text-primary",
    },
    {
      label: "Active",
      value: metrics.activeVehicles,
      icon: Activity,
      color: "text-success",
    },
    {
      label: "Idle",
      value: metrics.idleVehicles,
      icon: Gauge,
      color: "text-muted-foreground",
    },
    {
      label: "Maintenance",
      value: metrics.maintenanceVehicles,
      icon: Wrench,
      color: "text-warning",
    },
    {
      label: "Alerts",
      value: metrics.alertVehicles,
      icon: AlertTriangle,
      color: "text-destructive",
    },
    {
      label: "Avg Battery",
      value: `${Math.round(metrics.avgBattery)}%`,
      icon: Battery,
      color: "text-accent",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {metricCards.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.label} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="mt-1 text-2xl font-semibold">{metric.value}</p>
              </div>
              <Icon className={`h-8 w-8 ${metric.color}`} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
