import React, { useState } from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            text: "This platform has transformed my business which has doubled my revenue.",
            name: "Sumaya Akter Mim",
            image: "/Page/user.avif", // Replace with actual image path
            rating: 4
        },
        {
            id: 2,
            text: "A great service that helped me scale quickly and efficiently.",
            name: "John Doe",
            image: "/Page/user.avif", // Replace with actual image path
            rating: 5
        },
        {
            id: 3,
            text: "The platform is easy to use and has a great customer support team.",
            name: "Jane Smith",
            image: "/Page/user.avif", // Replace with actual image path
            rating: 3
        },
        {
            id: 4,
            text: "I am extremely happy with the results, it's beyond expectations.",
            name: "Alice Johnson",
            image: "https://via.placeholder.com/100", // Replace with actual image path
            rating: 5
        },
        {
            id: 5,
            text: "Great platform! It helped me grow my business steadily.",
            name: "Robert Brown",
            image: "/Page/user.avif", // Replace with actual image path
            rating: 4
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? 'text-yellow-500' : 'text-gray-300'}>
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    const sliderStyle = {
        transform: `translateX(-${(currentIndex * 100) / 3}%)`, // Slide width adjustment
        transition: 'transform 0.3s ease-in-out',
    };

    return (
        <section id='testimonials' className="py-10 px-5">
            <div className='mb-5 '>
                <h2 className="text-center text-4xl mb-3 font-bold">What Our Customers Are Saying </h2>
                <p className="text-center text-gray-600">Discover how our clients highlight the trust, transparency, and innovation that define the SureServ experience.</p>
            </div>

            <div className="relative min-h-full overflow-x-hidden my-14">
                {/* Previous Button */}

                {/* Slider Wrapper */}
                <div className=" ">
                    <div className="flex" style={sliderStyle}>
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`flex-none w-full sm:w-1/3 lg:w-1/3 p-4 transition-all duration-300 ease-in-out ${index === currentIndex
                                    ? 'scale-90 z-10'
                                    : index === (currentIndex + 1) % testimonials.length
                                        ? 'scale-110 z-[20]'
                                        : 'scale-90'
                                    }`}
                            >
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <div className="flex justify-center items-center mb-4">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-24 h-24 rounded-full border-2 border-yellow-500"
                                        />
                                    </div>
                                    <p className="text-center text-gray-700 mb-3">{testimonial.text}</p>
                                    <div className="flex justify-center mb-3">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                    <p className="text-center font-semibold text-gray-800">{testimonial.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Button */}
                <div className='flex items-center justify-center mt-10 gap-2' >
                    <button
                        className=" z-[999] w-14 text-2xl h-14 left-0 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white p-2 rounded-full"
                        onClick={goToPrevious}
                    >
                        &#8592;
                    </button>
                    <button
                        className=" right-0 w-14 h-14 text-2xl top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white p-2 rounded-full"
                        onClick={goToNext}
                    >
                        &#8594;
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
