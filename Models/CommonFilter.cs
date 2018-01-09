namespace Models
{
    public class CommonFilter
    {
        public int Page { get; set; } = 1;
        public string OrderBy { get; set; }
        public string SortBy { get; set; }
        public string Filters { get; set; }
    }
}
