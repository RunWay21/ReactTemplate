using System.Linq;
using Services.Filters;
using Services.Orders;

namespace Services.Extensions
{
    public static class FilterOrderExtensions
    {
        public static FilterService<T> Filter<T>(this IQueryable<T> query, string filters)
        {
            return new FilterService<T>(query, filters);
        }

        public static OrderService<T> Order<T>(this IQueryable<T> query, string orderBy, string sortBy)
        {
            return new OrderService<T>(query, orderBy, sortBy);
        }
    }
}