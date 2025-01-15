import React from 'react';
import { Link } from 'react-router-dom';
import aboutimg from '../assets/INNERAURA.png';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function AboutUs() {
    return (
        <div className="min-h-[120vh] container bg-[#111111]">
            {/* Back to Home Button */}
            <div className="p-4">
                <Link to="/">
                    <button className="btn mt-10 ms-0 lg:ms-20 text-white flex items-center">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2 fa-2x" />
                    </button>
                </Link>
            </div>

            <h1 className="text-center text-white text-[60px] py-16">ABOUT US</h1>
            <div className="flex items-center justify-center">
                <img
                    className="rounded-full lg:w-100 lg:h-96 my-8"
                    src={aboutimg}
                    alt=""
                />
            </div>

            <div className="grid grid-cols-12 py-10">
                <div className="col-span-2"></div>
                <div className="col-span-8">
                    <p className="text-center text-white my-10">
                        Welcome to{' '}
                        <span className="text-[#e8ab5c] text-[26px]">Inner Aura</span>, your
                        sanctuary for mindfulness and meditation. We believe in the power
                        of a calm mind and a balanced spirit. Our platform offers a curated
                        selection of category-based tracks designed to bring relief and
                        tranquility to your daily life. Whether you’re seeking stress
                        reduction, better sleep, or a moment of peace, Inner Aura provides
                        the perfect guide to reconnect with your inner self.
                    </p>
                    <hr />
                    <p className="text-center text-[60px] text-white my-10">The 3 C's</p>

                    <div className="grid lg:grid-cols-3 grid-cols-1 text-white justify-center items-center py-10">
                        <div className="text-white flex items-center justify-center bg-[#b49d89] p-36 rounded-full lg:mb-0 mb-16">
                            <p className="text-[25px]">CALM</p>
                        </div>
                        <div>
                            <p className="hidden lg:block lg:text-[15px] lg:text-center">
                                Discover serenity with our soothing tracks designed to ease your
                                mind and reduce stress.
                            </p>
                        </div>
                        <div className="text-white flex items-center justify-center bg-slate-600 p-36 rounded-full">
                            <p className="text-[25px]">CONNECT</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 grid-cols-1 text-white justify-center items-center py-10">
                        <div>
                            <p className="hidden lg:block lg:text-[15px] lg:text-center">
                                Deepen your connection to the present moment with guided
                                meditations tailored to your needs.
                            </p>
                        </div>
                        <div className="text-white flex items-center justify-center bg-[#988888] p-36 rounded-full">
                            <p className="text-[25px]">CULTIVATE</p>
                        </div>
                        <div>
                            <p className="hidden lg:block lg:text-[15px] lg:text-center">
                                Nurture a balanced lifestyle by incorporating mindfulness into
                                your daily routine.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-2"></div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default AboutUs;
