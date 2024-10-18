// import { json } from "@remix-run/node";
import { Link } from "react-router-dom";
// import { getEmployees } from "~/services/api";
import { Employee } from "../../typing"

import { useSelector } from "react-redux";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Tableau";

export default function EmployeeList() {
  const employees = useSelector((state: {employees: Employee[]}) => state.employees)
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        cell: info => info.getValue(),
        //this column will sort in ascending order by default since it is a string column
      },
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: 'Last Name',
        sortUndefined: 'last', //force undefined values to the end
        sortDescFirst: false, //first sort order will be ascending (nullable values can mess up auto detection of sort order)
      },
      {
        accessorKey: 'dateOfBirth',
        header: 'Date of Birth',
        sortUndefined: 'last', //force undefined values to the end
        sortDescFirst: false,
      },
      {
        accessorKey: 'startDate',
        header:  'Start Date',
        sortUndefined: 'last', //force undefined values to the end
      },
      {
        accessorKey: 'street',
        header: 'Street',
        sortUndefined: 'last', //force undefined values to the end
        sortDescFirst: false,
      },
      {
        accessorKey: 'city',
        header: 'City',
        sortUndefined: 'last', //force undefined values to the end
        sortDescFirst: false,
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
      {
        accessorKey: 'zipCode',
        header: 'Zip Code',
        sortUndefined: 'last', //force undefined values to the end
        sortDescFirst: false,
      },
      {
        accessorKey: 'department',
        header: 'Department',
        sortUndefined: 'last', //force undefined values to the end
        sortDescFirst: false,
      },
    ],
    []
  )

  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(employees)
  const filterEmployees = (search: string) => {
    setFilteredEmployees(employees.filter(employee => employee.firstName.toLowerCase().includes(search.toLowerCase()) || employee.lastName.toLowerCase().includes(search.toLowerCase()) || employee.dateOfBirth.toLowerCase().includes(search.toLowerCase()) || employee.startDate.toLowerCase().includes(search.toLowerCase()) || employee.street.toLowerCase().includes(search.toLowerCase()) || employee.city.toLowerCase().includes(search.toLowerCase()) || employee.state.toLowerCase().includes(search.toLowerCase()) || employee.zipCode.toLowerCase().includes(search.toLowerCase()) || employee.department.toLowerCase().includes(search.toLowerCase())))
  }

  const table = useReactTable<Employee>({
    columns,
    data: filteredEmployees,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
    paginateExpandedRows: true,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  })

  return (
    <div className="font-sans grid gap-4">
      <h1 className="text-4xl font-black mb-4 text-center">Employee list</h1>
      <div className="w-fit mx-auto">
        <Link to="/" className="p-4 border bg-slate-50 rounded-lg my-4 hover:bg-slate-200/50 transition-all">Back to Home</Link>
      </div>
        <div className="w-full flex items-center">
          <input type="text" className="self-end p-2 border rounded-lg placeholder:font-light outline-slate-700" placeholder=" 🔎 Rechercher" onChange={(e) => filterEmployees(e.target.value)}/>
        </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Sort ascending'
                              : header.column.getNextSortingOrder() === 'desc'
                                ? 'Sort descending'
                                : 'Clear sort'
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' ↑',
                          desc: ' ↓',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map(row => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
      <div className="flex items-center gap-2">
        <button
          className="pagination-button"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="pagination-button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="pagination-button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="pagination-button"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded-lg w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}