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
    public class CommentController : ControllerBase
    {
        private ICommentRepository _commentRepo;
        private IUserProfileRepository _userRepo;

        public CommentController(ICommentRepository commentRepo, IUserProfileRepository userRepo)
        {
            _commentRepo = commentRepo;
            _userRepo = userRepo;
        }

        [HttpGet("bypost/{id}")]
        public IActionResult GetByPostId(int id)
        {
            var comments = _commentRepo.GetCommentsByPost(id);

            var orderedComments = comments.OrderBy(c => c.DateCreated).ToList();

            return Ok(orderedComments);
        }

        [HttpPost]
        public IActionResult AddComment(Comment comment)
        {
            if (comment.UserProfileId != GetCurrentUserProfile().Id)
            {
                return BadRequest();
            }
            _commentRepo.Add(comment);
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteComment(int id)
        {
            var endangeredComment = _commentRepo.GetCommentById(id);
            if (endangeredComment.UserProfileId != GetCurrentUserProfile().Id)
            {
                return BadRequest();
            }
            _commentRepo.Delete(id);
            return Ok();
        }

        [HttpPut("edit/{id}")]
        public IActionResult EditComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            if (comment.UserProfileId != GetCurrentUserProfile().Id)
            {
                return BadRequest();
            }

            _commentRepo.UpdateComment(comment);
            return Ok();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
