using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace METscape.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public int PostId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Content { get; set; }

        public int UserProfileId { get; set; }

        public DateTime DateCreated { get; set; }        
    }
}
