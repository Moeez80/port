import { Link } from "wouter";
import ThumbnailGrid from "@/components/ThumbnailGrid";
import ContactForm from "@/components/ContactForm";
import { useEffect } from "react";

export default function Home() {
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
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Creative designer workspace with computer and design tools" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="text-center z-10 px-4 max-w-4xl mx-auto">
          <div className="fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Creative</span>
              <br />
              <span className="text-accent">Thumbnail Designer</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Specializing in eye-catching YouTube thumbnails that boost click-through rates and engage audiences worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portfolio">
                <button className="bg-accent hover:bg-accent/80 text-accent-foreground px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105">
                  View My Work
                </button>
              </Link>
              <a href="#contact" className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-full font-medium transition-all inline-block">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Thumbnails Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Thumbnails</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore my collection of high-converting thumbnail designs created for various content creators and brands.
            </p>
          </div>

          <ThumbnailGrid limit={6} />

          <div className="text-center mt-12">
            <Link href="/portfolio">
              <button className="bg-secondary hover:bg-muted text-white px-8 py-3 rounded-full font-medium transition-all">
                View Full Portfolio
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">About Moeez Imran</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500" 
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
                    <div className="text-3xl font-bold text-accent mb-2">500+</div>
                    <div className="text-muted-foreground">Thumbnails Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">100+</div>
                    <div className="text-muted-foreground">Happy Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-20 scroll-reveal">
            <h3 className="text-3xl font-bold mb-8">My Expertise</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-xl">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <i className="fas fa-palette text-accent text-xl"></i>
                </div>
                <h4 className="text-xl font-semibold mb-3">Visual Design</h4>
                <p className="text-muted-foreground">Creating eye-catching designs that capture attention and communicate your content's value instantly.</p>
              </div>
              
              <div className="bg-card p-6 rounded-xl">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <i className="fas fa-chart-line text-accent text-xl"></i>
                </div>
                <h4 className="text-xl font-semibold mb-3">Click Optimization</h4>
                <p className="text-muted-foreground">Designing thumbnails that drive higher click-through rates using proven psychological principles.</p>
              </div>
              
              <div className="bg-card p-6 rounded-xl">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <i className="fas fa-bolt text-accent text-xl"></i>
                </div>
                <h4 className="text-xl font-semibold mb-3">Fast Delivery</h4>
                <p className="text-muted-foreground">Quick turnaround times without compromising on quality, keeping your content schedule on track.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to boost your content with eye-catching thumbnails? Get in touch and let's discuss your project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="scroll-reveal">
              <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-envelope text-accent"></i>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="text-white">hello@moeezimran.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-clock text-accent"></i>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Response Time</p>
                    <p className="text-white">Within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-dollar-sign text-accent"></i>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Starting Price</p>
                    <p className="text-white">$15 per thumbnail</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-reveal">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
