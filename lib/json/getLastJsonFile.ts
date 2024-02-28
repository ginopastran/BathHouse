import { S3 } from 'aws-sdk';
import AWS from "aws-sdk"

AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_S3_REGION,
});

const s3 = new S3();



const getLastJsonFile = async (bucketName: string, userFolder: string): Promise<string | undefined> => {
    const params = {
        Bucket: bucketName,
        Prefix: userFolder,
    };

    try {
        const data = await s3.listObjectsV2(params).promise();
        const contents = data.Contents;

        if (!contents || contents.length === 0) {
            return undefined;
        }

        // Filtra los archivos para incluir solo los que terminan en .json
        const jsonFiles = contents.filter(file => file?.Key?.endsWith('.json'));

        if (jsonFiles.length === 0) {
            return undefined;
        }

        // Ordena los archivos por fecha de última modificación
        jsonFiles.sort((a, b) => {
            const aTime = a.LastModified ? a.LastModified.getTime() : 0;
            const bTime = b.LastModified ? b.LastModified.getTime() : 0;
            return bTime - aTime;
        });

        // Devuelve el nombre del archivo .xlsx más reciente
        return jsonFiles[0].Key;
    } catch (error) {
        console.error("Error al listar los archivos desde S3:", error);
        return undefined;
    }
}

export default getLastJsonFile