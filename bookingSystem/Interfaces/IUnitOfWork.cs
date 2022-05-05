using System.Threading.Tasks;

namespace bookingSystem.Interfaces
{
    public interface IUnitOfWork
    {
         ICityRepository CityRepository{get;}
        Task<bool> SaveAsync();
    
    }
}