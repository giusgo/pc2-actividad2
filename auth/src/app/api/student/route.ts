import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

const DB_URL = process.env.DB_URL;

// CUD
const CUD_ENDPOINT = (operation: string) => (`${DB_URL}/aurora/student/${operation}`);
// R
const READ_ENDPOINT = (student: string) => (`${DB_URL}/aurora/student/${student}`);

export async function POST(request: NextRequest) {
    try {
        // Extract data from the request
        const requestData = await request.json();

        console.log(requestData);

        if (requestData.operation == "read") {
            const response = await axios.get(READ_ENDPOINT(requestData.username));

            return NextResponse.json(response.data.grade, { status: 200 });
        } else {
            const response = await axios.post(CUD_ENDPOINT(requestData.operation), {
                userName: requestData.username,
                grade: requestData.grade,
            });

            return NextResponse.json("CUD done.", { status: 200 });
        }
    } catch (error) {
        console.error("An error occurred trying to do CRUD.");
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}