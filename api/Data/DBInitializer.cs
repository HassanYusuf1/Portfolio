using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Portfolio.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Portfolio.API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(PortfolioDbContext context)
        {
            // Only seed if the Projects table is empty
            if (!context.Projects.Any())
            {
                var projects = new List<Project>
                {
                    new Project
                    {
                        Title = "Portfolio Website",
                        Description = "My personal portfolio website built with Next.js and ASP.NET Core",
                        ImageUrl = "/images/projects/portfolio.jpg",
                        GitHubUrl = "https://github.com/hassanyusuf1/portfolio",
                        LiveDemoUrl = "https://hassanyusuf.com",
                        CreatedDate = DateTime.Now,
                        Technologies = new List<string> { "Next.js", "ASP.NET Core", "TypeScript", "Tailwind CSS" }
                    },
                    new Project
                    {
                        Title = "E-commerce Platform",
                        Description = "Full stack e-commerce platform with product management and user authentication",
                        ImageUrl = "/images/projects/ecommerce.jpg",
                        GitHubUrl = "https://github.com/hassanyusuf1/ecommerce",
                        LiveDemoUrl = "https://demo.hassanyusuf.com",
                        CreatedDate = DateTime.Now.AddMonths(-2),
                        Technologies = new List<string> { "React", "Node.js", "Express", "MongoDB" }
                    },
                    new Project
                    {
                        Title = "Fitness Tracking App",
                        Description = "Mobile app for tracking workouts and nutrition with detailed analytics",
                        ImageUrl = "/images/projects/fitness.jpg",
                        GitHubUrl = "https://github.com/hassanyusuf1/fitness-app",
                        LiveDemoUrl = "https://fitness.hassanyusuf.com",
                        CreatedDate = DateTime.Now.AddMonths(-4),
                        Technologies = new List<string> { "React Native", "Firebase", "Redux", "Express.js" }
                    }
                };

                context.Projects.AddRange(projects);
                context.SaveChanges();
            }
        }
    }
}