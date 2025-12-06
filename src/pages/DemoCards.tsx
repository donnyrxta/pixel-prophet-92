import TimedCardsOpening from '../components/TimedCardsOpening';
import SEOHead from '../components/SEOHead';

export default function DemoCards() {
    return (
        <>
            <SEOHead
                title="Animation Demo | Soho Connect"
                description="Demo of the high-performance GSAP timed cards animation."
            />
            <main className="w-full h-screen overflow-hidden bg-black text-white">
                <TimedCardsOpening />
            </main>
        </>
    );
}
