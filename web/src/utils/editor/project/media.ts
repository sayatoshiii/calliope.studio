import type { MediaLength, Project } from './types';

const defaultLength = 5000;
const pixelsPerMillisecond = 100;

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
