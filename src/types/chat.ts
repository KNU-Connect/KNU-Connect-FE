export type ChatRoom = {
  id: number;
  type: 'individual' | 'group';
  participants: string[];
  lastMessage: string;
  lastMessageDate: string; // MM/DD 형식
  unreadCount?: number;
};

export type ChatMessage = {
  id: number;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string; // ISO 형식
  date?: string; // YYYY년 M월 D일 형식
};

export type ChatDetail = {
  roomId: number;
  participant: {
    id: string;
    name: string;
    profileImage?: string;
  };
  messages: ChatMessage[];
};

