import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import Features from "@/app/components/Features";

export default function Home() {
	return (
		<div className="min-h-screen bg-background text-primary flex flex-col">
			<main className="flex-1 flex flex-col w-full">
				
				<div className="mb-8 sm:mb-0">
					<Hero />
				</div>
				<div className="py-8 sm:py-12 md:py-16 lg:py-20 mt-0 sm:mt-8 md:mt-12 lg:mt-16">
					<Features />
				</div>
			</main>
			<div className="mt-8 md:mt-12 lg:mt-16">
				<Footer />
			</div>
		</div>
	);
}
