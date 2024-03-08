import { S3 } from 'aws-sdk';

const readExcelFromDirectoryS3 = async (bucketName: string, fileName: string): Promise<Buffer | undefined> => {
    const s3 = new S3();
    const params = {
        Bucket: bucketName,
        Key: fileName
    };
    try {
        const data = await s3.getObject(params).promise();
        return data?.Body as Buffer
    } catch (error) {
        console.error("Error al leer el archivo desde S3:", error);
        return undefined;
    }
};

export default readExcelFromDirectoryS3;

