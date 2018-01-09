using System;
using System.Linq;
using System.Linq.Expressions;

namespace Services.Filters
{
    public class SingleStringFilterPreset<T> : IFilterPreset<T>
    {
        public string Field { get; set; }
        public string Type { get; set; }
        public Func<string, Expression<Func<T, bool>>> ExpressionFactory { get; set; }

        public IQueryable<T> Apply(IQueryable<T> query, string value)
        {
            return query.Where(ExpressionFactory(value));
        }
    }
}