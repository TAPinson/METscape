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
    public class CommentController : ControllerBase
    {
        private ICommentRepository _commentRepo;

        public CommentController(ICommentRepository commentRepo)
        {
            _commentRepo = commentRepo;
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
            _commentRepo.Add(comment);
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteComment(int id)
        {
            _commentRepo.Delete(id);
            return Ok();
        }
    }
}
