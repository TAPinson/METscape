using METscape.Models;
using System.Collections.Generic;

namespace METscape.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        void Delete(int id);
        void DeleteByPost(int id);
        List<Comment> GetCommentsByPost(int id);
        void UpdateComment(Comment comment);
    }
}