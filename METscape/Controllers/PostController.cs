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
    public class PostController : ControllerBase
    {
        private IPostRepository _postRepo;

        public PostController(IPostRepository postRepo)
        {
            _postRepo = postRepo;
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
            return Ok(posts);
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
    }
}
