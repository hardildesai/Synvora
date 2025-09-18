'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  QrCode,
  Settings,
  Shield,
  Ticket,
  Users,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo from '../Logo';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/synmin', icon: LayoutDashboard, label: 'Overview' },
  { href: '/synmin/orders', icon: Ticket, label: 'Tickets / Orders' },
  { href: '/synmin/payments', icon: CreditCard, label: 'Payments / Verification' },
  { href: '/synmin/attendees', icon: Users, label: 'Attendees' },
  { href: '/synmin/analytics', icon: BarChart, label: 'Analytics' },
  { href: '/synmin/gate-mode', icon: QrCode, label: 'Gate Mode' },
  { href: '/synmin/messages', icon: MessageSquare, label: 'Messages / Broadcasts' },
  { href: '/synmin/team', icon: Shield, label: 'Team & Roles' },
  { href: '/synmin/settings', icon: Settings, label: 'Settings & Integrations' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href}>
                  <SidebarMenuButton isActive={pathname === item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          {/* In a real app, this would show the logged in user */}
          <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://picsum.photos/100" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm">
                <span className="font-semibold text-foreground">Admin</span>
                <span className="text-muted-foreground text-xs">info.synvora@gmail.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
             <SidebarTrigger className="md:hidden"/>
             <div className="hidden md:block font-bold">
                 {/* This could be dynamic based on the page */}
             </div>
             <div className="flex items-center gap-4">
                {/* Quick actions can go here */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://picsum.photos/100" alt="@admin" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">Admin</p>
                            <p className="text-xs leading-none text-muted-foreground">
                            info.synvora@gmail.com
                            </p>
                        </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
