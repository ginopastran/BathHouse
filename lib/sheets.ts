import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

async function getSheetData() {
    const auth = new JWT({
        keyFile: './data/bathouse-ad042a04ff39.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    // Create a Google Sheets API client
    const sheets = google.sheets({ version: 'v4', auth });

    try {
        // Specify the spreadsheet ID and range to fetch
        const spreadsheetId = '<your-spreadsheet-id>';
        const range = 'Sheet1!A1:B10';

        // Fetch the data from the spreadsheet
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        // Extract the values from the response
        const values = response.data.values;

        // Process the data as needed
        // console.log(values);
    } catch (error) {
        console.error('Error retrieving data from Google Sheets:', error);
    }
}