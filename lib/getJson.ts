"use server"

import { auth } from "@/auth";
import readJsonFromS3 from "./readJsonFromS3"
import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    region: "sa-east-1",
});

export const getJson = async () => {
    const session = await auth()

    const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME!;

    const jsonFileName = `${session?.user?.email}.json`;

    const data = await readJsonFromS3(bucketName, jsonFileName);

    return data
}