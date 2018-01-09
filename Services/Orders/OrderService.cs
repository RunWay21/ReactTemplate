using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;

namespace Services.Orders
{
    public class OrderService<T>
    {
        private class OrderPreset
        {
            public string Field { get; set; }
            public Expression<Func<T, object>>[] Expression { get; set; }
        }

        private readonly IQueryable<T> _query;
        private readonly string _orderBy;
        private readonly string _sortBy;

        private readonly OrderPreset _default = new OrderPreset();
        private readonly List<OrderPreset> _presets = new List<OrderPreset>();

        public OrderService(IQueryable<T> query, string orderBy, string sortBy)
        {
            _query = query;
            _orderBy = orderBy;
            _sortBy = sortBy;
        }

        public OrderService<T> Field(string field, params Expression<Func<T, object>>[] expression)
        {
            if (expression.Length < 1)
                throw new ArgumentException("You should define one or more expressions");
            _presets.Add(new OrderPreset
            {
                Field = field,
                Expression = expression
            });
            return this;
        }

        public OrderService<T> Default(params Expression<Func<T, object>>[] expression)
        {
            if (expression.Length < 1)
                throw new ArgumentException("You should define one or more expressions");
            _default.Expression = expression;
            return this;
        }

        public IQueryable<T> Apply()
        {
            try
            {
                var preset = _presets.FirstOrDefault(x => x.Field == _orderBy) ?? _default;
                if (preset != null)
                {
                    var ascSort = _sortBy != "desc";
                    if (ascSort)
                    {
                        var query = _query.OrderBy(preset.Expression[0]);
                        for (int i = 1; i < preset.Expression.Length; i++)
                            query = query.ThenBy(preset.Expression[i]);
                        return query;
                    }
                    else
                    {
                        var query = _query.OrderByDescending(preset.Expression[0]);
                        for (int i = 1; i < preset.Expression.Length; i++)
                            query = query.ThenByDescending(preset.Expression[i]);
                        return query;
                    }
                }
            }
            catch (Exception e)
            {
                Trace.TraceError(e.ToString());
            }
            return _query;
        }
    }
}
