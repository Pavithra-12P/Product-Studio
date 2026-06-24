export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: "free" | "pro" | "enterprise";
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "draft" | "generating" | "completed" | "archived";
  createdAt: string;
  updatedAt: string;
  blueprint?: Blueprint;
  input?: ProjectInput;
  folder?: string;
  tags?: string[];
  version: number;
}

export interface ProjectInput {
  productName: string;
  description: string;
  targetAudience: string;
  coreFeatures: string[];
  constraints: string[];
  techPreferences?: string;
  timeline?: string;
}

export interface Blueprint {
  id: string;
  projectId: string;
  overview: BlueprintOverview;
  requirements: Requirement[];
  userStories: UserStory[];
  database: DatabaseSchema;
  api: ApiEndpoint[];
  architecture: ArchitectureLayer[];
  roadmap: RoadmapPhase[];
  generatedAt: string;
}

export interface BlueprintOverview {
  summary: string;
  vision: string;
  objectives: string[];
  targetUsers: string[];
  techStack: TechStackItem[];
  estimatedTimeline: string;
  complexity: "low" | "medium" | "high" | "enterprise";
}

export interface Requirement {
  id: string;
  category: "functional" | "non-functional" | "technical" | "business";
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "proposed" | "approved" | "deferred";
}

export interface UserStory {
  id: string;
  epic: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  priority: "critical" | "high" | "medium" | "low";
  points: number;
}

export interface DatabaseSchema {
  tables: DatabaseTable[];
  relationships: DatabaseRelationship[];
}

export interface DatabaseTable {
  name: string;
  description: string;
  columns: DatabaseColumn[];
}

export interface DatabaseColumn {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
  foreignKey?: string;
  description: string;
}

export interface DatabaseRelationship {
  from: string;
  to: string;
  type: "one-to-one" | "one-to-many" | "many-to-many";
  through?: string;
}

export interface ApiEndpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  summary: string;
  description: string;
  requestBody?: string;
  responseBody?: string;
  auth: boolean;
  category: string;
}

export interface ArchitectureLayer {
  name: string;
  description: string;
  components: ArchitectureComponent[];
}

export interface ArchitectureComponent {
  name: string;
  description: string;
  technology: string;
  connections: string[];
}

export interface RoadmapPhase {
  id: string;
  name: string;
  duration: string;
  description: string;
  milestones: Milestone[];
  deliverables: string[];
}

export interface Milestone {
  title: string;
  description: string;
  tasks: string[];
  estimatedDays: number;
}

export interface TechStackItem {
  category: string;
  name: string;
  reason: string;
}

export interface GenerationStage {
  id: string;
  name: string;
  description: string;
  status: "pending" | "active" | "completed" | "error";
  progress: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}
