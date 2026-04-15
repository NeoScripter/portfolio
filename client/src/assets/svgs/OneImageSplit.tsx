import type { FunctionComponent } from 'preact';

interface SVGIconProps {
    width?: number | string;
    height?: number | string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number | string;
    className?: string;
}

const OneImageSplit: FunctionComponent<SVGIconProps> = ({
    width = 1000,
    height = 1000,
    fill = 'transparent',
    stroke = 'currentColor',
    strokeWidth = 25,
    className = '',
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect width="1000" height="1000" fill={fill} />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M923.335 366.667C923.335 339.053 900.95 316.667 873.335 316.667H606.668C579.054 316.667 556.668 339.053 556.668 366.667V633.334C556.668 660.949 579.054 683.334 606.668 683.334H873.335C900.95 683.334 923.335 660.949 923.335 633.334V366.667ZM890.001 366.667C890.001 357.462 882.54 350 873.335 350H606.668C597.463 350 590.001 357.462 590.001 366.667V633.334C590.001 642.539 597.463 650 606.668 650H873.335C882.54 650 890.001 642.539 890.001 633.334V366.667Z"
                fill={stroke}
            />
            <path
                d="M620.109 592.018L692.034 460.157C698.351 448.576 714.98 448.576 721.297 460.157L774.107 556.976L792.195 525.323C798.594 514.126 814.737 514.126 821.135 525.323L859.084 591.731C865.432 602.841 857.409 616.666 844.612 616.666H634.741C622.09 616.666 614.051 603.125 620.109 592.018Z"
                fill={stroke}
            />
            <path
                d="M839.999 433.333C839.999 451.743 825.075 466.667 806.665 466.667C788.255 466.667 773.332 451.743 773.332 433.333C773.332 414.924 788.255 400 806.665 400C825.075 400 839.999 414.924 839.999 433.333Z"
                fill={stroke}
            />
            <path
                d="M77 108.078H455"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 181.047H348.688"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 254.016H455"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 326.984H372.312"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 399.953H455"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 472.922H395.938"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 537.547H465"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 608.328H355.875"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 679.109H465"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 749.891H380.125"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 820.672H465"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 891.453H404.375"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
        </svg>
    );
};

export default OneImageSplit;
