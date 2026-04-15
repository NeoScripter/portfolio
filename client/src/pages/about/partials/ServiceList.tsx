import checkMotionPreferences from '@/lib/helpers/checkMotionPreference';
import { useEffect, useRef, useState } from 'preact/hooks';
import { services } from '../data';
import ServiceItem from './ServiceItem';

const ServiceList = () => {
    const [active, setActive] = useState(0);
    const [offset, setOffset] = useState(3);
    const isMotionEnabled = checkMotionPreferences();

    const handleMouseEnter = (idx: number) => {
        setActive(idx);
    };
    const handleMouseLeave = () => {
        setActive(0);
    };

    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isMotionEnabled) {
            return;
        }
        intervalRef.current = setInterval(() => {
            setOffset((prev) => (prev < services.length - 1 ? prev + 1 : 3));
        }, 5000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isMotionEnabled]);

    return (
        <ul class="mx-auto grid w-fit justify-items-center gap-11 sm:gap-6 lg:max-w-142 xl:mr-0 xl:gap-9 2xl:max-w-189">
            {services.slice(offset - 3, offset).map((service, idx) => (
                <ServiceItem
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={() => handleMouseLeave()}
                    key={service.id}
                    active={active === idx}
                    service={service}
                    fadingIn={idx === 2}
                    fadingOut={idx === 0}
                    slidingUp1={idx === 1}
                    slidingUp2={idx === 2}
                />
            ))}
        </ul>
    );
};

export default ServiceList;
