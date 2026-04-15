import type { FunctionComponent } from 'preact';

export type SVGIconProps = {
    width?: number | string;
    height?: number | string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number | string;
    className?: string;
}

const OnlyText: FunctionComponent<SVGIconProps> = ({
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
                d="M77 107.219H922"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 177.531H684.344"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 247.844H922"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 318.156H737.156"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 388.469H922"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 458.781H789.969"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 526.844H922"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 600.906H684.344"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 674.969H922"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 749.031H737.156"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 823.094H922"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
            <path
                d="M77 897.156H789.969"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
            />
        </svg>
    );
};

export default OnlyText;
