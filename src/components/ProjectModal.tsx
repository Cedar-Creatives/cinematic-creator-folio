import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowSquareOut } from '@phosphor-icons/react';
import type { PortfolioProject } from '../types';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

function getEmbedType(url: string): 'youtube' | 'tiktok' | 'instagram' | 'unknown' {
  if (url.includes('youtube.com/embed') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('tiktok.com')) return 'tiktok';
  if (url.includes('instagram.com')) return 'instagram';
  return 'unknown';
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const hasMedia = !!project.mediaUrl;
  const embedType = hasMedia ? getEmbedType(project.mediaUrl!) : null;
  const isEmbeddable = embedType === 'youtube';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur-sm transition-colors hover:bg-amber-500/20 hover:text-amber-400"
          >
            <X size={20} weight="bold" />
          </button>

          {/* Media Area */}
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            {isEmbeddable ? (
              /* YouTube embed */
              <iframe
                src={`${project.mediaUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={project.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              /* Static thumbnail with optional external link overlay */
              <>
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                {hasMedia && (
                  <a
                    href={project.mediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    {/* Play button */}
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 shadow-xl shadow-amber-500/40 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-400">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 translate-x-0.5 text-black">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/60 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
                      <ArrowSquareOut size={13} />
                      Watch on {embedType === 'tiktok' ? 'TikTok' : embedType === 'instagram' ? 'Instagram' : 'external link'}
                    </span>
                  </a>
                )}
              </>
            )}

            {/* Title overlay (only when no embed) */}
            {!isEmbeddable && (
              <div className="absolute bottom-4 left-6">
                <span className="inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-amber-400 backdrop-blur-sm">
                  {project.category}
                </span>
                <h2 className="mt-2 text-2xl font-bold text-white drop-shadow-lg">{project.title}</h2>
              </div>
            )}
          </div>

          {/* Title below embed (for YouTube where title overlay is hidden by iframe) */}
          {isEmbeddable && (
            <div className="border-b border-white/5 px-6 pt-4 pb-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-amber-400">
                    {project.category}
                  </span>
                  <h2 className="mt-1.5 text-xl font-bold text-white">{project.title}</h2>
                </div>
                <a
                  href={project.mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-amber-500/30 hover:text-amber-400"
                >
                  <ArrowSquareOut size={13} />
                  YouTube
                </a>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="space-y-5 p-6">
            {/* Description */}
            <p className="text-base leading-relaxed text-zinc-300">
              {project.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-sm">
              {project.client && (
                <div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Client
                  </span>
                  <span className="text-zinc-200">{project.client}</span>
                </div>
              )}
              <div>
                <span className="block text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Year
                </span>
                <span className="text-zinc-200">{project.year}</span>
              </div>
              <div>
                <span className="block text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Category
                </span>
                <span className="capitalize text-zinc-200">{project.category}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-400 transition-colors hover:border-amber-500/30 hover:text-amber-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
