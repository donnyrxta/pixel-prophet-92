import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark } from 'lucide-react';
import gsap from 'gsap';
import './TimedCardsOpening.css';

// Default placeholder images (Unsplash)
const DEFAULT_IMAGES = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2666&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2676&auto=format&fit=crop',
];

export interface TimedCardItem {
    place: string;
    title: string;
    title2: string;
    description: string;
    image?: string;
}

interface TimedCardsOpeningProps {
    items?: TimedCardItem[];
    brandName?: string;
    onDiscoverClick?: () => void;
}

const TimedCardsOpening: React.FC<TimedCardsOpeningProps> = ({
    items,
    brandName = 'SOHO CONNECT',
    onDiscoverClick
}) => {
    // Use provided items or generate defaults
    const cardData: TimedCardItem[] = items && items.length >= 3 ? items : [
        {
            place: 'Strategic Planning',
            title: 'DIGITAL',
            title2: 'STRATEGY',
            description: 'We build comprehensive digital roadmaps that align with your business goals.',
            image: DEFAULT_IMAGES[0]
        },
        {
            place: 'Community Growth',
            title: 'SOCIAL',
            title2: 'MEDIA',
            description: 'Ignite conversations and build lasting relationships through engaging content.',
            image: DEFAULT_IMAGES[1]
        },
        {
            place: 'Performance Marketing',
            title: 'RAPID',
            title2: 'GROWTH',
            description: 'Scale your business with high-performance campaigns and advanced analytics.',
            image: DEFAULT_IMAGES[2]
        },
        {
            place: 'Brand Identity',
            title: 'CREATIVE',
            title2: 'BRANDING',
            description: 'Stand out with a unique visual identity that\'s impossible to ignore.',
            image: DEFAULT_IMAGES[3]
        },
        {
            place: 'Search Dominance',
            title: 'SEO',
            title2: 'MASTERY',
            description: 'Claim the top spot on search results with our optimization expertise.',
            image: DEFAULT_IMAGES[4]
        }
    ];

    // Ensure we have images for all cards
    const DATA = cardData.map((item, idx) => ({
        ...item,
        image: item.image || DEFAULT_IMAGES[idx % DEFAULT_IMAGES.length]
    }));

    const containerRef = useRef<HTMLDivElement>(null);
    const [activeOrder, setActiveOrder] = useState<number[]>(() => DATA.map((_, i) => i));
    const [detailsEven, setDetailsEven] = useState(true);

    // Refs for animation elements
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const cardContentsRef = useRef<(HTMLDivElement | null)[]>([]);
    const slideItemsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Animation state
    const isAnimating = useRef(false);

    // Configuration
    const cardWidth = 200;
    const cardHeight = 300;
    const gap = 40;
    const numberSize = 50;
    const ease = "sine.inOut";

    // Initialize GSAP layout
    useEffect(() => {
        if (!containerRef.current) return;

        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        // Dynamic positioning
        const calcOffsetLeft = winWidth - 830 > 0 ? winWidth - 830 : winWidth * 0.1;
        const calcOffsetTop = winHeight - 430 > 0 ? winHeight - 430 : winHeight * 0.5;

        // Initial Setters
        gsap.set(".tc-pagination", {
            top: calcOffsetTop + 330,
            left: calcOffsetLeft,
            y: 200,
            opacity: 0,
        });

        // Active Card (First one)
        const activeIdx = activeOrder[0];
        gsap.set(cardsRef.current[activeIdx], {
            x: 0,
            y: 0,
            width: winWidth,
            height: winHeight,
            zIndex: 20
        });

        gsap.set(cardContentsRef.current[activeIdx], { x: 0, y: 0, opacity: 0 });

        // Rest of cards
        const rest = activeOrder.slice(1);
        rest.forEach((i, index) => {
            gsap.set(cardsRef.current[i], {
                x: calcOffsetLeft + 400 + index * (cardWidth + gap),
                y: calcOffsetTop,
                width: cardWidth,
                height: cardHeight,
                zIndex: 30,
                borderRadius: 10,
            });
            gsap.set(cardContentsRef.current[i], {
                x: calcOffsetLeft + 400 + index * (cardWidth + gap),
                zIndex: 40,
                y: calcOffsetTop + cardHeight - 100,
                opacity: 1
            });
            gsap.set(slideItemsRef.current[i], { x: (index + 1) * numberSize });
        });

        // Opening Animation
        const startDelay = 0.5;
        gsap.to(".tc-cover", {
            x: winWidth + 400,
            delay: 0.5,
            ease,
            duration: 1
        });

        // Animate rest of cards into position
        rest.forEach((i, index) => {
            gsap.to(cardsRef.current[i], {
                x: calcOffsetLeft + index * (cardWidth + gap),
                delay: startDelay + 0.05 * index,
                ease,
                duration: 0.8
            });
            gsap.to(cardContentsRef.current[i], {
                x: calcOffsetLeft + index * (cardWidth + gap),
                delay: startDelay + 0.05 * index,
                ease,
                duration: 0.8
            });
        });

        gsap.to(".tc-pagination", { y: 0, opacity: 1, ease, delay: startDelay, duration: 0.8 });

        // Animate initial details
        const activeDetails = detailsEven ? "#details-even" : "#details-odd";
        updateDetails(activeDetails, activeOrder[0]);

        // Start Loop
        const loopInterval = setInterval(() => {
            handleStep();
        }, 6000);

        return () => clearInterval(loopInterval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateDetails = (selector: string, dataIndex: number) => {
        const el = document.querySelector(selector);
        if (!el) return;

        const data = DATA[dataIndex];
        if (el.querySelector('.text')) el.querySelector('.text')!.textContent = data.place;
        if (el.querySelector('.title-1')) el.querySelector('.title-1')!.textContent = data.title;
        if (el.querySelector('.title-2')) el.querySelector('.title-2')!.textContent = data.title2;
        if (el.querySelector('.desc')) el.querySelector('.desc')!.textContent = data.description;

        gsap.fromTo(selector, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.2 });
        gsap.fromTo(`${selector} .text`, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.3 });
        gsap.fromTo(`${selector} .title-1`, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 });
        gsap.fromTo(`${selector} .title-2`, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.5 });
        gsap.fromTo(`${selector} .desc`, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.6 });
        gsap.fromTo(`${selector} .cta`, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.7 });
    };

    const handleStep = () => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        setActiveOrder(prev => {
            const newOrder = [...prev];
            const moved = newOrder.shift();
            if (moved !== undefined) newOrder.push(moved);

            const [active, ...rest] = newOrder;
            const prv = newOrder[newOrder.length - 1];

            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;
            const calcOffsetLeft = winWidth - 830 > 0 ? winWidth - 830 : winWidth * 0.1;
            const calcOffsetTop = winHeight - 430 > 0 ? winHeight - 430 : winHeight * 0.5;

            setDetailsEven(d => !d);
            const activeDetailsSelector = !detailsEven ? "#details-even" : "#details-odd";
            const inactiveDetailsSelector = detailsEven ? "#details-even" : "#details-odd";

            gsap.to(inactiveDetailsSelector, { opacity: 0, duration: 0.5 });
            updateDetails(activeDetailsSelector, active);

            gsap.set(cardsRef.current[active], { zIndex: 20 });
            gsap.set(cardsRef.current[prv], { zIndex: 10 });

            gsap.to(cardsRef.current[prv], { scale: 1.2, duration: 1, ease });

            gsap.to(cardsRef.current[active], {
                x: 0,
                y: 0,
                width: winWidth,
                height: winHeight,
                borderRadius: 0,
                duration: 1.2,
                ease,
                onComplete: () => {
                    isAnimating.current = false;
                    gsap.set(cardsRef.current[prv], {
                        scale: 1,
                        x: calcOffsetLeft + (rest.length - 1) * (cardWidth + gap),
                        y: calcOffsetTop,
                        width: cardWidth,
                        height: cardHeight,
                        borderRadius: 10,
                        zIndex: 30
                    });
                    gsap.set(cardContentsRef.current[prv], {
                        x: calcOffsetLeft + (rest.length - 1) * (cardWidth + gap),
                        y: calcOffsetTop + cardHeight - 100,
                        opacity: 1,
                        zIndex: 40
                    });
                }
            });

            gsap.to(cardContentsRef.current[active], {
                y: calcOffsetTop + cardHeight - 10,
                opacity: 0,
                duration: 0.5
            });

            rest.forEach((i, index) => {
                if (i === prv) return;
                gsap.to(cardsRef.current[i], {
                    x: calcOffsetLeft + index * (cardWidth + gap),
                    duration: 0.8,
                    ease: "power2.out",
                    delay: 0.1
                });
                gsap.to(cardContentsRef.current[i], {
                    x: calcOffsetLeft + index * (cardWidth + gap),
                    duration: 0.8,
                    ease: "power2.out",
                    delay: 0.1
                });
            });

            gsap.to(slideItemsRef.current[active], { x: 0, duration: 0.5 });
            gsap.to(slideItemsRef.current[prv], { x: rest.length * numberSize, duration: 0 });

            gsap.to(".tc-progress-sub-foreground", {
                width: 500 * (1 / DATA.length) * (active + 1),
                duration: 0.5
            });

            return newOrder;
        });
    };

    const handleDiscoverClick = () => {
        if (onDiscoverClick) {
            onDiscoverClick();
        }
    };

    return (
        <div className="timed-cards-container" ref={containerRef}>


            <div className="tc-cover"></div>

            {DATA.map((item, i) => (
                <div
                    key={i}
                    className="tc-card"
                    ref={el => cardsRef.current[i] = el}
                    style={{ backgroundImage: `url(${item.image})` }}
                ></div>
            ))}

            {DATA.map((item, i) => (
                <div
                    key={i}
                    className="tc-card-content"
                    ref={el => cardContentsRef.current[i] = el}
                >
                    <div className="tc-content-start"></div>
                    <div className="tc-content-place">{item.place}</div>
                    <div className="tc-content-title-1">{item.title}</div>
                    <div className="tc-content-title-2">{item.title2}</div>
                </div>
            ))}

            {/* Details Sections */}
            <div className="tc-details" id="details-even">
                <div className="tc-place-box"><div className="text text-white"></div></div>
                <div className="tc-title-box-1"><div className="tc-title-1 text-white"></div></div>
                <div className="tc-title-box-2"><div className="tc-title-2 text-white"></div></div>
                <div className="tc-desc text-white/80 text-sm md:text-base"></div>
                <div className="tc-cta">
                    <button className="tc-bookmark"><Bookmark /></button>
                    <button className="tc-discover" onClick={handleDiscoverClick}>Discover More</button>
                </div>
            </div>

            <div className="tc-details" id="details-odd" style={{ opacity: 0 }}>
                <div className="tc-place-box"><div className="text text-white"></div></div>
                <div className="tc-title-box-1"><div className="tc-title-1 text-white"></div></div>
                <div className="tc-title-box-2"><div className="tc-title-2 text-white"></div></div>
                <div className="tc-desc text-white/80 text-sm md:text-base"></div>
                <div className="tc-cta">
                    <button className="tc-bookmark"><Bookmark /></button>
                    <button className="tc-discover" onClick={handleDiscoverClick}>Discover More</button>
                </div>
            </div>

            <div className="tc-pagination">
                <div className="tc-arrow tc-arrow-left" onClick={() => { /* prev logic */ }}>
                    <ArrowLeft />
                </div>
                <div className="tc-arrow tc-arrow-right" onClick={handleStep}>
                    <ArrowRight />
                </div>
                <div className="tc-progress-sub-container">
                    <div className="tc-progress-sub-background">
                        <div className="tc-progress-sub-foreground"></div>
                    </div>
                </div>
                <div className="tc-slide-numbers">
                    {DATA.map((_, i) => (
                        <div
                            key={i}
                            className="tc-slide-item"
                            ref={el => slideItemsRef.current[i] = el}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimedCardsOpening;
