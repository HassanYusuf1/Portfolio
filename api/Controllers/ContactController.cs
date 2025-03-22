using Microsoft.AspNetCore.Mvc;
using Portfolio.API.DTOs;
using Portfolio.API.Interfaces;
using Portfolio.API.Models;

namespace Portfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactRepository _contactRepository;
        private readonly ILogger<ContactController> _logger;

        public ContactController(IContactRepository contactRepository, ILogger<ContactController> logger)
        {
            _contactRepository = contactRepository;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage(ContactMessageDTO messageDto)
        {
            try
            {
                var message = new ContactMessage
                {
                    Name = messageDto.Name,
                    Email = messageDto.Email,
                    Message = messageDto.Message,
                    ReceivedDate = DateTime.UtcNow
                };

                await _contactRepository.AddAsync(message);

                return Ok(new { success = true, message = "Thank you for your message. We'll get back to you soon." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving contact message");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}