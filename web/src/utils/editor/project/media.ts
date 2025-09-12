import type { MediaLength, Project } from './types';

export const defaultLength = 5000;
export const pixelsPerMillisecond = 100;

export const getMediaLength = async (project: Project, id: string): Promise<MediaLength> => {
  const media = project?.media?.[id];

  let length = defaultLength;

  if (media?.file?.type.startsWith('video/')) {
    const videoLength = await getVideoLength(media?.file);
    if (videoLength) length = videoLength;
  }

  return {
    time: length,
    size: length / pixelsPerMillisecond
  };
};

export const getVideoLength = async (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');

    video.preload = 'metadata';
    video.src = URL.createObjectURL(file);

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      resolve(video.duration * 1000);
    };

    video.onerror = () => {
      reject(new Error('Failed to handle video'));
    };
  });
};

export const addMediaToTrack = async (
  project: Project,
  trackId: string,
  mediaId: string,
  timestamp: number
) => {
  if (!project.tracks) project.tracks = {};
  const clips = project?.tracks?.[trackId]?.clips ?? [];

  project.tracks[trackId].clips = [
    ...clips,
    {
      id: mediaId,
      timestamp,
      duration: (await getMediaLength(project, mediaId)).time
    }
  ];
};

export const formatTimestamp = (ms: number) => {
  let totalSeconds = Math.floor(ms / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let millis = ms % 1000;

  return (
    `${minutes.toString().padStart(2, '0')}:` +
    `${seconds.toString().padStart(2, '0')}:` +
    `${millis.toString().padStart(3, '0')}`
  );
};

export const exportProject = (project: Project) => { };
