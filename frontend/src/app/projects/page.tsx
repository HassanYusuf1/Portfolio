import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: 'Projects | Hassan Yusuf Portfolio',
  description: 'Browse through my backend development projects, including ASP.NET Core applications, APIs, and full-stack web applications.'
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}