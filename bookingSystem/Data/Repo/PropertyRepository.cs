using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bookingSystem.Interfaces;
using bookingSystem.Models;
using Claim.Data;
using Microsoft.EntityFrameworkCore;

namespace bookingSystem.Data.Repo
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly AppDBContext dc;

        public PropertyRepository(AppDBContext dc)
        {
            this.dc = dc;
        }
        public void AddProperty(PropertyType property)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteProperty(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<Propperty>> GetPropertiesAsync(int sellRent)
        {
            var properties = await dc.Propperties
            .Include(p => p.PropertyType)
            .Include(p => p.City)
            .Include(p => p.FurnishingType)
            .Where(p => p.SellRent == sellRent)
            .ToListAsync();
            return properties;
        }

        public Task GetPropertiesAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task<Propperty> GetPropertyDetailAsync(int id)
        {

            var properties = await dc.Propperties
            .Include(p => p.PropertyType)
            .Include(p => p.City)
            .Include(p => p.FurnishingType)
            .Where(p => p.Id == id)
            .FirstAsync();
            return properties;

        }
    }
}