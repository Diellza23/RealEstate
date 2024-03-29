using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bookingSystem.Interfaces;
using bookingSystem.Models;
using Claim.Data;
using DTO;
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
        public void AddProperty(Propperty property)
        {
            dc.Propperties.Add(property);
        }

        // public void DeleteProperty(int id)
        // {
        //     var property = dc.Propperties.Find(id);
        //     dc.Propperties.Remove(property);
        // }

        public async Task<IEnumerable<Propperty>> GetPropertiesAsync(int sellRent)
        {
            var properties = await dc.Propperties
            .Include(p => p.PropertyType)
            .Include(p => p.City)
            .Include(p => p.FurnishingType)
            .Include(p => p.Photos)
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
            .Include(p => p.Photos)
            .Include(p => p.AppUser)
            .Where(p => p.Id == id)
            .FirstAsync();
            return properties;

        }

        public async Task<Propperty> GetPropertyByIdAsync(int id)
        {

            var properties = await dc.Propperties

            .Include(p => p.Photos)
            .Where(p => p.Id == id)
            .FirstOrDefaultAsync();
            return properties;

        }

        public async Task<IEnumerable<Propperty>> GetProperties()
        {
            var properties = await dc.Propperties
            .Include(p => p.PropertyType)
            .Include(p => p.City)
            .Include(p => p.FurnishingType)
            .Include(p => p.Photos)
            .ToListAsync();
            return properties;
            // return await dc.Propperties.ToListAsync();
        }



        public async Task<Propperty> FindProperty(int id)
        {
            return await dc.Propperties.FindAsync(id);
        }



        public async Task<Propperty> UpdatePropperty(int id, int sellRent, string name, int price, int bhk, int builtArea, bool readyToMove, int carpetArea, string address, string address2, int floorNo, int totalFloors, string mainEntrance, int security, bool gated, int maintenance, DateTime estPossessionOn, string description, string authorId)
        {
            var tempPropperty = dc.Propperties.FirstOrDefault(x => x.Id == id);
            if (tempPropperty.Id > 1)
            {
                tempPropperty.SellRent = sellRent;
                tempPropperty.Name = name;
                // tempPropperty.PropertyTypeId = propertyTypeId;
                // tempPropperty.FurnishingTypeId = furnishingTypeId;
                tempPropperty.Price = price;
                tempPropperty.BHK = bhk;
                tempPropperty.BuiltArea = builtArea;
                // tempPropperty.CityId = cityId;
                tempPropperty.ReadyToMove = readyToMove;
                tempPropperty.CarpetArea = carpetArea;
                tempPropperty.Address = address;
                tempPropperty.Address2 = address2;
                tempPropperty.FloorNo = floorNo;
                tempPropperty.TotalFloors = totalFloors;
                tempPropperty.MainEntrance = mainEntrance;
                tempPropperty.Security = security;
                tempPropperty.Gated = gated;
                tempPropperty.Maintenance = maintenance;
                tempPropperty.EstPossessionOn = estPossessionOn;
                tempPropperty.Description = description;

                dc.Update(tempPropperty);
                await dc.SaveChangesAsync();
                return tempPropperty;
            }
            return tempPropperty;
        }

        public async Task<Propperty> InsertProperty(Propperty objPropperty)
        {
            dc.Propperties.Add(objPropperty);
            await dc.SaveChangesAsync();
            return objPropperty;
        }

        public async Task<Propperty> CreatePropperty(Propperty property)
        {
            dc.Propperties.Add(property);
            await dc.SaveChangesAsync();
            return property;
        }

        public async Task<Propperty> AddUpdateProperty(int id, int sellRent, string name, int propertyTypeId, int furnishingTypeId, int price, int bhk, int builtArea, int cityId, bool readyToMove, int carpetArea, string address, string address2, int floorNo, int totalFloors, string mainEntrance, int security, bool gated, int maintenance, DateTime estPossessionOn, string description, string authorId)
        {
            var tempPropperty = dc.Propperties.FirstOrDefault(x => x.Id == id);
            if (tempPropperty == null)
            {
                tempPropperty = new Propperty()
                {
                    SellRent = sellRent,
                    Name = name,
                    PropertyTypeId = propertyTypeId,
                    FurnishingTypeId = furnishingTypeId,
                    Price = price,
                    BHK = bhk,
                    BuiltArea = builtArea,
                    CityId = cityId,
                    ReadyToMove = readyToMove,
                    CarpetArea = carpetArea,
                    Address = address,
                    Address2 = address2,
                    FloorNo = floorNo,
                    TotalFloors = totalFloors,
                    MainEntrance = mainEntrance,
                    Security = security,
                    Gated = gated,
                    Maintenance = maintenance,
                    EstPossessionOn = estPossessionOn,
                    Description = description,
                    AppUserId = authorId,
                    PostedOn = DateTime.UtcNow,

                };
                await dc.Propperties.AddAsync(tempPropperty);
                await dc.SaveChangesAsync();
                return tempPropperty;
            }
            var cityy = await dc.Cities.FirstOrDefaultAsync(x => x.Id == cityId);
            var propType = await dc.PropertyTypes.FirstOrDefaultAsync(x => x.Id == propertyTypeId);
            var furnishType = await dc.FurnishingTypes.FirstOrDefaultAsync(x => x.Id == furnishingTypeId);

            if (cityy != null && propType != null && furnishType != null)
            {

                tempPropperty.SellRent = sellRent;
                tempPropperty.Name = name;
                tempPropperty.PropertyTypeId = propType.Id;
                tempPropperty.FurnishingTypeId = furnishType.Id;
                tempPropperty.Price = price;
                tempPropperty.BHK = bhk;
                tempPropperty.BuiltArea = builtArea;
                tempPropperty.CityId = cityy.Id;
                tempPropperty.ReadyToMove = readyToMove;
                tempPropperty.CarpetArea = carpetArea;
                tempPropperty.Address = address;
                tempPropperty.Address2 = address2;
                tempPropperty.FloorNo = floorNo;
                tempPropperty.TotalFloors = totalFloors;
                tempPropperty.MainEntrance = mainEntrance;
                tempPropperty.Security = security;
                tempPropperty.Gated = gated;
                tempPropperty.Maintenance = maintenance;
                tempPropperty.EstPossessionOn = estPossessionOn;
                tempPropperty.Description = description;

                dc.Update(tempPropperty);
                await dc.SaveChangesAsync();
                return tempPropperty;
            }
            return tempPropperty;
        }

        public async Task<List<PropertyDTO>> GetAllProperties(string authorId)
        {
            return await (
                from property in dc.Propperties
                where property.AppUserId == authorId
                select new PropertyDTO()
                {
                    Id = property.Id,
                    SellRent = property.SellRent,
                    Name = property.Name,
                    PropertyType = property.PropertyTypeId,
                    FurnishingType = property.FurnishingTypeId,
                    Price = property.Price,
                    BuiltArea = property.BuiltArea,
                    Address = property.Address,
                    Address2 = property.Address2,
                    City = property.CityId,
                    FloorNo = property.FloorNo,
                    TotalFloors = property.TotalFloors,
                    ReadyToMove = property.ReadyToMove,
                    MainEntrance = property.MainEntrance,
                    Security = property.Security,
                    Maintenance = property.Maintenance,
                    Description = property.Description,
                    AppUserId = property.AppUserId,
                    AuthorName = property.AppUser.FullName,
                    Created = property.PostedOn,
                }
            ).ToListAsync();
        }

        public async Task<bool> DeleteProperty(int id)
        {
            var tempProperty = dc.Propperties.FirstOrDefault(x => x.Id == id);
            if (tempProperty == null)
                return await Task.FromResult(true);

            dc.Propperties.Remove(tempProperty);
            await dc.SaveChangesAsync();
            return await Task.FromResult(true);
        }



    }
}
