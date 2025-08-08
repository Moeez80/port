import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { useEffect } from "react";

interface ThumbnailGridProps {
  limit?: number;
}

export default function ThumbnailGrid({ limit }: ThumbnailGridProps) {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

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
  }, [projects]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: limit || 6 }).map((_, index) => (
          <div key={index} className="bg-secondary rounded-xl overflow-hidden shadow-lg aspect-video animate-pulse">
            <div className="w-full h-full bg-muted"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-exclamation-triangle text-destructive text-xl"></i>
        </div>
        <p className="text-muted-foreground">Failed to load thumbnails. Please try again later.</p>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-image text-muted-foreground text-xl"></i>
        </div>
        <p className="text-muted-foreground">No thumbnails available yet.</p>
      </div>
    );
  }

  const displayProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayProjects.map((project, index) => (
        <div 
          key={project.id} 
          className="thumbnail-hover scroll-reveal stagger-animation bg-secondary rounded-xl overflow-hidden shadow-lg aspect-video group cursor-pointer relative"
          style={{ 
            animationDelay: `${index * 0.15}s`,
            opacity: 0
          }}
        >
          <img 
            src={project.imageUrl} 
            alt={project.description || "Professional thumbnail design by Moeez Imran"} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div className="text-white">
              <div className="flex items-center space-x-2">
                <i className="fas fa-eye text-accent"></i>
                <span className="text-sm font-medium">View Design</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
