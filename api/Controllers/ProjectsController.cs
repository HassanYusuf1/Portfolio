using Microsoft.AspNetCore.Mvc;
using Portfolio.API.DTOs;
using Portfolio.API.Interfaces;
using Portfolio.API.Models;

namespace Portfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;
        private readonly ILogger<ProjectsController> _logger;

        public ProjectsController(IProjectRepository projectRepository, ILogger<ProjectsController> logger)
        {
            _projectRepository = projectRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDTO>>> GetProjects()
        {
            try
            {
                var projects = await _projectRepository.GetAllAsync();
                var projectDtos = projects.Select(p => new ProjectDTO
                {
                    Id = p.Id,
                    Title = p.Title,
                    Description = p.Description,
                    ImageUrl = p.ImageUrl,
                    GitHubUrl = p.GitHubUrl,
                    LiveDemoUrl = p.LiveDemoUrl,
                    CreatedDate = p.CreatedDate,
                    Technologies = p.Technologies
                });

                return Ok(projectDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all projects");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDTO>> GetProject(int id)
        {
            try
            {
                var project = await _projectRepository.GetByIdAsync(id);

                if (project == null)
                {
                    return NotFound();
                }

                var projectDto = new ProjectDTO
                {
                    Id = project.Id,
                    Title = project.Title,
                    Description = project.Description,
                    ImageUrl = project.ImageUrl,
                    GitHubUrl = project.GitHubUrl,
                    LiveDemoUrl = project.LiveDemoUrl,
                    CreatedDate = project.CreatedDate,
                    Technologies = project.Technologies
                };

                return Ok(projectDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting project with ID {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<ProjectDTO>> CreateProject(ProjectDTO projectDto)
        {
            try
            {
                var project = new Project
                {
                    Title = projectDto.Title,
                    Description = projectDto.Description,
                    ImageUrl = projectDto.ImageUrl,
                    GitHubUrl = projectDto.GitHubUrl,
                    LiveDemoUrl = projectDto.LiveDemoUrl,
                    CreatedDate = DateTime.UtcNow,
                    Technologies = projectDto.Technologies
                };

                await _projectRepository.AddAsync(project);

                projectDto.Id = project.Id;
                projectDto.CreatedDate = project.CreatedDate;

                return CreatedAtAction(nameof(GetProject), new { id = project.Id }, projectDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating new project");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, ProjectDTO projectDto)
        {
            if (id != projectDto.Id)
            {
                return BadRequest();
            }

            try
            {
                var existingProject = await _projectRepository.GetByIdAsync(id);

                if (existingProject == null)
                {
                    return NotFound();
                }

                existingProject.Title = projectDto.Title;
                existingProject.Description = projectDto.Description;
                existingProject.ImageUrl = projectDto.ImageUrl;
                existingProject.GitHubUrl = projectDto.GitHubUrl;
                existingProject.LiveDemoUrl = projectDto.LiveDemoUrl;
                existingProject.Technologies = projectDto.Technologies;

                await _projectRepository.UpdateAsync(existingProject);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating project with ID {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            try
            {
                var project = await _projectRepository.GetByIdAsync(id);
                
                if (project == null)
                {
                    return NotFound();
                }

                await _projectRepository.DeleteAsync(id);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting project with ID {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}