import { S3 } from "aws-sdk";

const readJsonFromS3 = async (bucketName: string, fileName: string): Promise<any | undefined> => {
    const s3 = new S3();
    const params = {
        Bucket: bucketName,
        Key: fileName
    };
    try {
        const data = await s3.getObject(params).promise();
        if (data.Body) {
            const jsonData = JSON.parse(data.Body.toString());
            return jsonData;
        }
        return undefined;
    } catch (error) {
        console.error("Error al leer el archivo JSON desde S3:", error);
        return undefined;
    }
};

export default readJsonFromS3;