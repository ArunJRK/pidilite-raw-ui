"use client";
import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { rawFeedbackColumns } from "./table-columns";
import { RawFeedbackType } from "@/model/raw-feedback-model"; // Adjust the import path as needed
import {
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import categories from "@/data/categories.json";
import { MultiSelect } from "@mantine/core";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableViewOptions } from "./table-visibility";
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
export function RawFeedbackTable() {
  const categoryOptions = categories.map((category) => category.category);
  const [subcategoryOptions, setSubcategoryOptions] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [selectedSubcategory2, setSelectedSubcategory2] = useState<string[]>(
    []
  );
  const [subcategory2Options, setSubcategory2Options] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [data, setData] = useState<RawFeedbackType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let url = `/api/raw-feedbacks?page=${pagination.pageIndex + 1}&limit=${
          pagination.pageSize
        }${
          selectedCategories.length > 0
            ? `&category=${selectedCategories.join(",")}`
            : ""
        }${
          selectedSubcategories.length > 0
            ? `&subcategory=${selectedSubcategories.join(",")}`
            : ""
        }${
          selectedSubcategory2.length > 0
            ? `&subcategory2=${selectedSubcategory2.join(",")}`
            : ""
        }`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: { feedbacks: RawFeedbackType[]; pagination: any } =
          await response.json();
        console.log("result", result);

        setData(result.feedbacks);

        setTotalPages(result.pagination.totalPages);
      } catch (err) {
        setError("An error occurred while fetching the data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const debouncedFetchData = debounce(fetchData, 300);

    debouncedFetchData();
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    selectedCategories,
    selectedSubcategories,
    selectedSubcategory2,
  ]);

  const handleCategoryChange = debounce((categories: string[]) => {
    console.log("handleCategoryChange", categories);
    setSelectedCategories(categories);
  }, 300);

  const handleSubcategoryChange = debounce((subcategories: string[]) => {
    setSelectedSubcategories(subcategories);
  }, 300);

  const handleSubcategory2Change = debounce((subcategories: string[]) => {
    setSelectedSubcategory2(subcategories);
  }, 300);

  const table = useReactTable({
    data,
    columns: rawFeedbackColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  // console.log("selectedCategories", selectedCategories);
  useEffect(() => {
    if (selectedCategories.length > 0) {
      // find the subcategories for the selected categories
      const subcategories = categories
        .filter((category) => selectedCategories.includes(category.category))
        .map((category) => category.subcategory);
      setSubcategoryOptions(subcategories[0]);
      const subcategories2 = categories
        .filter((category) => selectedCategories.includes(category.category))
        .map((category) => category.subcategory2);
      setSubcategory2Options(subcategories2[0]);
    }
  }, [selectedCategories]);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        {/* <TableFilter table={table} /> */}
        <MultiSelect
          style={{ maxWidth: "300px" }}
          data={categoryOptions}
          label="Category"
          placeholder="Pick a category"
          clearable
          searchable
          value={selectedCategories}
          onChange={handleCategoryChange}
        />
        {subcategoryOptions.length > 0 && (
          <MultiSelect
            style={{ maxWidth: "300px" }}
            data={subcategoryOptions}
            label="Subcategory"
            placeholder="Pick a subcategory"
            clearable
            searchable
            value={selectedSubcategories}
            onChange={handleSubcategoryChange}
          />
        )}
        {subcategory2Options.length > 0 && (
          <MultiSelect
            style={{ maxWidth: "300px" }}
            data={subcategory2Options}
            label="Subcategory 2"
            placeholder="Pick a subcategory 2"
            clearable
            searchable
            value={selectedSubcategory2}
            onChange={handleSubcategory2Change}
          />
        )}
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        {/* {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        )} */}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="w-full py-1.5 px-2 font-semibold text-black"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <>
              {isLoading ? (
                <>
                  {[...Array(pagination.pageSize)].map((_, i) => (
                    <TableRow key={i}>
                      {rawFeedbackColumns.map((column, idx) => (
                        <TableCell key={idx}>
                          <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-gray-700">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </>
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end mt-5">
        {/* <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
