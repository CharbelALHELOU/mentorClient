export interface User {
  id: string;
  role: number;
  name: string;
  email: string;
  password: string;
  foundMentors: number;
  mentors?: [
    {
      mentorId?: string;
      mentorName?: string;
    }
  ];
}
