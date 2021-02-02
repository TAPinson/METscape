﻿using METscape.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace METscape.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration config) : base(config) { }

        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, MetId, DateCreated, UserProfileId, Title, Content FROM Post WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    if(reader.Read())
                    {
                        Post post = new Post
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            MetId = reader.GetInt32(reader.GetOrdinal("MetId")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileID")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content"))
                        };
                        reader.Close();
                        return post;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }

                }
            }
        }

        public void Add(Post post)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Post (MetId, DateCreated, UserProfileId, Title, Content)
                    OUTPUT INSERTED.ID
                    VALUES (@metId, @dateCreated, @userProfileId, @title, @content)";

                    cmd.Parameters.AddWithValue("@metId", post.MetId);
                    cmd.Parameters.AddWithValue("@dateCreated", DateTime.Now);
                    cmd.Parameters.AddWithValue("@userProfileId", post.UserProfileId);
                    cmd.Parameters.AddWithValue("@title", post.Title);
                    cmd.Parameters.AddWithValue("@content", post.Content);

                    int id = (int)cmd.ExecuteScalar();
                    post.Id = id;
                }
            }
        }


    }
}
