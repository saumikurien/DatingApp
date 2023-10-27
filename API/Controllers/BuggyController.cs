using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.CodeAnalysis;

namespace API.Controllers
{
    public class BuggyController : BaseAPIController
    {
        private readonly DataContext _dataContext;
        public BuggyController(DataContext dataContext)
        { 
            _dataContext = dataContext;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _dataContext.Users.Find(-1);
            if (thing != null) { return thing; }
            else
            {
                return NotFound();
            }
            
        }

        [HttpGet("server-error")]
        public ActionResult<string> ServerError()
        {
            var thing = _dataContext.Users.Find(-1);
            var thingtoReturn = thing.ToString();
            return thingtoReturn;
        }

    }
}
