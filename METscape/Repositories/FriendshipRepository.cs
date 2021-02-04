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

        public List<Friendship> GetFriendshipsByUser(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using  (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, InitiatorId, ApproverId, IsApproved
                    FROM Friendship
                    WHERE InitiatorId = @id OR ApproverId = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    var friends = new List<Friendship>();
                    while (reader.Read())
                    {
                        var friend = new Friendship()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            InitiatorId = reader.GetInt32(reader.GetOrdinal("InitiatorId")),
                            ApproverId = reader.GetInt32(reader.GetOrdinal("ApproverId")),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved"))
                        };
                        friends.Add(friend);
                    }
                    reader.Close();
                    return friends;
                }
            }    
        }

        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Friendship WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
