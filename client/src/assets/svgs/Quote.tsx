import type { FC } from 'preact/compat';

const Quote: FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            class={className}
            width="54"
            height="36"
            viewBox="0 0 54 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M39.1678 35.4563L30.5918 35.4563L37.3758 0.000330293L53.8878 0.000331737L39.1678 35.4563ZM8.57578 35.4563L-0.000217834 35.4563L6.78379 0.000327619L23.2958 0.000329063L8.57578 35.4563Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default Quote;
