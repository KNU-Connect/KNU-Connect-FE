export const API_ENDPOINTS = {
  // Networking
  NETWORKING: '/networking',
  NETWORKING_DETAIL: (id: number) => `/networking/${id}`,
  NETWORKING_PARTICIPATION: (id: number) => `/networking/${id}/participation`,
  
  // Chat
  CHAT_ROOMS: '/chat-rooms',
  CHAT_MESSAGES: (chatRoomId: number) => `/chat-rooms/${chatRoomId}`,
} as const;

