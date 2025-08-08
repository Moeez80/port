import ContactForm from "@/components/ContactForm";
import { useEffect } from "react";

export default function Contact() {
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to boost your content with eye-catching thumbnails? Get in touch and let's discuss your project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="scroll-reveal">
            <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
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
    </div>
  );
}
