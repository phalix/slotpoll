import { getServerSession } from 'next-auth'
import { authOptions } from './config'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

// Auth is disabled — return the first real user or a mock fallback
async function getOrCreateMockUser() {
  const firstUser = await db.query.users.findFirst({
    orderBy: [desc(users.createdAt)],
  })
  if (firstUser) {
    return {
      id: firstUser.id,
      email: firstUser.email,
      name: firstUser.name ?? 'User',
      role: firstUser.role ?? 'normal',
      suspended: false,
    }
  }
  // Absolute fallback when the DB has no users yet
  return {
    id: 'mock-user',
    email: 'demo@slotpoll.local',
    name: 'Demo User',
    role: 'super_user' as string,
    suspended: false,
  }
}

export async function getCurrentUser() {
  // Try real session first
  try {
    const session = await getServerSession(authOptions)
    if (session?.user) {
      return session.user
    }
  } catch {
    // Auth provider may not be configured — fall through
  }
  // Auth disabled: return mock user
  return getOrCreateMockUser()
}

export async function requireAuth() {
  const user = await getCurrentUser()
  // Auth disabled — always return a user, never redirect
  return user
}

export async function requireRole(allowedRoles: string[]) {
  const user = await requireAuth()
  if (!allowedRoles.includes(user.role)) {
    redirect('/dashboard')
  }
  return user
}

export async function isSuperUser() {
  const user = await getCurrentUser()
  return user?.role === 'super_user'
}

export async function isAdmin() {
  const user = await getCurrentUser()
  return user?.role === 'admin' || user?.role === 'super_user'
}
