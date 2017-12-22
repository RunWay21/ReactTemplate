namespace Models
{
    public class BookFilter
    {
        public int Page { get; set; } = 1;
        public string OrderBy { get; set; } = "title";
        public string SortBy { get; set; } = "asc";
        public string FilterBy { get; set; } = "title";
        public string FilterValue { get; set; }
    }
}
