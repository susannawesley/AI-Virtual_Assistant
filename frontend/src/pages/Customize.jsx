// frontend/src/pages/Customize.jsx
import React, { useContext, useRef, useState } from 'react';
import Card from '../components/Card';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/authBg.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.jpeg';
import image7 from '../assets/image7.jpeg';
import { RiImageAddLine } from 'react-icons/ri';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';

function Customize() {
    const { serverUrl, userData, setUserData, backendImage, setBackendImage, frontendImage, setFrontendImage, selectedImage, setSelectedImage } = useContext(userDataContext);
    const navigate = useNavigate();
    const inputImage = useRef();

    const handleImage = (e) => {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    };

    const images = [image1, image2, image3, image4, image5, image6, image7]; // Array for easier mapping

    return (
        <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px] '>
            <MdKeyboardBackspace className='absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]' onClick={() => navigate('/')} />
            <h1 className='text-white mb-[40px] text-[30px] text-center '>Select your <span className='text-blue-200'>Assistant Image</span></h1>
            {/* Adjusted max-width to allow more space for wrapping tiles */}
            {/* Increased max-w to ensure space for the last tile on wider screens before it wraps unnaturally.
                Also added more padding to the wrapper to give some breathing room. */}
            <div className='w-full max-w-[1000px] flex justify-center items-center flex-wrap gap-[15px] px-2'> {/* Added px-2 for slight horizontal padding */}
                {images.map((img, index) => (
                    <Card key={index} image={img} />
                ))}
                <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex justify-center items-center ${selectedImage === 'input' ? 'border-4 border-white shadow-2xl shadow-blue-950 ' : ''}`} onClick={() => { // Added flex, justify-center, items-center for icon alignment
                    inputImage.current.click();
                    setSelectedImage('input');
                }}>
                    {!frontendImage && <RiImageAddLine className='text-white w-[50px] h-[50px]' />} {/* Increased icon size for better visibility */}
                    {frontendImage && <img src={frontendImage} alt="Custom Assistant" className='h-full w-full object-cover' />} {/* Added w-full for full width cover */}
                </div>
                <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage} />
            </div>
            {selectedImage && <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold cursor-pointer bg-white rounded-full text-[19px] ' onClick={() => navigate('/customize2')}>Next</button>}
        </div>
    );
}

export default Customize;