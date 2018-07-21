using System;
using System.Collections.Generic;

namespace CoreReact.Chinook.model
{
    public partial class Albums
    {
        public Albums()
        {
            Tracks = new HashSet<Tracks>();
        }

        public long AlbumId { get; set; }
        public string Title { get; set; }
        public long ArtistId { get; set; }

        public Artists Artist { get; set; }
        public ICollection<Tracks> Tracks { get; set; }
    }
}
