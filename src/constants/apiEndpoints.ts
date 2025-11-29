export const API_ENDPOINTS = {
  // Networking
  NETWORKING: '/networking',
  NETWORKING_DETAIL: (id: number) => `/networking/${id}`,
  NETWORKING_PARTICIPATION: (id: number) => `/networking/${id}/participation`,
  
  // Chat
  CHAT_ROOMS: '/chat-rooms',
} as const;

