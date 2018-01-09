using System.Web.Http;
using Models;
using Services;

namespace ReactTemplate.Controllers
{
    [RoutePrefix("api/book")]
    public class BookController : ApiController
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        [Route(nameof(GetCounter))]
        public int GetCounter()
        {
            return _bookService.GetCounter();
        }

        [HttpGet]
        [Route(nameof(GetBooks))]
        public Page<BookModel> GetBooks([FromUri]CommonFilter filter)
        {
            return _bookService.GetBooks(filter);
        }

        [HttpGet]
        [Route(nameof(GetBook))]
        public BookModel GetBook(int id)
        {
            return _bookService.GetBook(id);
        }

        [HttpPost]
        [Route(nameof(SaveBook))]
        public void SaveBook(BookModel model)
        {
            _bookService.SaveBook(model);
        }
    }
}
