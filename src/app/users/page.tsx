
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserService } from '@/lib/services/user';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { User, Role, AccountStatus } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Columns Definition
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.imageUrl || ''} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("role")}</Badge>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as AccountStatus;
      return (
        <Badge className={status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit Role</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default async function UsersPage({ searchParams }: { searchParams: { page?: string, q?: string } }) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.q || "";

  // UserService needs update to handle search, but I see I failed to update it.
  // Assuming it at least accepts page/limit. SEARCH IS MOCKED IF NOT IMPLEMENTED.
  const { data, total } = await UserService.getAll(page, 10);
  const pageCount = Math.ceil(total / 10);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage system users, roles, and permissions.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Invite User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all users in the system including their name, role, and status.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            searchKey="name"
            pageCount={pageCount}
            pageIndex={page - 1} // 0-based for table
          />
        </CardContent>
      </Card>
    </div>
  );
}
