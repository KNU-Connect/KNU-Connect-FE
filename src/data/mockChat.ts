import type { ChatRoom, ChatDetail } from '@/types/chat';

export const mockChatRooms: ChatRoom[] = [
  {
    id: 1,
    type: 'group',
    participants: ['김지훈', '정인준', '김성원', '강현서'],
    lastMessage: '단톡방',
    lastMessageDate: '9/21',
  },
  {
    id: 2,
    type: 'individual',
    participants: ['김지훈'],
    lastMessage: '안녕하세요 멘토님 반갑습니다!',
    lastMessageDate: '9/21',
  },
  {
    id: 3,
    type: 'individual',
    participants: ['김지훈'],
    lastMessage: '안녕하세요 멘토님 반갑습니다!',
    lastMessageDate: '9/21',
  },
  {
    id: 4,
    type: 'individual',
    participants: ['김지훈'],
    lastMessage: '안녕하세요 멘토님 반갑습니다!',
    lastMessageDate: '9/21',
  },
  {
    id: 5,
    type: 'individual',
    participants: ['김지훈'],
    lastMessage: '안녕하세요 멘토님 반갑습니다!',
    lastMessageDate: '9/21',
  },
  {
    id: 6,
    type: 'individual',
    participants: ['김지훈'],
    lastMessage: '안녕하세요 멘토님 반갑습니다!',
    lastMessageDate: '9/21',
  },
];

