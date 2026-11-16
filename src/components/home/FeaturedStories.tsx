import React, { useState } from 'react';
import { WEDDING_STORIES } from '../../data/stories';
import { Play, Pause, Volume2, VolumeX, Eye, ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeaturedStories: React.FC = () => {
  const [playingStoryId, setPlayingStoryId] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);

  return (
    <section className="py-24 md:py-32 bg-background text-foreground relative border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-border" data-reveal="true">
          <div>
            <p className="meta text-ink/70 mb-3">
              Vertical Reel Archive · 4K Cinema
            </p>
            <h2 className="display-title text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-ink leading-none">
              The feeling<br />
              <span className="italic text-ink/80">is the story.</span>
            </h2>
          </div>

          <Link
            to="/stories"
            className="mt-6 md:mt-0 pill bg-ink text-bone hover:bg-black font-sans text-xs tracking-wider uppercase"
            data-cursor="ALL STORIES"
          >
            <span>Explore all stories</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WEDDING_STORIES.map((story) => {
            const isPlaying = playingStoryId === story.id;
            return (
              <div
                key={story.id}
                className="group flex flex-col justify-between bg-white/70 hover:bg-white rounded-3xl border border-border hover:border-ink/20 p-3.5 transition-all duration-500 shadow-sm hover:shadow-md"
                data-reveal="true"
                data-cursor={isPlaying ? 'PAUSE' : 'PLAY'}
              >
                {/* 9:16 Vertical Video Frame with Reveal Animation */}
                <div
                  className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black mb-4 border border-black/10"
                  data-reveal-img="true"
                >
                  {isPlaying && story.videoUrl ? (
                    <video
                      autoPlay
                      loop
                      muted={muted}
                      playsInline
                      className="w-full h-full object-cover scale-105 transition-transform duration-700"
                      src={story.videoUrl}
                    />
                  ) : (
                    <img
                      src={story.posterUrl}
                      alt={story.couple}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] z-10">
                    <span className="meta text-[9px] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-bone border border-white/15">
                      {story.category}
                    </span>
                    {story.stats.views && (
                      <span className="meta text-[9px] flex items-center gap-1 px-2.5 py-1 rounded-full bg-panel-blue text-ink font-semibold">
                        <Eye className="w-3 h-3 text-ink" /> {story.stats.views}
                      </span>
                    )}
                  </div>

                  {/* Play & Audio Controls */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                    <button
                      onClick={() => setPlayingStoryId(isPlaying ? null : story.id)}
                      className="w-10 h-10 rounded-full bg-bone hover:bg-panel-blue text-ink flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                      aria-label="Play Reel"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>

                    {isPlaying && (
                      <button
                        onClick={() => setMuted(!muted)}
                        className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-bone border border-white/20 flex items-center justify-center"
                        aria-label="Toggle Sound"
                      >
                        {muted ? (
                          <VolumeX className="w-3.5 h-3.5 opacity-60" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-panel-blue" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Story Info */}
                <div className="px-2 pb-1">
                  <div className="flex items-center gap-1.5 text-ink/60 meta text-[9px] mb-1">
                    <MapPin className="w-3 h-3 text-ink" />
                    <span>{story.location}</span>
                  </div>

                  <h3 className="display-title text-2xl text-ink group-hover:underline transition-colors">
                    {story.couple}
                  </h3>

                  <p className="text-xs text-ink/70 font-sans line-clamp-2 mt-1 mb-3">
                    "{story.tagline}"
                  </p>

                  <div className="pt-2 border-t border-border flex items-center justify-between meta text-[9px] text-ink/60">
                    <span>{story.date}</span>
                    <span className="text-ink font-semibold">{story.stats.reelsCount} Vertical Reels</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
