using Portfolio.API.Models;

namespace Portfolio.API.Interfaces
{
    public interface IContactRepository
    {
        Task<ContactMessage> AddAsync(ContactMessage message);
    }
}