export const mockChatDetails: Record<number, ChatDetail> = {
  1: {
    roomId: 1,
    participant: {
      id: 'group',
      name: '김지훈, 정인준, 김성원, 강현서',
    },
    messages: [
      {
        id: 1,
        senderId: 'kimjihun',
        senderName: '김지훈',
        content: '안녕하세요 모두!',
        timestamp: '2025-09-21T09:00:00',
        date: '2025년 9월 21일',
      },
      {
        id: 2,
        senderId: 'junginjun',
        senderName: '정인준',
        content: '안녕하세요!',
        timestamp: '2025-09-21T09:01:00',
      },
      {
        id: 3,
        senderId: 'kimseongwon',
        senderName: '김성원',
        content: '반갑습니다!',
        timestamp: '2025-09-21T09:02:00',
      },
      {
        id: 4,
        senderId: 'kanghyunseo',
        senderName: '강현서',
        content: '네, 반갑습니다!',
        timestamp: '2025-09-21T09:03:00',
      },
      {
        id: 5,
        senderId: 'currentUser',
        senderName: '나',
        content: '안녕하세요! 멘토링 그룹에 합류하게 되어 기쁩니다!',
        timestamp: '2025-09-21T09:04:00',
      },
    ],
  },
  2: {
    roomId: 2,
    participant: {
      id: 'kimjihun',
      name: '김지훈',
    },
    messages: [
      {
        id: 1,
        senderId: 'currentUser',
        senderName: '나',
        content: '안녕하세요 선배님',
        timestamp: '2025-09-21T10:00:00',
        date: '2025년 9월 21일',
      },
      {
        id: 2,
        senderId: 'currentUser',
        senderName: '나',
        content: '이번 멘토링 응해주셔서 감사합니다.',
        timestamp: '2025-09-21T10:01:00',
      },
      {
        id: 3,
        senderId: 'currentUser',
        senderName: '나',
        content:
          '좋아요!! 평소에 프론트엔드에 관심이 있었는데 기회가 되어 영광입니다!!',
        timestamp: '2025-09-21T10:02:00',
      },
      {
        id: 4,
        senderId: 'kimjihun',
        senderName: '김지훈',
        content: '별 말씀을요',
        timestamp: '2025-09-21T10:03:00',
      },
      {
        id: 5,
        senderId: 'kimjihun',
        senderName: '김지훈',
        content: '내일 쪽문에서 12시에 뺄까요?',
        timestamp: '2025-09-21T10:04:00',
      },
      {
        id: 6,
        senderId: 'kimjihun',
        senderName: '김지훈',
        content: '저도 영광입니다! 그럼 내일 봬요~!',
        timestamp: '2025-09-21T10:05:00',
      },
    ],
  },
  3: {
    roomId: 3,
    participant: {
      id: 'kimjihun',
      name: '김지훈',
    },
    messages: [
      {
        id: 1,
        senderId: 'currentUser',
        senderName: '나',
        content: '안녕하세요 멘토님 반갑습니다!',
        timestamp: '2025-09-21T11:00:00',
        date: '2025년 9월 21일',
      },
      {
        id: 2,
        senderId: 'kimjihun',
        senderName: '김지훈',
        content: '안녕하세요! 반갑습니다.',
        timestamp: '2025-09-21T11:01:00',
      },
      {
        id: 3,
        senderId: 'currentUser',
        senderName: '나',
        content: '프론트엔드 개발에 대해 궁금한 점이 많아서요',
        timestamp: '2025-09-21T11:02:00',
      },
      {
        id: 4,
        senderId: 'kimjihun',
        senderName: '김지훈',
        content: '네, 어떤 부분이 궁금하신가요?',
        timestamp: '2025-09-21T11:03:00',
      },
    ],
  },
  4: {
    roomId: 4,
    participant: {
      id: 'kimjihun',
      name: '김지훈',
    },
    messages: [
      {
        id: 1,
        senderId: 'currentUser',
        senderName: '나',
        content: '안녕하세요 멘토님 반갑습니다!',
        timestamp: '2025-09-21T12:00:00',
        date: '2025년 9월 21일',
      },
      {
        id: 2,
        senderId: 'kimjihun',
        senderName: '김지훈',
        content: '안녕하세요!',
        timestamp: '2025-09-21T12:01:00',
      },
      {
        id: 3,
        senderId: 'currentUser',
        senderName: '나',
        content: 'React와 Vue 중 어떤 것을 추천하시나요?',
        timestamp: '2025-09-21T12:02:00',
      },
      {
        id: 4,
        senderId: 'kimjihun',
        senderName: '김지훈',
        content: '둘 다 좋은 프레임워크인데, 프로젝트 목적에 따라 다르죠',
        timestamp: '2025-09-21T12:03:00',
      },
    ],
  },
  5: {
    roomId: 5,
    participant: {
      id: 'kimjihun',
      name: '김지훈',
    },
    messages: [
      {
        id: 1,
        senderId: 'currentUser',
        senderName: '나',
        content: '안녕하세요 멘토님 반갑습니다!',
        timestamp: '2025-09-21T13:00:00',
        date: '2025년 9월 21일',
      },
      {
        id: 2,
        senderId: 'kimjihun',
        senderName: '김지훈',
        content: '안녕하세요!',
        timestamp: '2025-09-21T13:01:00',
      },
      {
        id: 3,
        senderId: 'currentUser',
        senderName: '나',
        content: '포트폴리오 작성에 대해 조언을 구하고 싶어요',
        timestamp: '2025-09-21T13:02:00',
      },
      {
        id: 4,
        senderId: 'kimjihun',
        senderName: '김지훈',
        content: '네, 어떤 부분이 궁금하신가요?',
        timestamp: '2025-09-21T13:03:00',
      },
    ],
  },
  6: {
    roomId: 6,
    participant: {
      id: 'kimjihun',
      name: '김지훈',
    },
    messages: [
      {
        id: 1,
        senderId: 'currentUser',
        senderName: '나',
        content: '안녕하세요 멘토님 반갑습니다!',
        timestamp: '2025-09-21T14:00:00',
        date: '2025년 9월 21일',
      },
      {
        id: 2,
        senderId: 'kimjihun',
        senderName: '김지훈',
        content: '안녕하세요!',
        timestamp: '2025-09-21T14:01:00',
      },
      {
        id: 3,
        senderId: 'currentUser',
        senderName: '나',
        content: '취업 준비에 대해 상담받고 싶어요',
        timestamp: '2025-09-21T14:02:00',
      },
      {
        id: 4,
        senderId: 'kimjihun',
        senderName: '김지훈',
        content: '네, 언제든지 물어보세요!',
        timestamp: '2025-09-21T14:03:00',
      },
    ],
  },
};
