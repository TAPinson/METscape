using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace METscape.Models
{
    public class Post
    {
        public int Id { get; set; }

        public int MetId { get; set; }

        public DateTime DateCreated { get; set; }

        public int UserProfileId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Content { get; set; }

        public string PostAuthor { get; set; }
    }
}
