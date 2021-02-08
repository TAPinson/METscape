using METscape.Models;
using METscape.Repositories;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class PostController : ControllerBase
    {
        private IPostRepository _postRepo;
        private ICommentRepository _commentRepo;

        public PostController(IPostRepository postRepo, ICommentRepository commentRepo)
        {
            _postRepo = postRepo;
            _commentRepo = commentRepo;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var post = _postRepo.GetPostById(id);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        [HttpGet("userposts/{id}")]
        public IActionResult GetByUserId(int id)
        {
            var posts = _postRepo.GetPostsByUser(id);
            var orderedPosts = posts.OrderBy(c => c.Id).ToList();
            return Ok(orderedPosts);
        }

        [HttpGet("friendposts/{id}")]
        public IActionResult GetFriendsPosts(int id)
        {
            var posts = _postRepo.GetFriendsPosts(id);
            return Ok(posts);
        }

        [HttpPost]
        public IActionResult AddPost(Post post)
        {
            _postRepo.Add(post);
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeletePost(int id)
        {
            _commentRepo.DeleteByPost(id);
            _postRepo.Delete(id);
            return Ok();
        }

        [HttpPut("update/{id}")]
        public IActionResult EditPost(int id, Post post)
        {
            _postRepo.UpdatePost(post);
            return Ok(post);

        }
    }
}
