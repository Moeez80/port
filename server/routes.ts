import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertContactMessageSchema, insertAboutContentSchema, adminLoginSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files
  app.use('/uploads', express.static(uploadDir));

  // Admin authentication
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { email, password } = adminLoginSchema.parse(req.body);
      
      // Check credentials
      if (email === 'moeezdesignadmin@gmail.com' && password === 'Moeez@admin786..') {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: 'Invalid request data' });
    }
  });

  // Projects routes
  app.get('/api/projects', async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ message: 'Failed to fetch projects' });
    }
  });

  app.post('/api/projects', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' });
      }

      const imageUrl = `/uploads/${req.file.filename}`;
      const projectData = {
        title: req.body.title || null,
        description: req.body.description || null,
        imageUrl,
        imagePublicId: req.file.filename,
        isActive: true,
      };

      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ message: 'Failed to create project' });
    }
  });

  app.delete('/api/projects/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteProject(id);
      
      if (success) {
        res.json({ success: true, message: 'Project deleted successfully' });
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ message: 'Failed to delete project' });
    }
  });

  // Contact messages routes
  app.get('/api/contact-messages', async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      res.status(500).json({ message: 'Failed to fetch contact messages' });
    }
  });

  app.post('/api/contact-messages', async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      console.error('Error creating contact message:', error);
      res.status(500).json({ message: 'Failed to send message' });
    }
  });

  app.patch('/api/contact-messages/:id/read', async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.markMessageAsRead(id);
      
      if (success) {
        res.json({ success: true, message: 'Message marked as read' });
      } else {
        res.status(404).json({ message: 'Message not found' });
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
      res.status(500).json({ message: 'Failed to mark message as read' });
    }
  });

  app.delete('/api/contact-messages/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteContactMessage(id);
      
      if (success) {
        res.json({ success: true, message: 'Message deleted successfully' });
      } else {
        res.status(404).json({ message: 'Message not found' });
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      res.status(500).json({ message: 'Failed to delete message' });
    }
  });

  // About content routes
  app.get('/api/about-content', async (req, res) => {
    try {
      const aboutContent = await storage.getAboutContent();
      res.json(aboutContent);
    } catch (error) {
      console.error('Error fetching about content:', error);
      res.status(500).json({ message: 'Failed to fetch about content' });
    }
  });

  app.post('/api/about-content', async (req, res) => {
    try {
      const aboutData = insertAboutContentSchema.parse(req.body);
      const aboutContent = await storage.updateAboutContent(aboutData);
      res.status(200).json(aboutContent);
    } catch (error) {
      console.error('Error updating about content:', error);
      res.status(500).json({ message: 'Failed to update about content' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
