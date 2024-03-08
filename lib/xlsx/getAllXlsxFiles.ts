import { auth } from '@/auth';
import { S3 } from 'aws-sdk';
import AWS from "aws-sdk"

AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_S3_REGION,
});

const s3 = new S3();

export async function getAllXlsxFiles() {
    const session = await auth();
    const userFolder = `${session?.user?.email}`;
    const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Prefix: userFolder,
    };

    const data = await s3.listObjectsV2(params).promise();

    if (!data.Contents) {
        return [];
    }

    const xlsxFiles = data.Contents.filter((file) => file && file.Key && file.Key.endsWith('-1.xlsx'));

    return Promise.all(
        xlsxFiles.map(async (file) => {
            if (file.Key) {
                const objectData = await s3.getObject({ Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!, Key: file.Key }).promise();
                return objectData.Body;
            }
        })
    );
}