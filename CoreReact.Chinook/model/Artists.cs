using System;
using System.Collections.Generic;

namespace CoreReact.Chinook.model
{
    public partial class Artists
    {
        public Artists()
        {
            Albums = new HashSet<Albums>();
        }

        public long ArtistId { get; set; }
        public string Name { get; set; }

        public ICollection<Albums> Albums { get; set; }
    }
}
