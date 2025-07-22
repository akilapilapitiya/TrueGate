// OnlineUsers.js - Community users data
export const onlineUsers = [
  {
    id: 1,
    name: "Mahinda Rajapaksa",
    initials: "MR",
    status: "online",
    lastSeen: "Just now",
    role: "Security Expert",
    avatar: null,
    joinedDate: "2024-01-15",
    messagesCount: 342,
    location: "Colombo, Sri Lanka",
    expertise: ["Camera Setup", "Motion Detection"],
  },
];

// Helper functions for user data manipulation
export const getUsersByStatus = (status) => {
  return onlineUsers.filter(user => user.status === status);
};

export const getOnlineUsers = () => {
  return onlineUsers.filter(user => user.status === 'online');
};

export const getUsersByExpertise = (expertise) => {
  return onlineUsers.filter(user => 
    user.expertise.some(exp => 
      exp.toLowerCase().includes(expertise.toLowerCase())
    )
  );
};

export const searchUsers = (query) => {
  return onlineUsers.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.role.toLowerCase().includes(query.toLowerCase()) ||
    user.location.toLowerCase().includes(query.toLowerCase()) ||
    user.expertise.some(exp => 
      exp.toLowerCase().includes(query.toLowerCase())
    )
  );
};

export const getUserStats = () => {
  const online = getUsersByStatus('online').length;
  const away = getUsersByStatus('away').length;
  const offline = getUsersByStatus('offline').length;
  const total = onlineUsers.length;
  
  return {
    online,
    away,
    offline,
    total,
    activePercentage: Math.round(((online + away) / total) * 100)
  };
};