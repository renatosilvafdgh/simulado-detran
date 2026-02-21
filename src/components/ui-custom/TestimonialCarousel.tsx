import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar: string;
}

interface TestimonialCarouselProps {
    testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Auto-play interval
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 6000); // 6 seconds per slide
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => setIsTransitioning(false), 500); // match CSS transition duration
    };

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        setTimeout(() => setIsTransitioning(false), 500);
    };

    const setIndex = (index: number) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 500);
    };

    return (
        <div className="relative max-w-4xl mx-auto px-4 sm:px-12 py-8">

            {/* Cards Container */}
            <div className="relative overflow-hidden pt-4 pb-12 px-2">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {testimonials.map((testimonial, idx) => {
                        const isActive = idx === currentIndex;

                        return (
                            <div
                                key={idx}
                                className="w-full flex-shrink-0 px-4 transition-all duration-500 ease-out"
                                style={{
                                    opacity: isActive ? 1 : 0.4,
                                    transform: `scale(${isActive ? 1 : 0.95})`
                                }}
                            >
                                <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-slate-100/80 dark:border-slate-700/50 mt-4 mx-auto max-w-2xl transform transition-transform hover:-translate-y-1 duration-300">

                                    {/* Decorative Quote Mark */}
                                    <div className="absolute -top-6 -left-2 text-emerald-100 dark:text-slate-700/50">
                                        <Quote className="w-16 h-16 fill-current -rotate-12" />
                                    </div>

                                    {/* Rating */}
                                    <div className="relative flex justify-center mb-6 z-10">
                                        <div className="inline-flex gap-1.5 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-full ring-1 ring-yellow-100 dark:ring-yellow-900/40">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 md:h-5 md:w-5 ${i < testimonial.rating
                                                            ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm'
                                                            : 'text-slate-200 dark:text-slate-600'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 min-h-[120px] flex items-center justify-center">
                                        <p className="text-slate-700 dark:text-slate-200 text-lg md:text-xl leading-relaxed text-center italic font-medium">
                                            "{testimonial.content}"
                                        </p>
                                    </div>

                                    {/* Author */}
                                    <div className="flex flex-col items-center gap-3 mt-8 relative z-10">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_0_4px_rgba(255,255,255,1),0_4px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_0_4px_rgba(30,41,59,1),0_4px_10px_rgba(0,0,0,0.3)] ring-1 ring-black/5 dark:ring-white/10">
                                            {testimonial.avatar}
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-slate-900 dark:text-white text-base tracking-tight">{testimonial.name}</p>
                                            <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium mt-0.5">{testimonial.role}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Controls */}
            <button
                onClick={handlePrev}
                className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all border border-slate-100 dark:border-slate-600 z-20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                aria-label="Anterior"
            >
                <ChevronLeft className="w-6 h-6 -ml-0.5" />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all border border-slate-100 dark:border-slate-600 z-20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                aria-label="Próximo"
            >
                <ChevronRight className="w-6 h-6 ml-0.5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-2">
                {testimonials.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setIndex(idx)}
                        className={`transition-all duration-300 rounded-full ${idx === currentIndex
                                ? 'w-8 h-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 shadow-sm'
                                : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500'
                            }`}
                        aria-label={`Ir para depoimento ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
