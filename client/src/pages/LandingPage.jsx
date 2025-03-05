import React, { useState } from 'react'
import chat_app_logo from '../assets/chat_app_logo.png'
import landing_page_bg from '../assets/landing-page-bg.jpg'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/register', { state: { email } })
    }
    const loginNav = () => {

        navigate('/email')
    }
    const SignNav = () => {

        navigate('/register')
    }


    return (
        <>
            <div className='flex flex-col justify-center '>
                <div className=' sticky top-0 bg-white border border-b-1 border-solid border-black z-[1000]'>
                    <header className='p-4 flex justify-between items-center gap-8 mx-16'>
                        <div className='flex items-center text-lg font-semibold'>
                            <img className="ms-4" src={chat_app_logo}
                                alt="logo"
                                width={40}
                                height={40} />
                            <p>
                                Chat App
                            </p>
                        </div>
                        <div className='flex items-center gap-4 text-lg p-2 me-4 '>

                            <p className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full"><a>Home</a></p>
                            <p className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full"><a href='#testinomials'>Testinomials</a></p>
                            <p className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full"><a href='#features'>Features</a></p>
                            <p className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full"><a>Coming Soon</a></p>

                        </div>
                        <div className='flex items-center gap-4 font-bold p-2 me-4 '>
                            <button className='bg-white border border-solid border-purple1 font-semibold px-4 py-1 rounded-2xl text-purple1 hover:bg-purple1 hover:text-white' onClick={SignNav}>
                                Sign Up
                            </button>
                            <button className='bg-purple1 font-semibold p-4 py-1 rounded-2xl text-white hover:text-purple1 hover:bg-white hover:border border-solid border-purple1' onClick={loginNav} >
                                Login
                            </button>
                        </div>

                    </header>
                </div>
                <section className=' rounded bg-white '>

                    <div className='h-screen w-10/12  bg-cover bg-center flex flex-between rounded-lg mx-32 mt-10 overflow-hidden p-20  ' style={{ backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${landing_page_bg})` }}>

                        <div className='w-1/2 ps-10 pt-10 '>
                            <h1 className="text-5xl font-bold text-white ">Chat App</h1>
                            <p className="text-lg text-white mt-4">
                                Stay connected with friends and family with real-time messaging,
                                secure conversations, and seamless file sharing.
                            </p>
                            <button className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all" onClick={SignNav}>
                                Get Started
                            </button>
                        </div>


                    </div>
                    {/* Features Section */}
                    <div className="w-full  py-20 " id='features'>
                        <div className="max-w-screen-lg mx-auto px-8">
                            <h2 className="text-3xl font-bold text-center mb-10">Our Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                                    <h3 className="text-xl font-semibold mb-2">Real-Time Messaging</h3>
                                    <p className="text-gray-600">
                                        Experience instant communication with seamless, real-time messaging capabilities.
                                    </p>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl ">
                                    <h3 className="text-xl font-semibold mb-2">Secure Conversations</h3>
                                    <p className="text-gray-600">
                                        Your privacy is our priority. Enjoy end-to-end encryption in every conversation.
                                    </p>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                                    <h3 className="text-xl font-semibold mb-2">Easy File Sharing</h3>
                                    <p className="text-gray-600">
                                        Share photos, documents, and more effortlessly with our integrated file sharing features.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial Section */}
                    <div id='testinomials' className={`w-full py-20`}>
                        <div className="max-w-screen-lg mx-auto px-8">
                            <h2 className="text-3xl font-bold text-center mb-10 ">What Our Users Say</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                                    <p className="text-lg italic mb-4">"This app changed my life!"</p>
                                    <p className="font-bold text-right">- John Doe</p>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                                    <p className="text-lg italic mb-4">"A must-have for daily communication."</p>
                                    <p className="font-bold text-right">- Jane Smith</p>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                                    <p className="text-lg italic mb-4">"Loved by 10K+ users indeed!"</p>
                                    <p className="font-bold text-right">- Alex Johnson</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-purple-600 py-20">
                        <div className="max-w-screen-lg mx-auto px-8 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Ready to Experience Real-Time Communication?
                            </h2>
                            <p className="text-lg text-white mb-8">
                                Join thousands of users enjoying a seamless chat experience. Sign up now to stay connected!
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-white">
                                <input
                                    id='email'
                                    type="email"
                                    placeholder="Enter your email"
                                    
                                    className="px-4 py-3 rounded-md focus:outline-none"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button onClick={handleSubmit} className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-100 transition-all">
                                    Sign Up Now
                                </button>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </>
    )
}

export default LandingPage