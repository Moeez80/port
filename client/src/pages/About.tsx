import { useEffect } from "react";

export default function About() {
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
    <div className="py-20 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto text-center">
        <div className="scroll-reveal">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">About Moeez Imran</h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="../../../uploads/logo.jpg" 
                alt="Professional headshot of creative designer Moeez Imran" 
                className="rounded-2xl w-full max-w-sm mx-auto shadow-2xl"
              />
            </div>
            <div className="order-1 md:order-2 text-left">
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I'm a dedicated thumbnail designer with over 3 years of experience creating compelling visual content that drives engagement and boosts click-through rates for content creators worldwide.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                My expertise lies in understanding viewer psychology and translating that into visually striking thumbnails that stand out in crowded feeds and convert browsers into viewers.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">20+</div>
                  <div className="text-muted-foreground">Thumbnails Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">0+</div>
                  <div className="text-muted-foreground">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20 scroll-reveal">
          <h2 className="text-3xl font-bold mb-8">My Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-palette text-accent text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Visual Design</h3>
              <p className="text-muted-foreground">Creating eye-catching designs that capture attention and communicate your content's value instantly.</p>
            </div>
            
            <div className="bg-card p-6 rounded-xl">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-chart-line text-accent text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Click Optimization</h3>
              <p className="text-muted-foreground">Designing thumbnails that drive higher click-through rates using proven psychological principles.</p>
            </div>
            
            <div className="bg-card p-6 rounded-xl">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-bolt text-accent text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-muted-foreground">Quick turnaround times without compromising on quality, keeping your content schedule on track.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
