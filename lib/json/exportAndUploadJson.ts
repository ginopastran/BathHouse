import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_S3_REGION,
});

const s3 = new AWS.S3();

export function exportAndUploadJson(jsonFileName: string, jsonBuffer: Buffer): Promise<AWS.S3.ManagedUpload.SendData> {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: jsonFileName,
            Body: jsonBuffer
        };

        s3.upload(params, function (err: Error, data: AWS.S3.ManagedUpload.SendData) {
            if (err) {
                reject(err);
            } else {
                console.log(`JSON file uploaded successfully. ${data.Location}`);
                resolve(data);
            }
        });
    });
}