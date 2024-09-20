// import { json } from "@remix-run/node";
import { Link } from "react-router-dom";
// import { getEmployees } from "~/services/api";
import { Employee } from "../../typing"

import { useSelector } from "react-redux";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Tableau";

export default function EmployeeList() {
  const employees = useSelector((state: {employees: Employee[]}) => state.employees)
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: 'firstName',
        cell: info => info.getValue(),
        //this column will sort in ascending order by default since it is a string column
      },
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
        sortUndefined: 'last', //force undefined values to the end
        sortDescFirst: false, //first sort order will be ascending (nullable values can mess up auto detection of sort order)
      },
      {
        accessorKey: 'dateOfBirth',
        header: () => 'Date of Birth',
        sortUndefined: 'last', //force undefined values to the end
        sortDescFirst: false,
      },
      {
        accessorKey: 'startDate',
        header: () =>  'Start Date',
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

  const table = useReactTable<Employee>({
    columns,
    data: employees,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
    // sortingFns: {
    //   sortStatusFn, //or provide our custom sorting function globally for all columns to be able to use
    // },
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      sorting,
    },
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering - default on/true
    // enableMultiSort: false, //Don't allow shift key to sort multiple columns - default on/true
    // enableSorting: false, // - default on/true
    // enableSortingRemoval: false, //Don't allow - default on/true
    // isMultiSortEvent: (e) => true, //Make all clicks multi-sort - default requires `shift` key
    // maxMultiSortColCount: 3, // only allow 3 columns to be sorted at once - default is Infinity
  })
  

  return (
    <div className="p-2">
      <div className="h-2" />
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
                          asc: ' 🔼',
                          desc: ' 🔽',
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
    </div>
  )
// interface ReduxState {
//   employees: {
//     employees: Employee[]
//   }
// }

}