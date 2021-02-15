using METscape.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace METscape.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration config) : base(config) { }

        public void Add(Comment comment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Comment (PostId, Content, UserProfileId, DateCreated)
                    OUTPUT INSERTED.ID
                    VALUES (@postId, @content, @userProfileId, @dateCreated)";

                    cmd.Parameters.AddWithValue("@postId", comment.PostId);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    cmd.Parameters.AddWithValue("@userProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@dateCreated", DateTime.Now);

                    int id = (int)cmd.ExecuteScalar();
                    comment.Id = id;
                }
            }
        }

        public List<Comment> GetCommentsByPost(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Comment.Id, PostId, Content, UserProfileId, DateCreated, UserProfile.UserName as CommentAuthor
                    FROM Comment
                    JOIN UserProfile ON Comment.UserProfileId = UserProfile.ID
                    WHERE PostId = @postId";
                    cmd.Parameters.AddWithValue("@postId", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    var comments = new List<Comment>();
                    while (reader.Read())
                    {
                        var comment = new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileID")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                            CommentAuthor = reader.GetString(reader.GetOrdinal("CommentAuthor"))
                        };
                        comments.Add(comment);
                    }
                    reader.Close();
                    return comments;
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
                    cmd.CommandText = "DELETE FROM Comment WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteByPost(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Comment WHERE PostId = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateComment(Comment comment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Comment
                    SET
                        PostId = @postId,
                        Content = @content,
                        UserProfileId = @userProfileId,
                        DateCreated = @dateCreated
                    WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@postId", comment.PostId);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    cmd.Parameters.AddWithValue("@userProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@dateCreated", comment.DateCreated);
                    cmd.Parameters.AddWithValue("@id", comment.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Comment GetCommentById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, PostId, Content, UserProfileId, DateCreated
                    FROM Comment
                    WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        Comment comment = new Comment
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileID")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated"))
                        };
                        reader.Close();
                        return comment;
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
