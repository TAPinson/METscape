using METscape.Models;
using System.Collections.Generic;

namespace METscape.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAllUsers();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}