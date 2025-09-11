<script lang="ts">
	import { classNames } from '../../../../../../utils/misc/utilities';
	import type { UIMediaThumbnailProps } from './types';

	let { file, ...rest }: UIMediaThumbnailProps = $props();

	let thumbnail: string | undefined = $state();

	async function generateVideoThumbnail(file: File) {
		return new Promise<string>((resolve, reject) => {
			const video = document.createElement('video');
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			video.preload = 'metadata';
			video.src = URL.createObjectURL(file);
			video.muted = true;
			video.playsInline = true;

			video.addEventListener('loadeddata', () => {
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;

				ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

				URL.revokeObjectURL(video.src);
				resolve(canvas.toDataURL('image/png'));
			});

			video.addEventListener('error', (e) => {
				reject(new Error('Could not load video'));
			});
		});
	}

	const fileType = file.type.split('/')[0];

	(async () => {
		switch (fileType) {
			case 'image':
				thumbnail = URL.createObjectURL(file);
				break;
			case 'video':
				thumbnail = (await generateVideoThumbnail(file)) ?? '';
				break;
			default:
				break;
		}
	})();
</script>

{#if thumbnail}
	<img class="thumbnail" src={thumbnail} alt={file.name} draggable={false} {...rest} />
{:else}
	<div {...rest as any} class={classNames('loading', rest?.class)}>
		<div class="loader"></div>
	</div>
{/if}

<style>
	.loading {
		width: 100%;
		height: 100%;

		display: flex;

		justify-content: center;
		align-items: center;

		position: absolute;
	}

	.loader {
		width: 9px;
		height: 18px;

		transform: scale(0.5) translateY(-14px);

		background: #000;
		color: #000;
		filter: invert(100%) sepia(100%) saturate(2000%) hue-rotate(190deg);
		opacity: 0.05;
		box-shadow:
			-18px -9px,
			0 -9px,
			18px -9px,
			-18px 0,
			18px 0,
			-18px 9px,
			0 9px,
			18px 9px,
			-18px 18px,
			0 18px,
			18px 18px;
		animation: l29 2s infinite;
	}

	@keyframes l29 {
		10% {
			box-shadow:
				-18px -9px,
				0 -9px,
				18px -9px,
				-18px 0,
				18px 0,
				-18px 9px #0000,
				0 9px,
				18px 9px #0000,
				-18px 18px,
				0 18px,
				18px 18px;
		}
		20% {
			box-shadow:
				-18px -9px,
				0 -9px,
				18px -9px,
				-18px 0,
				18px 0,
				-18px 9px,
				0 9px,
				18px 9px #0000,
				-18px 18px #0000,
				0 18px,
				18px 18px;
		}
		30% {
			box-shadow:
				-18px -9px,
				0 -9px #0000,
				18px -9px,
				-18px 0 #0000,
				18px 0,
				-18px 9px,
				0 9px #0000,
				18px 9px,
				-18px 18px #0000,
				0 18px,
				18px 18px #0000;
		}
		40% {
			box-shadow:
				-18px -9px,
				0 -9px,
				18px -9px,
				-18px 0 #0000,
				18px 0 #0000,
				-18px 9px,
				0 9px,
				18px 9px,
				-18px 18px,
				0 18px,
				18px 18px;
		}
		50% {
			box-shadow:
				-18px -9px,
				0 -9px,
				18px -9px,
				-18px 0,
				18px 0 #0000,
				-18px 9px #0000,
				0 9px,
				18px 9px,
				-18px 18px,
				0 18px,
				18px 18px;
		}
		60% {
			box-shadow:
				-18px -9px,
				0 -9px #0000,
				18px -9px,
				-18px 0,
				18px 0,
				-18px 9px #0000,
				0 9px,
				18px 9px,
				-18px 18px #0000,
				0 18px,
				18px 18px;
		}
		70% {
			box-shadow:
				-18px -9px,
				0 -9px #0000,
				18px -9px #0000,
				-18px 0,
				18px 0,
				-18px 9px,
				0 9px,
				18px 9px,
				-18px 18px #0000,
				0 18px,
				18px 18px;
		}
		80% {
			box-shadow:
				-18px -9px #0000,
				0 -9px,
				18px -9px,
				-18px 0,
				18px 0,
				-18px 9px,
				0 9px,
				18px 9px,
				-18px 18px,
				0 18px,
				18px 18px #0000;
		}
		90% {
			box-shadow:
				-18px -9px #0000,
				0 -9px,
				18px -9px,
				-18px 0,
				18px 0,
				-18px 9px,
				0 9px #0000,
				18px 9px,
				-18px 18px,
				0 18px,
				18px 18px #0000;
		}
	}
</style>
