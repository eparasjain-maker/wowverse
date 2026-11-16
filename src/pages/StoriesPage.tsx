import React, { useState, useEffect } from 'react';
import { WEDDING_STORIES } from '../data/stories';
import { WeddingStory } from '../types';
import { Play, Pause, Volume2, VolumeX, Eye, Sparkles, MapPin, X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StoriesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeStory, setActiveStory] = useState<WeddingStory | null>(null);
  const [playingStoryId, setPlayingStoryId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Palace Wedding', 'Intimate Sacred', 'Grand Destination', 'Contemporary Fusion'];

  const filteredStories = selectedCategory === 'All'
    ? WEDDING_STORIES
    : WEDDING_STORIES.filter(s => s.category === selectedCategory);

  return (
    <div className="pt-32 pb-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Header */}
        <div className="max-w-3xl mb-12" data-reveal="true">
          <p className="meta text-ink/70 mb-3">
            The Archive · 4K Vertical Cinema
          </p>
          <h1 className="display-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-ink font-normal leading-none">
            Wedding stories.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-ink/75 font-sans leading-relaxed">
            Real celebrations captured through an editorial, social-first lens. Vertical reels, raw audio moments, and electric dance floor joy.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-border" data-reveal="true">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`pill text-xs font-sans transition-all ${
                selectedCategory === cat
                  ? 'bg-ink text-bone font-semibold shadow-md'
                  : 'bg-white/70 border-border text-ink/70 hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {filteredStories.map((story) => {
            const isPlaying = playingStoryId === story.id;
            return (
              <div
                key={story.id}
                className="group flex flex-col justify-between rounded-3xl bg-white/70 hover:bg-white border border-border p-3.5 transition-all duration-500 shadow-sm hover:shadow-md"
                data-reveal="true"
              >
                {/* 9:16 Frame */}
                <div
                  className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black mb-4 border border-black/10"
                  data-reveal-img="true"
                >
                  {isPlaying && story.videoUrl ? (
                    <video
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover"
                      src={story.videoUrl}
                    />
                  ) : (
                    <img
                      src={story.posterUrl}
                      alt={story.couple}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="meta text-[9px] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-bone border border-white/15">
                      {story.category}
                    </span>
                    {story.stats.views && (
                      <span className="meta text-[9px] flex items-center gap-1 px-2.5 py-1 rounded-full bg-panel-blue text-ink font-semibold">
                        <Eye className="w-3 h-3 text-ink" /> {story.stats.views}
                      </span>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                    <button
                      onClick={() => setPlayingStoryId(isPlaying ? null : story.id)}
                      className="w-10 h-10 rounded-full bg-bone hover:bg-panel-blue text-ink flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                      aria-label="Play Reel"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>

                    {isPlaying && (
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-bone border border-white/20 flex items-center justify-center"
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5 opacity-60" /> : <Volume2 className="w-3.5 h-3.5 text-panel-blue" />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="px-2">
                  <h3 className="display-title text-2xl text-ink group-hover:underline transition-colors">
                    {story.couple}
                  </h3>
                  <p className="meta text-[9px] text-ink/70 mt-0.5">
                    {story.location}
                  </p>
                  <p className="text-xs text-ink/70 font-sans italic mt-2 line-clamp-2">
                    "{story.tagline}"
                  </p>

                  <button
                    onClick={() => setActiveStory(story)}
                    className="mt-4 pt-3 border-t border-border w-full flex items-center justify-between meta text-[10px] text-ink/60 group-hover:text-ink transition-colors font-semibold"
                  >
                    <span>View Wedding Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Story Modal */}
        {activeStory && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8">
            <div className="bg-[#f1efeb] text-[#0e0e0e] border border-border rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 relative">
              <button
                onClick={() => setActiveStory(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-ink/10 text-ink/70 hover:text-ink"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="aspect-[9/16] rounded-2xl overflow-hidden bg-black">
                  {activeStory.videoUrl ? (
                    <video
                      autoPlay
                      loop
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                      src={activeStory.videoUrl}
                    />
                  ) : (
                    <img
                      src={activeStory.posterUrl}
                      alt={activeStory.couple}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="meta text-ink/60">
                      {activeStory.category} · {activeStory.date}
                    </span>
                    <h2 className="display-title text-3xl sm:text-4xl text-ink mt-1 font-normal">
                      {activeStory.couple}
                    </h2>
                    <p className="meta text-[10px] text-ink/60 flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-ink" /> {activeStory.location}
                    </p>
                  </div>

                  <p className="text-base display-title italic text-ink/85 leading-relaxed">
                    "{activeStory.tagline}"
                  </p>

                  {/* Highlights */}
                  <div>
                    <h4 className="meta text-ink/70 mb-3 font-semibold">
                      Story Highlights:
                    </h4>
                    <ul className="space-y-2 text-xs font-sans text-ink/75">
                      {activeStory.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-ink shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {activeStory.quote && (
                    <div className="p-4 rounded-2xl bg-white/70 border border-border text-xs font-serif italic text-ink/80">
                      {activeStory.quote}
                    </div>
                  )}

                  <div className="pt-4 border-t border-border">
                    <Link
                      to="/booking"
                      className="w-full pill bg-ink hover:bg-black text-bone font-sans text-xs tracking-wider uppercase justify-center"
                    >
                      <span>Check Wedding Availability</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
