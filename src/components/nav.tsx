'use client';

import {
  SidebarClose,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import {
  LayoutGrid,
  ChevronDown,
  Package,
  Users,
  Store,
  LineChart,
  Tag,
  Badge,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutGrid },
  {
    href: '/products',
    label: 'Product',
    icon: Package,
    subItems: [
      { href: '/products/overview', label: 'Overview' },
      { href: '/products/drafts', label: 'Drafts', badge: 3 },
      { href: '/products/released', label: 'Released' },
      { href: '/products/comments', label: 'Comments' },
      { href: '/products/scheduled', label: 'Scheduled', badge: 8 },
    ],
  },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/shop', label: 'Shop', icon: Store },
  { href: '/income', label: 'Income', icon: LineChart },
  { href: '/promote', label: 'Promote', icon: Tag },
];

const AppLogo = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="#F7F7F7"/>
        <path d="M12.3824 12.3824L20 6L27.6176 12.3824L34 20L27.6176 27.6176L20 34L12.3824 27.6176L6 20L12.3824 12.3824Z" stroke="#2D3748" strokeWidth="1.5"/>
        <path d="M20 6V34" stroke="#2D3748" strokeWidth="1.5"/>
        <path d="M6 20H34" stroke="#2D3748" strokeWidth="1.5"/>
        <path d="M12.3824 12.3824L27.6176 27.6176" stroke="#2D3748" strokeWidth="1.5"/>
        <path d="M12.3824 27.6176L27.6176 12.3824" stroke="#2D3748" strokeWidth="1.5"/>
    </svg>
)

export default function Nav() {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(() => {
    const activeItem = menuItems.find(item => item.subItems?.some(sub => pathname.startsWith(sub.href)));
    return activeItem ? activeItem.href : null;
  });

  function isActive(path: string, exact = false) {
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  }

  const toggleSection = (href: string) => {
    setOpenSection(prev => (prev === href ? null : href));
  };

  return (
    <>
      <SidebarHeader className="border-b-0 p-4">
        <div className="flex items-center gap-2">
            <AppLogo />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild={!item.subItems}
                isActive={!item.subItems && isActive(item.href, item.href === '/')}
                onClick={() => item.subItems && toggleSection(item.href)}
                className={`justify-between text-gray-600 hover:text-black ${isActive(item.href) && !item.subItems ? 'text-black' : ''}`}
              >
                {item.subItems ? (
                   <div className='w-full'>
                     <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span className='font-medium'>{item.label}</span>
                     </div>
                     <ChevronDown className={`h-4 w-4 transition-transform ${openSection === item.href ? 'rotate-180' : ''}`} />
                   </div>
                ) : (
                  <Link href={item.href}>
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className='font-medium'>{item.label}</span>
                    </div>
                  </Link>
                )}
              </SidebarMenuButton>
              {item.subItems && openSection === item.href && (
                <SidebarMenuSub className='ml-4 mt-2 space-y-1 border-l border-gray-200'>
                  {item.subItems.map(subItem => (
                    <SidebarMenuItem key={subItem.href} className="relative">
                       <div className="absolute -left-[1.5px] top-1/2 h-4 w-px -translate-y-1/2 bg-gray-200"></div>
                      <SidebarMenuSubButton asChild isActive={pathname === subItem.href} className="pl-6 text-gray-500 hover:text-black">
                        <Link href={subItem.href} className="flex justify-between items-center w-full">
                            {subItem.label}
                            {subItem.badge && (
                                <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-full">{subItem.badge}</span>
                            )}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
