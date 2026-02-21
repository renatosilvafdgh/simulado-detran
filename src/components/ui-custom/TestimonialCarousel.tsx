import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

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
    const [visibleItems, setVisibleItems] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setVisibleItems(1);
            else if (window.innerWidth < 1024) setVisibleItems(2);
            else setVisibleItems(3);
        };
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, testimonials.length - visibleItems);

    // Auto-play interval
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 6000); // 6 seconds per slide
        return () => clearInterval(timer);
    }, [currentIndex, visibleItems, maxIndex]);

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        setTimeout(() => setIsTransitioning(false), 500); // match CSS transition duration
    };

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
        setTimeout(() => setIsTransitioning(false), 500);
    };

    const setIndex = (index: number) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 500);
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-12 py-8">

            {/* Cards Container */}
            <div className="relative overflow-hidden pt-4 pb-12 px-2">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
                >
                    {testimonials.map((testimonial, idx) => {
                        const isVisible = idx >= currentIndex && idx < currentIndex + visibleItems;

                        return (
                            <div
                                key={idx}
                                className="flex-shrink-0 px-4 transition-all duration-500 ease-out"
                                style={{
                                    width: `${100 / visibleItems}%`,
                                    opacity: isVisible ? 1 : 0.5,
                                    transform: `scale(${isVisible ? 1 : 0.95})`
                                }}
                            >
                                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg border border-slate-100 dark:border-slate-700 mx-auto max-w-sm h-full flex flex-col justify-between">
                                    <div>
                                        {/* Rating */}
                                        <div className="flex items-center gap-1 mb-4">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 md:h-5 md:w-5 ${i < testimonial.rating
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-slate-300 dark:text-slate-600'
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        {/* Content */}
                                        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6 text-left">
                                            "{testimonial.content}"
                                        </p>
                                    </div>

                                    {/* Author */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 rounded-full bg-emerald-500 shrink-0 flex items-center justify-center text-white font-semibold shadow-sm">
                                            {testimonial.avatar}
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold text-slate-900 dark:text-white text-sm">{testimonial.name}</p>
                                            <p className="text-slate-500 dark:text-slate-400 text-xs">{testimonial.role}</p>
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
            <div className="flex justify-center flex-wrap gap-2 mt-2 px-12">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setIndex(idx)}
                        className={`transition-all duration-300 rounded-full ${idx === currentIndex
                            ? 'w-8 h-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 shadow-sm'
                            : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500'
                            }`}
                        aria-label={`Ir para página de depoimentos ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
