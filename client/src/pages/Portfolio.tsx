import ThumbnailGrid from "@/components/ThumbnailGrid";
import { useEffect } from "react";

export default function Portfolio() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Portfolio</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse through my complete collection of professional thumbnail designs that have helped content creators achieve higher engagement and click-through rates.
          </p>
        </div>

        <ThumbnailGrid />
      </div>
    </div>
  );
}
