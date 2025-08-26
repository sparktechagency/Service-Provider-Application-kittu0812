import React from 'react';
import { CiPlay1 } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-[url("/Page/footer-bg.png")] h-[250px] w-full flex items-center relative'>
            <div className='lg:ml-20 ml-10'>
                <h2 className='text-2xl font-bold'>Ready to take charge? </h2>
                <p className='my-2'>Let’s Jump into your Admin Dashboard to get the work started</p>
                <Link
                    to={"/"}
                    className=" px-5 py-2 bg-[#db0101e3] flex items-center w-48 justify-center text-white gap-2  rounded-lg shadow transition"
                >
                    <CiPlay1 /> Admin Dashboard
                </Link>
            </div>
            <img className='absolute max-w-[350px] bottom-0 right-20' src="/Page/footer-user.png" alt="" />
        </div>
    );
}

export default Footer;
