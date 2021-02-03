using METscape.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace METscape.Repositories
{
    public class FriendshipRepository : BaseRepository, IFriendshipRepository
    {
        public FriendshipRepository(IConfiguration config) : base(config) { }

        public void Add(Friendship friendship)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Friendship (InitiatorId, ApproverId, IsApproved)
                    OUTPUT INSERTED.ID
                    VALUES (@initiatorId, @approverId, @isApproved)";
                    cmd.Parameters.AddWithValue("@initiatorId", friendship.InitiatorId);
                    cmd.Parameters.AddWithValue("@approverId", friendship.ApproverId);
                    cmd.Parameters.AddWithValue("@isApproved", friendship.ApproverId);
                    int id = (int)cmd.ExecuteScalar();
                    friendship.Id = id;
                }
            }
        }

    }
}
