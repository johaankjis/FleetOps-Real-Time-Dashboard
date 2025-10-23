import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Vehicle, FleetMetrics } from "@/lib/types"

interface FleetState {
  vehicles: Vehicle[]
  metrics: FleetMetrics
  selectedVehicleId: string | null
  isConnected: boolean
  lastUpdate: string
}

const initialState: FleetState = {
  vehicles: [],
  metrics: {
    totalVehicles: 0,
    activeVehicles: 0,
    idleVehicles: 0,
    maintenanceVehicles: 0,
    offlineVehicles: 0,
    alertVehicles: 0,
    avgSpeed: 0,
    avgBattery: 0,
  },
  selectedVehicleId: null,
  isConnected: false,
  lastUpdate: new Date().toISOString(),
}

const calculateMetrics = (vehicles: Vehicle[]): FleetMetrics => {
  const metrics: FleetMetrics = {
    totalVehicles: vehicles.length,
    activeVehicles: 0,
    idleVehicles: 0,
    maintenanceVehicles: 0,
    offlineVehicles: 0,
    alertVehicles: 0,
    avgSpeed: 0,
    avgBattery: 0,
  }

  let totalSpeed = 0
  let totalBattery = 0

  vehicles.forEach((vehicle) => {
    switch (vehicle.status) {
      case "active":
        metrics.activeVehicles++
        break
      case "idle":
        metrics.idleVehicles++
        break
      case "maintenance":
        metrics.maintenanceVehicles++
        break
      case "offline":
        metrics.offlineVehicles++
        break
      case "alert":
        metrics.alertVehicles++
        break
    }
    totalSpeed += vehicle.telemetry.speed
    totalBattery += vehicle.telemetry.battery
  })

  metrics.avgSpeed = vehicles.length > 0 ? totalSpeed / vehicles.length : 0
  metrics.avgBattery = vehicles.length > 0 ? totalBattery / vehicles.length : 0

  return metrics
}

export const fleetSlice = createSlice({
  name: "fleet",
  initialState,
  reducers: {
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload
      state.metrics = calculateMetrics(action.payload)
      state.lastUpdate = new Date().toISOString()
    },
    updateVehicle: (state, action: PayloadAction<Vehicle>) => {
      const index = state.vehicles.findIndex((v) => v.id === action.payload.id)
      if (index !== -1) {
        state.vehicles[index] = action.payload
        state.metrics = calculateMetrics(state.vehicles)
        state.lastUpdate = new Date().toISOString()
      }
    },
    updateVehicleTelemetry: (
      state,
      action: PayloadAction<{ vehicleId: string; telemetry: Partial<Vehicle["telemetry"]> }>,
    ) => {
      const vehicle = state.vehicles.find((v) => v.id === action.payload.vehicleId)
      if (vehicle) {
        vehicle.telemetry = { ...vehicle.telemetry, ...action.payload.telemetry }
        vehicle.lastUpdate = new Date().toISOString()
        state.metrics = calculateMetrics(state.vehicles)
        state.lastUpdate = new Date().toISOString()
      }
    },
    setSelectedVehicle: (state, action: PayloadAction<string | null>) => {
      state.selectedVehicleId = action.payload
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload
    },
  },
})

export const { setVehicles, updateVehicle, updateVehicleTelemetry, setSelectedVehicle, setConnectionStatus } =
  fleetSlice.actions

export default fleetSlice.reducer
