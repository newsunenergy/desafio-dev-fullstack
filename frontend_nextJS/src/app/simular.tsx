import { useState } from 'react';
import axios from 'axios';

const Simular = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [files, setFiles] = useState<FileList | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);

        if (files) {
            Array.from(files).forEach((file) => {
                if (file.type === 'application/pdf') {
                    formData.append('files', file);
                }
            });
        }

        try {
            await axios.post('http://localhost:3000/lead', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Form submitted successfully');
        } catch (error) {
            console.error('Error submitting form', error);
            alert('Error submitting form');
        }
    };

    return (
        <div>
            <h1>Simular</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Telefone:</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="files">Adicione suas contas de luz:</label>
                    <input
                        type="file"
                        id="files"
                        accept="application/pdf"
                        multiple
                        onChange={(e) => setFiles(e.target.files)}
                    />
                </div>
                <button type="submit">Simular</button>
            </form>
        </div>
    );
};

export default Simular;