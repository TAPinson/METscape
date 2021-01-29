using METscape.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace METscape.Repositories
{
    public interface IPostRepository
    {
        Post GetPostById(int id);
    }
}
