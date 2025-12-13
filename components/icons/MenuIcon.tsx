import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MenuIconProps {
    size?: number;
    color?: string;
}

export default function MenuIcon({ size = 24, color = '#000000' }: MenuIconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M3 7h18M3 12h18M3 17h18"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
            />
        </Svg>
    );
}
