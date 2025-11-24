import { z } from 'zod';

export const statusValues = [
  'student',
  'graduate',
  'postgraduate',
  'professor',
] as const;

export const careerValues = ['employment', 'startup', 'matriculation'] as const;

export const interestValues = [
  'frontend',
  'backend',
  'data',
  'ai',
  'security',
] as const;

export const departmentValues = ['computer'] as const;

export const mbtiValues = [
  '모름',
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
] as const;

export const SignUpSchema = z
  .object({
    name: z.string().min(1, '이름을 입력해주세요.'),
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('올바른 이메일 형식을 입력해주세요.')
      .regex(/@knu\.ac\.kr$/, '@knu.ac.kr 이메일만 사용 가능합니다.'),
    verificationCode: z.string().min(1, '인증번호를 입력해주세요.'),
    password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),

    status: z.enum(statusValues, '재학 구분을 선택해주세요.'),
    department: z.enum(departmentValues),
    career: z.enum(careerValues, '진로를 선택해주세요.'),
    interest: z.enum(interestValues, '분야를 선택해주세요.'),
    mbti: z.enum(mbtiValues, 'MBTI를 선택해주세요.'),
    isMentor: z.boolean(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
