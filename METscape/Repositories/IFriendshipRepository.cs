using METscape.Models;
using System.Collections.Generic;

namespace METscape.Repositories
{
    public interface IFriendshipRepository
    {
        void Add(Friendship friendship);
        List<Friendship> GetFriendshipsByUser(int id);
    }
}