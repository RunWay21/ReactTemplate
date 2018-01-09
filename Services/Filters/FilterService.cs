using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Text;
using Models;
using Newtonsoft.Json;

namespace Services.Filters
{
    public class FilterService<T>
    {
        private readonly IQueryable<T> _query;
        private readonly string _filters;

        private readonly List<IFilterPreset<T>> _presets = new List<IFilterPreset<T>>();

        public FilterService(IQueryable<T> query, string filters)
        {
            _query = query;
            _filters = filters;
        }

        public FilterService<T> WhereContains(string field, Func<string, Expression<Func<T, bool>>> expressionFactory)
        {
            _presets.Add(new SingleStringFilterPreset<T>
            {
                Field = field,
                Type = "contains",
                ExpressionFactory = expressionFactory
            });
            return this;
        }

        public FilterService<T> WhereEquals(string field, Func<string, Expression<Func<T, bool>>> expressionFactory)
        {
            _presets.Add(new SingleStringFilterPreset<T>
            {
                Field = field,
                Type = "equals",
                ExpressionFactory = expressionFactory
            });
            return this;
        }

        public IQueryable<T> Apply()
        {
            var query = _query;
            try
            {
                var decoded = WebUtility.UrlDecode(_filters);
                var bytes = Convert.FromBase64String(decoded);
                var json = Encoding.UTF8.GetString(bytes);
                var filters = JsonConvert.DeserializeObject<List<FieldFilter>>(json);

                foreach (var fieldFilter in filters)
                {
                    if (string.IsNullOrEmpty(fieldFilter.Value))
                        continue;
                    var preset = _presets.FirstOrDefault(x => x.Field == fieldFilter.Field && x.Type == fieldFilter.Type);
                    if (preset != null)
                        query = preset.Apply(query, fieldFilter.Value);
                }
            }
            catch (Exception e)
            {
                Trace.TraceError(e.ToString());
            }
            return query;
        }
    }
}
