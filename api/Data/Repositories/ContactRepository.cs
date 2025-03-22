using Portfolio.API.Interfaces;
using Portfolio.API.Models;

namespace Portfolio.API.Data.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private readonly PortfolioDbContext _context;

        public ContactRepository(PortfolioDbContext context)
        {
            _context = context;
        }

        public async Task<ContactMessage> AddAsync(ContactMessage message)
        {
            message.ReceivedDate = DateTime.UtcNow;
            _context.ContactMessages.Add(message);
            await _context.SaveChangesAsync();
            return message;
        }
    }
}