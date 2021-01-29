using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using METscape.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace METscape.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration config) : base(config) { }



        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirstName, LastName, UserName, Email, FirebaseUserId 
                        FROM UserProfile 
                        WHERE FirebaseUserId = @fireBaseId";
                    cmd.Parameters.AddWithValue("@fireBaseId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                            LastName = reader.GetString(reader.GetOrdinal("LastName")),
                            UserName = reader.GetString(reader.GetOrdinal("UserName")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId"))
                        };
                        reader.Close();
                        return userProfile;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }



    }
}
