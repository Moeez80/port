import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function ContactForm() {
  const { toast } = useToast();
  
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return apiRequest('POST', '/api/contact-messages', data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message! I'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-muted-foreground">Name</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-muted-foreground">Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  {...field} 
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-muted-foreground">Project Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="YouTube Thumbnails">YouTube Thumbnails</SelectItem>
                  <SelectItem value="Bulk Package (10+ thumbnails)">Bulk Package (10+ thumbnails)</SelectItem>
                  <SelectItem value="Brand Guidelines">Brand Guidelines</SelectItem>
                  <SelectItem value="Custom Request">Custom Request</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-muted-foreground">Message</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  rows={4}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={mutation.isPending}
          className="w-full bg-accent hover:bg-accent/80 text-accent-foreground px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
        >
          {mutation.isPending ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  );
}
