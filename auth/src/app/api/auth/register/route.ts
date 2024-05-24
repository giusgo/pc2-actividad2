import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

const DB_URL = process.env.DB_URL;
const SIGNUP_ENDPOINT = `${DB_URL}/aurora/register`;

export async function POST(request: NextRequest) {
    try {
        // Extract data from the request
        const requestData = await request.json();

        // Make a POST request to the database endpoint
        const response = await axios.post(SIGNUP_ENDPOINT, requestData);

        return NextResponse.json("Register successful.", { status: 200 });
    } catch (error) {
        console.error("An error occurred trying to register.");
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}