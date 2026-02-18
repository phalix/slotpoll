'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, Plus, User, LayoutDashboard, ShieldCheck } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">SlotPoll</span>
        </Link>

        <nav className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/polls/create">
            <Button variant="ghost">
              <Plus className="mr-2 h-4 w-4" />
              Create Poll
            </Button>
          </Link>
          <Link href="/account">
            <Button variant="ghost">
              <User className="mr-2 h-4 w-4" />
              Account
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="ghost">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Admin
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
