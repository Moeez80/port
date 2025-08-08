import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Project, ContactMessage, AboutContent, type InsertProject, type InsertAboutContent } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminPanelProps {
  onLogout: () => void;
}

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [aboutEditMode, setAboutEditMode] = useState(false);

  const form = useForm<{ description: string }>({
    defaultValues: {
      description: "",
    },
  });

  const aboutForm = useForm<InsertAboutContent>({
    defaultValues: {
      title: "",
      description: "",
      experience: "",
      expertise: "",
      thumbnailsCreated: "",
      happyClients: "",
    },
  });

  // Fetch projects
  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // Fetch contact messages
  const { data: messages, isLoading: messagesLoading } = useQuery<ContactMessage[]>({
    queryKey: ['/api/contact-messages'],
  });

  // Fetch about content
  const { data: aboutContent, isLoading: aboutLoading } = useQuery<AboutContent | null>({
    queryKey: ['/api/about-content'],
  });

  // Upload project mutation
  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return fetch('/api/projects', {
        method: 'POST',
        body: formData,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Thumbnail uploaded successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      form.reset();
      setSelectedFile(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upload thumbnail. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete project mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/projects/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Thumbnail deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete thumbnail.",
        variant: "destructive",
      });
    },
  });

  // Mark message as read mutation
  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('PATCH', `/api/contact-messages/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-messages'] });
    },
  });

  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/contact-messages/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Message deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/contact-messages'] });
    },
  });

  // Update about content mutation
  const updateAboutMutation = useMutation({
    mutationFn: async (data: InsertAboutContent) => {
      return apiRequest('POST', '/api/about-content', data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "About content updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/about-content'] });
      setAboutEditMode(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update about content.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: { description: string }) => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('description', data.description);

    uploadMutation.mutate(formData);
  };

  const onAboutSubmit = (data: InsertAboutContent) => {
    updateAboutMutation.mutate(data);
  };

  // Load about content into form when data is available
  useEffect(() => {
    if (aboutContent && !aboutEditMode) {
      aboutForm.reset({
        title: aboutContent.title,
        description: aboutContent.description,
        experience: aboutContent.experience,
        expertise: aboutContent.expertise,
        thumbnailsCreated: aboutContent.thumbnailsCreated,
        happyClients: aboutContent.happyClients,
      });
    }
  }, [aboutContent, aboutEditMode, aboutForm]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary border-b border-border px-4 md:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-accent">Admin Panel</h1>
          <Button 
            onClick={onLogout}
            variant="destructive"
            className="bg-destructive hover:bg-destructive/80 w-full sm:w-auto"
            size="sm"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>Logout
          </Button>
        </div>
      </header>

      <div className="p-4 md:p-6">
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1">
            <TabsTrigger value="upload" className="text-xs sm:text-sm px-2 py-2">Upload</TabsTrigger>
            <TabsTrigger value="thumbnails" className="text-xs sm:text-sm px-2 py-2">Thumbnails</TabsTrigger>
            <TabsTrigger value="messages" className="text-xs sm:text-sm px-2 py-2">Messages</TabsTrigger>
            <TabsTrigger value="about" className="text-xs sm:text-sm px-2 py-2">About Us</TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Add New Thumbnail</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Thumbnail Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent file:text-accent-foreground hover:file:bg-accent/80"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Description (Optional)
                    </label>
                    <Input
                      {...form.register("description")}
                      placeholder="Brief description of the thumbnail"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={uploadMutation.isPending}
                    className="bg-success hover:bg-success/80 text-success-foreground"
                  >
                    {uploadMutation.isPending ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-upload mr-2"></i>Upload Thumbnail
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Thumbnails Tab */}
          <TabsContent value="thumbnails">
            <Card>
              <CardHeader>
                <CardTitle>Current Thumbnails</CardTitle>
              </CardHeader>
              <CardContent>
                {projectsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="bg-background rounded-lg p-4 border border-border animate-pulse">
                        <div className="aspect-video bg-muted rounded mb-3"></div>
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-8 bg-muted rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : projects && projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                      <div key={project.id} className="bg-background rounded-lg p-4 border border-border">
                        <div className="aspect-video bg-muted rounded mb-3 overflow-hidden">
                          <img 
                            src={project.imageUrl} 
                            alt={project.description || "Thumbnail"} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground truncate">
                            {project.description || "Untitled Thumbnail"}
                          </span>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteMutation.mutate(project.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-image text-muted-foreground text-xl"></i>
                    </div>
                    <p className="text-muted-foreground">No thumbnails uploaded yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="bg-background rounded-lg p-4 border border-border animate-pulse">
                        <div className="h-4 bg-muted rounded mb-2 w-1/3"></div>
                        <div className="h-3 bg-muted rounded mb-2 w-1/4"></div>
                        <div className="h-12 bg-muted rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : messages && messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`bg-background rounded-lg p-4 border border-border ${
                          !message.isRead ? 'border-accent' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{message.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">
                              {new Date(message.createdAt).toLocaleDateString()}
                            </span>
                            {!message.isRead && (
                              <span className="w-2 h-2 bg-accent rounded-full"></span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{message.email}</p>
                        <p className="text-sm text-muted-foreground mb-2">Project: {message.projectType}</p>
                        <p className="text-sm mb-4">{message.message}</p>
                        <div className="flex space-x-2">
                          {!message.isRead && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markReadMutation.mutate(message.id)}
                              disabled={markReadMutation.isPending}
                            >
                              <i className="fas fa-check mr-1"></i>Mark as Read
                            </Button>
                          )}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteMessageMutation.mutate(message.id)}
                            disabled={deleteMessageMutation.isPending}
                          >
                            <i className="fas fa-trash mr-1"></i>Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-envelope text-muted-foreground text-xl"></i>
                    </div>
                    <p className="text-muted-foreground">No messages yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Us Tab */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  About Us Content
                  {!aboutEditMode && (
                    <Button
                      onClick={() => setAboutEditMode(true)}
                      variant="outline"
                      size="sm"
                    >
                      <i className="fas fa-edit mr-2"></i>Edit
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {aboutLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="space-y-2">
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-8 bg-muted rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : aboutEditMode ? (
                  <form onSubmit={aboutForm.handleSubmit(onAboutSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Title
                        </label>
                        <Input
                          {...aboutForm.register("title")}
                          placeholder="About section title"
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Experience
                        </label>
                        <Input
                          {...aboutForm.register("experience")}
                          placeholder="Years of experience"
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Description
                      </label>
                      <Textarea
                        {...aboutForm.register("description")}
                        placeholder="About description"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white min-h-[100px] resize-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Expertise
                      </label>
                      <Textarea
                        {...aboutForm.register("expertise")}
                        placeholder="Areas of expertise (comma separated)"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white min-h-[80px] resize-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Thumbnails Created
                        </label>
                        <Input
                          {...aboutForm.register("thumbnailsCreated")}
                          placeholder="Number of thumbnails created"
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Happy Clients
                        </label>
                        <Input
                          {...aboutForm.register("happyClients")}
                          placeholder="Number of happy clients"
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        type="submit" 
                        disabled={updateAboutMutation.isPending}
                        className="bg-success hover:bg-success/80 text-success-foreground flex-1 sm:flex-none"
                      >
                        {updateAboutMutation.isPending ? (
                          <>
                            <i className="fas fa-spinner fa-spin mr-2"></i>
                            Updating...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-save mr-2"></i>Save Changes
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setAboutEditMode(false)}
                        className="flex-1 sm:flex-none"
                      >
                        <i className="fas fa-times mr-2"></i>Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    {aboutContent ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Title</h3>
                            <p className="text-muted-foreground">{aboutContent.title}</p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Experience</h3>
                            <p className="text-muted-foreground">{aboutContent.experience}</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-2">Description</h3>
                          <p className="text-muted-foreground">{aboutContent.description}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-2">Expertise</h3>
                          <p className="text-muted-foreground">{aboutContent.expertise}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Thumbnails Created</h3>
                            <p className="text-muted-foreground">{aboutContent.thumbnailsCreated}</p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Happy Clients</h3>
                            <p className="text-muted-foreground">{aboutContent.happyClients}</p>
                          </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          Last updated: {new Date(aboutContent.updatedAt).toLocaleDateString()}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="fas fa-info-circle text-muted-foreground text-xl"></i>
                        </div>
                        <p className="text-muted-foreground mb-4">No about content found.</p>
                        <Button
                          onClick={() => setAboutEditMode(true)}
                          className="bg-accent hover:bg-accent/80 text-accent-foreground"
                        >
                          <i className="fas fa-plus mr-2"></i>Create About Content
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
