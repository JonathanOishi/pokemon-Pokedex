import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function HeartIcon({ size = 24, color = '#e11d48', filled = false }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M12.001 4.529c2.349-4.043 12-2.007 12 3.397 0 3.53-3.4 6.43-8.55 11.54l-1.45 1.34-1.45-1.34C3.4 14.356 0 11.456 0 7.926c0-5.404 9.651-7.44 12-3.397z"
                fill={filled ? color : 'none'}
                stroke={color}
                strokeWidth={2}
                strokeLinejoin="round"
            />
        </Svg>
    );
}
