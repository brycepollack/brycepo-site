import { useEffect, useState } from 'react';
import { Spotify } from 'react-spotify-embed';

export default function SpotifyWidget() {
  const [nowPlaying, setNowPlaying] = useState<any>(null);
  const [topTracks, setTopTracks] = useState<any[]>([]);

  const apiBase = import.meta.env.PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${apiBase}/spotify`)
      .then(r => r.json())
      .then(data => {
        setNowPlaying(data.nowPlaying);
        setTopTracks(data.topTracks?.items.slice(0, 4) || []);
      });
  }, []);

  return (
    <section className="spotify-widget">
      {/* Now Playing Column */}
      <div className="spotify-column">
        <h3 className="spotify-heading">Now Playing</h3>
        <div className="spotify-nowPlaying">
          {nowPlaying?.item ? (
            <Spotify className="now-playing-track" link={nowPlaying.item.external_urls.spotify} />
          ) : (
            <div className="spotify-placeholder">Not listening to anything right now</div>
          )}
        </div>
      </div>

      {/* Top Tracks Column */}
      <div className="spotify-column">
        <h3 className="spotify-heading">Top Tracks</h3>
        <div className="spotify-topTracks">
          {topTracks.length ? (
            topTracks.map(track => (
              <Spotify key={track.id} link={track.external_urls.spotify} wide />
            ))
          ) : (
            <div className="spotify-placeholder">Top tracks not available right now</div>
          )}
        </div>
      </div>
    </section>
  );
}
