const heroBaseOffsets = {
    mobile: 840,
    tablet: 1224 + 16,
    desktop: 648 + 16,
} as const;

export default function getHeroOffset(screenWidth: number) {
    return screenWidth < 768
        ? heroBaseOffsets.mobile
        : screenWidth < 1024
          ? heroBaseOffsets.tablet
          : heroBaseOffsets.desktop;
}
