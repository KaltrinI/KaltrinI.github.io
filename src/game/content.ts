export interface Skill {
  name: string;
  percent: number;
}

export interface Project {
  title: string;
  description: string;
  roles: string[];
  technologies: string[];
}

export const skills: Skill[] = [
  { name: 'Mobile Development', percent: 90 },
  { name: 'Frontend Development', percent: 90 },
  { name: 'Backend Development', percent: 95 },
  { name: 'Development & Operations', percent: 88 },
  { name: 'Quality Assurance', percent: 90 },
  { name: 'Analytics', percent: 90 },
];

export const about = {
  intro:
    'I’m a versatile software engineer with a passion for continuous learning and self-development. With experience across various tech stacks, I thrive in roles spanning mobile engineering, web development, and DevOps. I’m a fast learner, a critical thinker, and a strong team player, always eager to contribute at every stage of the project lifecycle.',
  experience:
    "I am an experienced software engineer with 8 years in the industry and a Bachelor's degree in Computer Science and Engineering. Throughout my career, I've contributed to projects in secure digital financial services, innovative identity solutions, streamlined insurance processes, effective content management, robust access control, efficient workforce scheduling, optimized ride-sharing platforms, AI-driven initiatives that convert publications into accessible content, and web forms platforms focused on accessibility. Working primarily with C# and JavaScript/TypeScript, I develop intuitive, reliable solutions that make technology more inclusive and user-centric.",
  hobbies:
    'Outside of coding, I enjoy exploring new languages—both programming and spoken—as well as diving into the world of mathematics.',
  motto: 'Jack of all trades, master of one',
  mottoNote: 'because I believe in mastering the craft while staying curious and adaptable.',
};

export const projects: Record<'rideshare' | 'parking' | 'wallet' | 'vidsbeats', Project> = {
  rideshare: {
    title: 'Ride Sharing App',
    description:
      'Xamarin Forms app that promotes an eco-friendly environment by offering carpooling. Users can browse available offers or submit their own, reducing carbon emissions and saving on travel costs.',
    roles: ['Solution architecture', 'Implementation', 'Development'],
    technologies: ['.NET Core', 'Xamarin Forms'],
  },
  parking: {
    title: 'Parking System with Automated Image Recognition',
    description:
      'Developed part of a generic task execution engine that processes events via API and triggers predefined tasks automatically.',
    roles: ['Development', 'System Architecture', 'Implementation'],
    technologies: ['.NET Core', 'ASP.NET MVC', 'Angular', 'C#', 'Redis', 'Docker'],
  },
  wallet: {
    title: 'Trinsic Wallet',
    description:
      'A mobile solution for self-sovereign identity that stores verifiable digital credentials in a wallet using blockchain-based open standards.',
    roles: ['Implementation', 'Development'],
    technologies: ['Xamarin Forms', 'C#'],
  },
  vidsbeats: {
    title: 'VIDSBEATS',
    description:
      'A web application that allows users to create custom music videos from pre-defined templates, with rendering and cloud-based video delivery.',
    roles: ['Solution architecture', 'Implementation'],
    technologies: ['.NET Core', 'React', 'Mongo'],
  },
};

export const links = {
  linkedin: 'https://linkedin.com/in/kaltrin-ismaili/',
  github: 'https://github.com/KaltrinI',
  blog: 'https://blog.kaltrini.com',
  // URL of the deployed Google Apps Script web app (see google-apps-script/contact-form.gs).
  // It's safe to commit: the script verifies reCAPTCHA server-side with a secret that never leaves Google.
  contactEndpoint: 'https://script.google.com/macros/s/AKfycby9kDEw3IC1VOHB1GGp5GmHyofznKXvZEmvewk81oXgKYFW3NRaF9I7FBzR6h1rMYZ5lg/exec',
};
