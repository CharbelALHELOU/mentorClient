export interface User {
  _id: string;
  role: number;
  name: string;
  email: string;
  password: string;
  resumeUrl: string;
  foundMentors: number;
  mentors?: string[];
}
