import type { Vehicle } from "./types"

const locations = [
  { lat: 37.7749, lng: -122.4194, address: "San Francisco, CA" },
  { lat: 34.0522, lng: -118.2437, address: "Los Angeles, CA" },
  { lat: 40.7128, lng: -74.006, address: "New York, NY" },
  { lat: 41.8781, lng: -87.6298, address: "Chicago, IL" },
  { lat: 29.7604, lng: -95.3698, address: "Houston, TX" },
  { lat: 33.4484, lng: -112.074, address: "Phoenix, AZ" },
  { lat: 39.7392, lng: -104.9903, address: "Denver, CO" },
  { lat: 47.6062, lng: -122.3321, address: "Seattle, WA" },
]

const missions = [
  "Delivery Route A",
  "Patrol Sector 7",
  "Emergency Response",
  "Maintenance Check",
  "Cargo Transport",
  "Passenger Service",
  "Surveillance Mission",
  "Supply Run",
]

const statuses: Array<Vehicle["status"]> = ["active", "idle", "maintenance", "offline", "alert"]

export function generateMockVehicles(count = 12): Vehicle[] {
  return Array.from({ length: count }, (_, i) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]

    return {
      id: `VEH-${String(i + 1).padStart(3, "0")}`,
      name: `Fleet Unit ${i + 1}`,
      status,
      location,
      telemetry: {
        speed: status === "active" ? Math.floor(Math.random() * 60) + 20 : 0,
        battery: Math.floor(Math.random() * 40) + 60,
        temperature: Math.floor(Math.random() * 20) + 70,
        fuel: Math.floor(Math.random() * 50) + 50,
        odometer: Math.floor(Math.random() * 50000) + 10000,
      },
      lastUpdate: new Date(Date.now() - Math.random() * 300000).toISOString(),
      mission: status === "active" ? missions[Math.floor(Math.random() * missions.length)] : undefined,
    }
  })
}
