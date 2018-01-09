using System.Linq;

namespace Services.Filters
{
    public interface IFilterPreset<T>
    {
        string Field { get; set; }
        string Type { get; set; }
        IQueryable<T> Apply(IQueryable<T> query, string value);
    }
}