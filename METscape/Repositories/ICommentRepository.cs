using METscape.Models;
using System.Collections.Generic;

namespace METscape.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        List<Comment> GetCommentsByPost(int id);
    }
}