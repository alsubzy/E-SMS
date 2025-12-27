
"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey?: string
    pageCount?: number
    pageSize?: number
    pageIndex?: number
    onPageChange?: (page: number) => void
    onSearchChange?: (term: string) => void
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    onPageChange,
    onSearchChange,
    pageCount = 1,
    pageIndex = 0,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [searchValue, setSearchValue] = React.useState("")

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // Pagination controlled from outside usually, but we can mix mode
        manualPagination: true,
        pageCount: pageCount,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination: {
                pageIndex,
                pageSize: 10 // Default
            }
        },
    })

    // Debounce search
    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (onSearchChange) onSearchChange(searchValue);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchValue, onSearchChange]);

    return (
        <div className="w-full space-y-4">
            {searchKey && (
                <div className="flex items-center py-4">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={`Search...`}
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Page {pageIndex + 1} of {pageCount}
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange && onPageChange(pageIndex)} // Previous (1-based index logic needing fix, but using pageIndex-1 if 0 based)
                        disabled={pageIndex <= 0}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange && onPageChange(pageIndex + 2)} // Next (1-based index)
                        disabled={pageIndex + 1 >= pageCount}
                    >
                        Next <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
