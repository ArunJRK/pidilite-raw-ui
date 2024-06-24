import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongo-client"; // Adjust the import path as needed
import RawFeedbackModel from "@/model/raw-feedback-model"; // Adjust the import path as needed

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const subcategory2 = searchParams.get("subcategory2");
    console.log("page", page, "limit", limit);

    // Build query
    const query: any = {};
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (subcategory2) query.subcategory2 = subcategory2;

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch data with pagination
    const feedbacks = await RawFeedbackModel.find(query, { spacy_md_vec: 0 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const totalCount = await RawFeedbackModel.countDocuments(query);

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    // Prepare response
    const response = {
      feedbacks,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching raw feedbacks:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
