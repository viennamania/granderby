import { verifyJwtToken } from '@/utils/auth';
import { cookies } from 'next/headers';

export async function authFromServer(token: any) {
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  return hasVerifiedToken;
}
