using METscape.Models;
using System.Collections.Generic;

namespace METscape.Repositories
{
    public interface IFriendshipRepository
    {
        void Add(Friendship friendship);
        void Delete(int id);
        Friendship GetFriendshipById(int id);
        List<Friendship> GetFriendshipsByUser(int id);
    }
}