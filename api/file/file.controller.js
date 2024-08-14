const Client = require('ssh2-sftp-client');

const connectConfig={
    host: process.env.SFTP_HOST,
    port: +(process.env.SFTP_PORT || '22'),
    username: process.env.SFTP_USER,
    password: process.env.SFTP_PASS,
}

async function uploadFileToServer(fileBuffer, fileName, targetDir) {
    const client = new Client();
    const remoteFilePath = `${targetDir}/${fileName}`;
    try {
        await client.connect(connectConfig);
        await client.put(fileBuffer, remoteFilePath);
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
        const { targetDir } = req.body;
        const file = req.file;
        await uploadFileToServer(file.buffer, file.originalname, targetDir);
        return res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error handling file upload:', error);
        next(error);
        return res.status(500).json({ error: 'Failed to upload file' });
    }
}
async function deleteFile(req, res, next) {
    try {
        const { targetDir,fileName } = req.body;
        const remoteFilePath = `${targetDir}/${fileName}`;

        const client = new Client();

        await client.connect(connectConfig);
        await client.delete(remoteFilePath);
        console.log(`File successfully DELETED `);
        return res.status(200).json({ message: 'File DELETED successfully' });
    } catch (error) {
        console.error('Error handling file DELETED:', error);
        next(error);
        return res.status(500).json({ error: 'Failed to DELETED file' });
    }
}


module.exports = {addFile,deleteFile};
