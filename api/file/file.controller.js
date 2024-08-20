const Client = require('ssh2-sftp-client');
const productsModel = require("../products/products.model");

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
        return await client.put(fileBuffer, remoteFilePath)
    } catch (err) {
        throw err;
    } finally {
        await client.end();
    }
}

async function addFile(req, res) {
    let uploadedFiles=[]
    try {
        const { targetDir } = req.body;
        const files = req.files;
        for (const file of files) {
           const uploadedResult = await uploadFileToServer(file.buffer, file.originalname, targetDir);
           uploadedFiles.push(uploadedResult)
        }
        return res.status(200).json({ message: 'Files uploaded successfully',isSuccessful:true,uploadedFiles: uploadedFiles });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to upload file',isSuccessful:false });
    }
}
async function deleteFile(req, res) {
    const client = new Client();
    try {
        const { targetDir,fileName,body } = req.body;
        const remoteFilePath = `${targetDir}/${fileName}`;

        await client.connect(connectConfig);
        await client.delete(remoteFilePath);
        await productsModel.updateFields(body)
        return res.status(200).json({ message: 'File DELETED successfully',isSuccessful:true });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to DELETED file',isSuccessful:false });
    }
    finally {
        await client.end();
    }
}


module.exports = {addFile,deleteFile};
