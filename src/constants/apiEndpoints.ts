export const API_ENDPOINTS = {
  // Networking
  NETWORKING: '/networking',
  NETWORKING_DETAIL: (id: number) => `/networking/${id}`,
  NETWORKING_PARTICIPATION: (id: number) => `/networking/${id}/participation`,

  // Chat
  CHAT_ROOMS: '/chat-rooms',
  CHAT_MESSAGES: (chatRoomId: number) => `/chat-rooms/${chatRoomId}`,
  CHAT_ROOM_PARTICIPANTS: (chatRoomId: number) =>
    `/chat-rooms/${chatRoomId}/participants`,
  LEAVE_CHAT_ROOM: (chatRoomId: number) => `/chat-rooms/${chatRoomId}`,
} as const;
