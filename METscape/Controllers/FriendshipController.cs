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
            return Ok(friendship);
        }

        [HttpGet("myfriends/{id}")]
        public IActionResult GetUserFriends(int id)
        {
             var friends = _friendRepo.GetFriendshipsByUser(id);
            return Ok(friends);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteFriendship(int id)
        {
            _friendRepo.Delete(id);
            return Ok();
        }
    }
}
