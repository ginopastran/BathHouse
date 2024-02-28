import { S3 } from 'aws-sdk';

const s3 = new S3();

const getLastXlsxFile = async (bucketName: string, userFolder: string): Promise<string | undefined> => {
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

        // Filtra los archivos para incluir solo los que terminan en .xlsx
        const xlsxFiles = contents.filter(file => file?.Key?.endsWith('.xlsx'));

        if (xlsxFiles.length === 0) {
            return undefined;
        }

        // Ordena los archivos por fecha de última modificación
        xlsxFiles.sort((a, b) => {
            const aTime = a.LastModified ? a.LastModified.getTime() : 0;
            const bTime = b.LastModified ? b.LastModified.getTime() : 0;
            return bTime - aTime;
        });

        // Devuelve el nombre del archivo .xlsx más reciente
        return xlsxFiles[0].Key;
    } catch (error) {
        console.error("Error al listar los archivos desde S3:", error);
        return undefined;
    }
}

export default getLastXlsxFile