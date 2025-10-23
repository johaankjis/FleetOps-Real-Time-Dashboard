export type VehicleStatus = "active" | "idle" | "maintenance" | "offline" | "alert"

export interface Vehicle {
  id: string
  name: string
  status: VehicleStatus
  location: {
    lat: number
    lng: number
    address: string
  }
  telemetry: {
    speed: number
    battery: number
    temperature: number
    fuel: number
    odometer: number
  }
  lastUpdate: string
  mission?: string
}

export interface FleetMetrics {
  totalVehicles: number
  activeVehicles: number
  idleVehicles: number
  maintenanceVehicles: number
  offlineVehicles: number
  alertVehicles: number
  avgSpeed: number
  avgBattery: number
}

export interface TelemetryUpdate {
  vehicleId: string
  timestamp: string
  data: Partial<Vehicle["telemetry"]>
}
