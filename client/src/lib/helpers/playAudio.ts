import closeFaqSound from '@/assets/audio/close-faq.mp3';
import openFaqSound from '@/assets/audio/open-faq.mp3';
import callSound from '@/assets/audio/call.mp3';
import clickSound from '@/assets/audio/click.mp3';
import disableSound from '@/assets/audio/disable-sound.mp3';
import emailSound from '@/assets/audio/email.mp3';
import enableSound from '@/assets/audio/enable-sound.mp3';
import formFailSound from '@/assets/audio/form-fail.mp3';
import formSuccessSound from '@/assets/audio/form-success.mp3';
import nextPageSound from '@/assets/audio/next-page.mp3';
import slideSound from '@/assets/audio/slide.mp3';
import hoverSound from '@/assets/audio/hover.mp3';
import toggleSound from '@/assets/audio/toggle.mp3';
import menuOpenSound from '@/assets/audio/menu-open.mp3';
import menuCloseSound from '@/assets/audio/menu-close.mp3';
import { prefersSound } from '@/signals/sound';
import { Howl } from 'howler';

const sounds = {
    click: new Howl({ src: [clickSound], volume: 1 }),
    openMenu: new Howl({ src: [menuOpenSound], volume: 1 }),
    closeMenu: new Howl({ src: [menuCloseSound], volume: 1 }),
    hover: new Howl({ src: [hoverSound], volume: 1 }),
    toggle: new Howl({ src: [toggleSound], volume: 1 }),
    disable: new Howl({ src: [disableSound], volume: 1 }),
    enable: new Howl({ src: [enableSound], volume: 1 }),
    slide: new Howl({ src: [slideSound], volume: 1 }),
    email: new Howl({ src: [emailSound], volume: 1 }),
    openFaq: new Howl({ src: [openFaqSound], volume: 1 }),
    closeFaq: new Howl({ src: [closeFaqSound], volume: 1 }),
    call: new Howl({ src: [callSound], volume: 1 }),
    nextPage: new Howl({ src: [nextPageSound], volume: 1 }),
    formFail: new Howl({ src: [formFailSound], volume: 1 }),
    formSuccess: new Howl({ src: [formSuccessSound], volume: 1 }),
};

export function playAudio(type: keyof typeof sounds) {
    if (!prefersSound.value && type !== 'enable') return;
    sounds[type].play();
}
