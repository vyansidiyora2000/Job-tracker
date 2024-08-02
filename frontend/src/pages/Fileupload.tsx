import React, { useState } from 'react';

const FileUpload: React.FC = () => {
    const [response, setResponse] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setFile(selectedFile);
    };

    const uploadFile = async () => {
        if (!file) {
            setResponse('Please select a file.');
            return;
        }

        const reader = new FileReader();

        reader.onload = async () => {
            const base64Content = reader.result?.toString().split(',')[1]; // Remove data URL scheme prefix
            if (base64Content) {
                const fileName = file.name;

                try {
                    const response = await fetch('YOUR_LAMBDA_API_GATEWAY_ENDPOINT', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            file_name: fileName,
                            file_content: base64Content
                        })
                    });

                    const responseData = await response.json();
                    setResponse(responseData.body);
                } catch (error) {
                    setResponse('Error: ' + (error as Error).message);
                }
            } else {
                setResponse('Error encoding file.');
            }
        };

        reader.readAsDataURL(file);
    };

    return (
        <div>
            <h1>Upload File</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadFile}>Upload</button>
            <p>{response}</p>
        </div>
    );
};

export default FileUpload;
