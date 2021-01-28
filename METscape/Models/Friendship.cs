using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace METscape.Models
{
    public class Friendship
    {
        public int Id { get; set; }
        public int InitiatorId { get; set; }
        public int ApproverId { get; set; }
        public bool IsApproved { get; set; }
    }
}
