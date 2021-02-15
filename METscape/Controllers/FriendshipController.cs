using METscape.Models;
using METscape.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace METscape.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FriendshipController : ControllerBase
    {
        private IFriendshipRepository _friendRepo;
        private IUserProfileRepository _userRepo;

        public FriendshipController(IFriendshipRepository friendRepo, IUserProfileRepository userRepo)
        {
            _friendRepo = friendRepo;
            _userRepo = userRepo;
        }

        [HttpPost]
        public IActionResult AddFriendship(Friendship friendship)
        {
            if (friendship.ApproverId != GetCurrentUserProfile().Id && friendship.InitiatorId != GetCurrentUserProfile().Id)
            {
                return BadRequest();
            }
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
            var endangeredFriend = _friendRepo.GetFriendshipById(id);
            
            if (endangeredFriend.ApproverId != GetCurrentUserProfile().Id && endangeredFriend.InitiatorId != GetCurrentUserProfile().Id)
            {
                return BadRequest();
            }
            _friendRepo.Delete(id);
            return Ok();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
