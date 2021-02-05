using METscape.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace METscape.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void Delete(int id);
        List<Post> GetFriendsPosts(int id);
        Post GetPostById(int id);
        List<Post> GetPostsByUser(int userId);
    }
}
