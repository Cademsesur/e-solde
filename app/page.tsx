import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import Features from "@/app/components/Features";

export default function Home() {
	return (
		<div className="min-h-screen bg-background text-primary flex flex-col">
			<main className="flex-1 flex flex-col w-full">
				
				<div className="pb-8 md:pb-12 lg:pb-16">
					<Hero />
				</div>
				<div className="py-8 md:py-12 lg:py-16">
					<Features />
				</div>
			</main>
			<div className="mt-8 md:mt-12 lg:mt-16">
				<Footer />
			</div>
		</div>
	);
}
