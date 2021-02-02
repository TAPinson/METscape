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
        Post GetPostById(int id);
    }
}
