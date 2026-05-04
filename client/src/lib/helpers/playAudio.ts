import clickSound from '@/assets/audio/click.mp3';
import toggleSound from '@/assets/audio/toggle.mp3';
import { Howl } from 'howler';

const sounds = {
    click: new Howl({ src: [clickSound], volume: 0.15 }),
    toggle: new Howl({ src: [toggleSound], volume: 0.2 }),
    // cancel: new Howl({ src: ['/sounds/cancel.mp3'], volume: 0.15 })
};

export function playAudio(type: keyof typeof sounds) {
    sounds[type].play();
}
