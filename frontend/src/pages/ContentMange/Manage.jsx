import { React, useEffect, useState } from 'react';
import './Manage.css';
import axios from 'axios';

export default function Manage() {
    const [activeTab, setActiveTab] = useState('text');
    const [textData, setTextData] = useState({ title: '', message: '', type: 'text' });
    const [imageData, setImageData] = useState({ title: '', message: '', type: 'image', fileSize: 0 });
    const [errorMessage, setErrorMessage] = useState('');
    const [notice, setNotice] = useState(null)
    const handleTabChange = (tab) => {
        setErrorMessage(''); // Clear errors when switching tabs
        setActiveTab(tab);
    };

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setTextData({ ...textData, [name]: value });
    };

    const handleImageChange = (e) => {
        const { name } = e.target;
        if (name === 'image') {
            const file = e.target.files[0];
            if (file) {
                // Check file size (1 MB = 1,048,576 bytes)
                if (file.size > 1048576) {
                    setErrorMessage('File size exceeds 1 MB. Please upload a smaller image.');
                    setImageData({ ...imageData, message: '', fileSize: 0 }); // Clear invalid image
                    return;
                }
                setErrorMessage(''); // Clear error if file size is valid
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImageData({ ...imageData, message: event.target.result, fileSize: file.size });
                };
                reader.readAsDataURL(file);
            }
        } else {
            setImageData({ ...imageData, [name]: e.target.value });
        }
    };

    const handleSubmit = async () => {
        if (activeTab === 'image' && imageData.fileSize > 1048576) {
            setErrorMessage('File size exceeds 1 MB. Please upload a smaller image.');
            return; // Prevent form submission
        }
        try {
            if (activeTab === 'text') {
                console.log('Text Data:', textData);
                await axios.post('http://127.0.0.1:5000/api/circulars', textData);
            } else if (activeTab === 'image') {
                console.log('Image Data:', imageData);
                await axios.post('http://127.0.0.1:5000/api/circulars', imageData);
            }
            alert('Form submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrorMessage('Failed to submit form. Please try again.');
        }
    };

    useEffect(() => {
        const fetchdata = async () => {
            const res = await axios.get('http://127.0.0.1:5000/api/circulars')
                .then(e => {
                    console.log(e.data)
                    setNotice(e.data)
                })
        }
        fetchdata()
    }, [])

    return (
        <div className="container">
            <div className="card">
                <div className="tab-buttons">
                    <button
                        onClick={() => handleTabChange('text')}
                        className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
                    >
                        Text
                    </button>
                    <button
                        onClick={() => handleTabChange('image')}
                        className={`tab-button ${activeTab === 'image' ? 'active' : ''}`}
                    >
                        Image
                    </button>
                </div>
                <div className="form-content">
                    {activeTab === 'text' && (
                        <div>
                            <label>
                                <strong>Title:</strong>
                                <input
                                    type="text"
                                    name="title"
                                    value={textData.title}
                                    onChange={handleTextChange}
                                    className="input-field"
                                />
                            </label>
                            <br />
                            <label>
                                <strong>Message:</strong>
                                <textarea
                                    name="message"
                                    value={textData.message}
                                    onChange={handleTextChange}
                                    className="textarea-field"
                                />
                            </label>
                        </div>
                    )}
                    {activeTab === 'image' && (
                        <div>
                            <label>
                                <strong>Title:</strong>
                                <input
                                    type="text"
                                    name="title"
                                    value={imageData.title}
                                    onChange={handleImageChange}
                                    className="input-field"
                                />
                            </label>
                            <br />
                            <label>
                                <strong>Upload Image:</strong>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="input-field"
                                />
                            </label>
                        </div>
                    )}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
                <button onClick={handleSubmit} className="submit-button">
                    Submit
                </button>
            </div>

        </div>
    );
}
