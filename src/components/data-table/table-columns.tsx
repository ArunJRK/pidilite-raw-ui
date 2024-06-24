"use client";
import { ColumnDef } from "@tanstack/react-table";
import { RawFeedbackType } from "@/model/raw-feedback-model"; // Adjust the import path as needed
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const rawFeedbackColumns: ColumnDef<RawFeedbackType>[] = [
  {
    accessorKey: "chapter_name",
    header: () => {
      return <div className="min-w-[100px]">Chapter</div>;
    },
  },
  {
    accessorKey: "agent_name",
    header: () => {
      return <div className="min-w-[100px]">Agent Name</div>;
    },
  },
  {
    accessorKey: "case_number",
    header: () => {
      return <div className="min-w-[100px]">Case Number</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "tat_status_update",
    header: () => {
      return <div className="min-w-[150px]">TAT Status Update</div>;
    },
  },
  {
    accessorKey: "account_name_code_mobile_number",
    header: () => {
      return <div className="min-w-[170px]">Acc.Name/Code/Mobile</div>;
    },
  },
  {
    accessorKey: "action_representative_closure",
    header: () => {
      return <div className="min-w-[140px]">Action Rep. Closure</div>;
    },
  },
  {
    accessorKey: "account_email",
    header: () => {
      return <div className="min-w-[70px]">Account Email</div>;
    },
  },
  {
    accessorKey: "case_record_type",
    header: () => {
      return <div className="min-w-[130px]">Case Record Type</div>;
    },
  },
  {
    accessorKey: "created_date_reporting",
    header: "Created Date",
    cell: ({ getValue }) => {
      const date = getValue() as string;

      return date ? new Date(date).toLocaleDateString("default") : "";
    },
  },
  {
    accessorKey: "created_month",
    header: "Created Mon.",
    cell: ({ getValue }) => {
      const date = getValue() as string;

      return date
        ? new Date(date).toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })
        : "";

      // return date ? date : "";
    },
  },
  {
    accessorKey: "wss_name",
    header: () => {
      return <div className="min-w-[70px]">WSS Name</div>;
    },
  },
  {
    accessorKey: "wss_contact",
    header: () => {
      return <div className="min-w-[70px]">WSS Contact</div>;
    },
  },
  {
    accessorKey: "category",
    header: () => {
      return <div className="min-w-[100px]">Category</div>;
    },
  },
  {
    accessorKey: "subcategory",
    header: () => {
      return <div className="min-w-[100px]">Subcategory</div>;
    },
  },
  {
    accessorKey: "subcategory2",
    header: () => {
      return <div className="min-w-[100px]">Subcategory 2</div>;
    },
  },
  {
    accessorKey: "description",
    header: () => {
      return <span className="w-[200px]">Description</span>;
    },
    cell: ({ getValue }) => {
      const description = getValue() as string;
      if (!description) return "";
      const truncatedDescription =
        description.length > 100
          ? description?.substring(0, 100) + "..."
          : description;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="min-w-[300px]">{truncatedDescription}</div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px]">
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "ageing",
    header: () => {
      return <div className="min-w-[70px]">Ageing</div>;
    },
  },
  {
    accessorKey: "case_owner_full_name",
    header: () => {
      return <div className="min-w-[100px]">Case Owner</div>;
    },
  },
  {
    accessorKey: "case_owner_email",
    header: () => {
      return <div className="min-w-[100px]">Case Owner Email</div>;
    },
  },
  {
    accessorKey: "case_origin",
    header: () => {
      return <div className="min-w-[100px]">Case Origin</div>;
    },
  },
  {
    accessorKey: "ftr",
    header: () => {
      return <div className="min-w-[70px]">FTR</div>;
    },
  },
  {
    accessorKey: "sales_group_code",
    header: () => {
      return <div className="min-w-[150px]">Sales Group</div>;
    },
  },
  {
    accessorKey: "division",
    header: () => {
      return <div className="min-w-[150px]">Division</div>;
    },
  },
  {
    accessorKey: "closed_date_reporting",
    header: "Closed Date",
    cell: ({ getValue }) => {
      const date = getValue() as Date;
      return date ? date : "";
    },
  },
  {
    accessorKey: "case_id",
    header: () => {
      return <div className="min-w-[100px]">Case ID</div>;
    },
  },
  {
    accessorKey: "created_by_full_name",
    header: () => {
      return <div className="min-w-[100px]">Created By</div>;
    },
  },
  {
    accessorKey: "is_re_raised",
    header: "Is Re-raised",
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
  },
  {
    accessorKey: "issue_resolution_closure_comments",
    header: "Resolution Comments",
    cell: ({ getValue }) => {
      const comments = getValue() as string;
      if (!comments) return "";
      const truncatedComments =
        comments.length > 100 ? comments?.substring(0, 100) + "..." : comments;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="min-w-[300px]">{truncatedComments}</div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px]">
              <p>{comments}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "closed_by",
    header: () => {
      return <div className="min-w-[100px]">Closed By</div>;
    },
  },
];
