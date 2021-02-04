using METscape.Models;
using METscape.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace METscape.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendshipController : ControllerBase
    {
        private IFriendshipRepository _friendRepo;

        public FriendshipController(IFriendshipRepository friendRepo)
        {
            _friendRepo = friendRepo;
        }

        [HttpPost]
        public IActionResult AddFriendship(Friendship friendship)
        {
            _friendRepo.Add(friendship);
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult GetUserFriends(int id)
        {
            _friendRepo.GetFriendshipsByUser(id);
            return RedirectToAction(nameof(Index));
        }
    }
}
