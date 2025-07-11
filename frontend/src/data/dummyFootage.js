// src/data/mockFootage.jsx

export const mockFootage = [
  {
    id: "cam-001",
    name: "Front Door Camera",
    room: "Main Entrance",
    status: "online",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "cam-002",
    name: "Living Room Cam",
    room: "Living Room",
    status: "online",
    lastUpdate: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 min ago
  },
  {
    id: "cam-003",
    name: "Backyard Camera",
    room: "Backyard",
    status: "offline",
    lastUpdate: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 min ago
  },
  {
    id: "cam-004",
    name: "Garage Cam",
    room: "Garage",
    status: "online",
    lastUpdate: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 min ago
  },
  {
    id: "cam-005",
    name: "Side Alley Cam",
    room: "Side Alley",
    status: "online",
    lastUpdate: new Date(Date.now() - 1000 * 60 * 7).toISOString(), // 7 min ago
  },
];
