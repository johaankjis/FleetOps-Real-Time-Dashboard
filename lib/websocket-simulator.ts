"use client"

import type { Vehicle } from "./types"

export class WebSocketSimulator {
  private interval: NodeJS.Timeout | null = null
  private callbacks: Array<(vehicle: Vehicle) => void> = []

  constructor(private vehicles: Vehicle[]) {}

  connect(onUpdate: (vehicle: Vehicle) => void) {
    this.callbacks.push(onUpdate)

    // Simulate real-time updates every 2-5 seconds
    this.interval = setInterval(
      () => {
        const randomVehicle = this.vehicles[Math.floor(Math.random() * this.vehicles.length)]

        const updatedVehicle: Vehicle = {
          ...randomVehicle,
          telemetry: {
            ...randomVehicle.telemetry,
            speed:
              randomVehicle.status === "active"
                ? Math.max(0, randomVehicle.telemetry.speed + (Math.random() - 0.5) * 10)
                : 0,
            battery: Math.max(0, Math.min(100, randomVehicle.telemetry.battery - Math.random() * 0.5)),
            temperature: Math.max(60, Math.min(100, randomVehicle.telemetry.temperature + (Math.random() - 0.5) * 2)),
            fuel: Math.max(0, Math.min(100, randomVehicle.telemetry.fuel - Math.random() * 0.3)),
          },
          lastUpdate: new Date().toISOString(),
        }

        // Occasionally change status
        if (Math.random() < 0.05) {
          const statuses: Array<Vehicle["status"]> = ["active", "idle", "maintenance", "alert"]
          updatedVehicle.status = statuses[Math.floor(Math.random() * statuses.length)]
        }

        this.callbacks.forEach((callback) => callback(updatedVehicle))
      },
      Math.random() * 3000 + 2000,
    )
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    this.callbacks = []
  }
}
