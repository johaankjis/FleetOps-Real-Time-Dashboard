"use client"

import { useEffect, useState } from "react"
import { Radio } from "lucide-react"
import { FleetMetrics } from "@/components/fleet-metrics"
import { VehicleCard } from "@/components/vehicle-card"
import { ConnectionStatus } from "@/components/connection-status"
import { VehicleDetailPanel } from "@/components/vehicle-detail-panel"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setVehicles, updateVehicle, setConnectionStatus, setSelectedVehicle } from "@/lib/store/fleet-slice"
import { generateMockVehicles } from "@/lib/mock-data"
import { WebSocketSimulator } from "@/lib/websocket-simulator"

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const vehicles = useAppSelector((state) => state.fleet.vehicles)
  const selectedVehicleId = useAppSelector((state) => state.fleet.selectedVehicleId)
  const [wsSimulator, setWsSimulator] = useState<WebSocketSimulator | null>(null)

  useEffect(() => {
    // Initialize mock data
    const mockVehicles = generateMockVehicles(12)
    dispatch(setVehicles(mockVehicles))

    // Setup WebSocket simulator
    const simulator = new WebSocketSimulator(mockVehicles)
    simulator.connect((updatedVehicle) => {
      dispatch(updateVehicle(updatedVehicle))
    })

    dispatch(setConnectionStatus(true))
    setWsSimulator(simulator)

    return () => {
      simulator.disconnect()
      dispatch(setConnectionStatus(false))
    }
  }, [dispatch])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Radio className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-balance">FleetOps Dashboard</h1>
                <p className="text-sm text-muted-foreground">Real-Time Fleet Monitoring</p>
              </div>
            </div>
            <ConnectionStatus />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <FleetMetrics />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Fleet Vehicles</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {vehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onClick={() => dispatch(setSelectedVehicle(vehicle.id))}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              {selectedVehicleId ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>
                  <VehicleDetailPanel
                    vehicleId={selectedVehicleId}
                    onClose={() => dispatch(setSelectedVehicle(null))}
                  />
                </>
              ) : (
                <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-border p-8">
                  <p className="text-center text-muted-foreground">Select a vehicle to view detailed telemetry</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
