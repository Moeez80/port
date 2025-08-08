import { 
  projects, 
  contactMessages,
  aboutContent,
  type Project, 
  type InsertProject,
  type ContactMessage,
  type InsertContactMessage,
  type AboutContent,
  type InsertAboutContent
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Project methods
  getAllProjects(): Promise<Project[]>;
  getProjectById(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  deleteProject(id: string): Promise<boolean>;
  
  // Contact message methods
  getAllContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: string): Promise<boolean>;
  deleteContactMessage(id: string): Promise<boolean>;
  
  // About content methods
  getAboutContent(): Promise<AboutContent | null>;
  updateAboutContent(content: InsertAboutContent): Promise<AboutContent>;
}

export class DatabaseStorage implements IStorage {
  async getAllProjects(): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.isActive, true))
      .orderBy(desc(projects.createdAt));
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));
    return project || undefined;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db
      .update(projects)
      .set({ isActive: false })
      .where(eq(projects.id, id))
      .returning();
    return result.length > 0;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async markMessageAsRead(id: string): Promise<boolean> {
    const result = await db
      .update(contactMessages)
      .set({ isRead: true })
      .where(eq(contactMessages.id, id))
      .returning();
    return result.length > 0;
  }

  async deleteContactMessage(id: string): Promise<boolean> {
    const result = await db
      .delete(contactMessages)
      .where(eq(contactMessages.id, id))
      .returning();
    return result.length > 0;
  }

  async getAboutContent(): Promise<AboutContent | null> {
    const [content] = await db
      .select()
      .from(aboutContent)
      .limit(1);
    return content || null;
  }

  async updateAboutContent(insertContent: InsertAboutContent): Promise<AboutContent> {
    // Check if content exists
    const existing = await this.getAboutContent();
    
    if (existing) {
      // Update existing content
      const [updated] = await db
        .update(aboutContent)
        .set({ ...insertContent, updatedAt: new Date() })
        .where(eq(aboutContent.id, existing.id))
        .returning();
      return updated;
    } else {
      // Create new content
      const [created] = await db
        .insert(aboutContent)
        .values(insertContent)
        .returning();
      return created;
    }
  }
}

export const storage = new DatabaseStorage();
