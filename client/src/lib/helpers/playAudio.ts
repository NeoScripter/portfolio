import clickSound from '@/assets/audio/click.mp3';
import disableSound from '@/assets/audio/disable-sound.mp3';
import enableSound from '@/assets/audio/enable-sound.mp3';
import slideSound from '@/assets/audio/slide.mp3';
import toggleSound from '@/assets/audio/toggle.mp3';
import { prefersSound } from '@/signals/sound';
import { Howl } from 'howler';

const sounds = {
    click: new Howl({ src: [clickSound], volume: 0.15 }),
    toggle: new Howl({ src: [toggleSound], volume: 0.2 }),
    disable: new Howl({ src: [disableSound], volume: 0.5 }),
    enable: new Howl({ src: [enableSound], volume: 0.15 }),
    slide: new Howl({ src: [slideSound], volume: 0.25 }),
};

export function playAudio(type: keyof typeof sounds) {
    if (!prefersSound.value && type !== 'enable') return;
    sounds[type].play();
}
