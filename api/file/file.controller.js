const fileModel = require('./file.model');
const Client = require('ssh2-sftp-client');

async function uploadFileToServer(fileBuffer, fileName, targetDir) {
    const client = new Client();
    const remoteFilePath = `${targetDir}/${fileName}`;
    try {
        await client.connect({
            host: process.env.SFTP_HOST,
            port: +(process.env.SFTP_PORT || '22'),
            username: process.env.SFTP_USER,
            password: process.env.SFTP_PASS,
        });
        await client.put(Buffer.from(fileBuffer), remoteFilePath);
        console.log(`File successfully uploaded to ${remoteFilePath}`);
    } catch (err) {
        console.error('Error uploading file:', err);
        throw err;
    } finally {
        await client.end();
    }
}

async function addFile(req, res, next) {
    try {
        const { file, fileName, targetDir } = req.body;
        const encoder = new TextEncoder();
        const fileBuffer = encoder.encode(file);
        await uploadFileToServer(fileBuffer, fileName, targetDir);
        return res.status(200).json({message: 'File uploaded successfully'});
    } catch (error) {
        console.error('Error handling file upload:', error);
        next(error);
        return res.status(500).json({error: 'Failed to upload file'});
    }
}


module.exports = {addFile};
