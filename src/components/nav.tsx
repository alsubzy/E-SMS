'use client';

import {
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
  Box,
  Users,
  ShoppingBag,
  Monitor,
  ShoppingCart,
  ArrowRightLeft,
  Warehouse,
  Landmark,
  ClipboardList,
  BarChart2,
  Users2,
  Globe,
  CreditCard,
  Settings,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutGrid },
  { 
    href: '/products', 
    label: 'Products', 
    icon: Box,
    submenu: [
      { href: '/products/all', label: 'All Products' },
      { href: '/products/add', label: 'Add Product' },
      { href: '/products/categories', label: 'Categories' },
    ]
  },
  { 
    href: '/parties', 
    label: 'Parties', 
    icon: Users,
    submenu: [
      { href: '/parties/customers', label: 'Customers' },
      { href: '/parties/suppliers', label: 'Suppliers' },
    ]
  },
  { href: '/sales', label: 'Sales', icon: ShoppingBag },
  { href: '/pos', label: 'POS', icon: Monitor },
  { href: '/purchases', label: 'Purchases', icon: ShoppingCart },
  { href: '/stock-transfer', label: 'Stock Transfer', icon: ArrowRightLeft },
  { href: '/warehouses', label: 'Warehouses', icon: Warehouse },
  { href: '/cash-bank', label: 'Cash & Bank', icon: Landmark },
  { href: '/expenses', label: 'Expenses', icon: ClipboardList },
  { 
    href: '/reports', 
    label: 'Reports', 
    icon: BarChart2,
    submenu: [
      { href: '/reports/sales', label: 'Sales Report' },
      { href: '/reports/inventory', label: 'Inventory Report' },
    ]
  },
  { href: '/staff', label: 'Staff & Roles', icon: Users2 },
  { href: '/online-orders', label: 'Online Orders', icon: Globe },
  { href: '/subscription', label: 'Subscription', icon: CreditCard },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const AppLogo = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 0C27.9411 0 36 8.05887 36 18C36 27.9411 27.9411 36 18 36C8.05887 36 0 27.9411 0 18C0 8.05887 8.05887 0 18 0Z" fill="url(#paint0_linear_login)"/>
    <path d="M9.65137 25.1375L14.4164 12.3069H17.0195L13.1095 22.8463L18.4981 12.3069H20.9856L15.3537 23.3631L21.4931 25.1375H18.7745L15.5495 23.8331L12.4414 25.1375H9.65137Z" fill="white"/>
    <defs>
    <linearGradient id="paint0_linear_login" x1="18" y1="0" x2="18" y2="36" gradientUnits="userSpaceOnUse">
    <stop stopColor="#10897a"/>
    <stop offset="1" stopColor="#00695C"/>
    </linearGradient>
    </defs>
    </svg>   
)

export default function Nav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleMenuToggle = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <AppLogo />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-sidebar-foreground">CampusConnect</h2>
            <p className="text-xs text-sidebar-foreground/80">School Management</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href) && item.href !== '/'}
                className="justify-between group"
              >
                <Link href={item.href} onClick={(e) => {
                  if (item.submenu) {
                    e.preventDefault();
                    handleMenuToggle(item.label);
                  }
                }}>
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.submenu && <ChevronRight className={`h-4 w-4 transition-transform ${openMenu === item.label ? 'rotate-90' : ''}`} />}
                </Link>
              </SidebarMenuButton>

              {item.submenu && openMenu === item.label && (
                <SidebarMenuSub className="ml-4 border-l pl-4 my-1">
                  {item.submenu.map((subItem) => (
                    <SidebarMenuItem key={subItem.label}>
                      <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
                        <Link href={subItem.href}>
                          {subItem.label}
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
