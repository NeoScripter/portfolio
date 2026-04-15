export default function checkMotionPreferences() {
    if (typeof window == 'undefined') {
        return false;
    }

    const isMotionEnabled = window.matchMedia(
        '(prefers-reduced-motion: no-preference)',
    ).matches;

    return isMotionEnabled;
}
