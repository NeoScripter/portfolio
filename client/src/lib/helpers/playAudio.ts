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

const volume = 0.75;

const sounds = {
    click: new Howl({ src: [clickSound], volume }),
    openMenu: new Howl({ src: [menuOpenSound], volume }),
    closeMenu: new Howl({ src: [menuCloseSound], volume }),
    hover: new Howl({ src: [hoverSound], volume }),
    toggle: new Howl({ src: [toggleSound], volume }),
    disable: new Howl({ src: [disableSound], volume }),
    enable: new Howl({ src: [enableSound], volume }),
    slide: new Howl({ src: [slideSound], volume }),
    email: new Howl({ src: [emailSound], volume }),
    openFaq: new Howl({ src: [openFaqSound], volume }),
    closeFaq: new Howl({ src: [closeFaqSound], volume }),
    call: new Howl({ src: [callSound], volume }),
    nextPage: new Howl({ src: [nextPageSound], volume }),
    formFail: new Howl({ src: [formFailSound], volume }),
    formSuccess: new Howl({ src: [formSuccessSound], volume }),
};

export function playAudio(type: keyof typeof sounds) {
    if (!prefersSound.value && type !== 'enable') return;
    sounds[type].play();
}
