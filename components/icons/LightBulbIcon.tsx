import React from 'react';
import { IconProps } from './Icon';

export const LightBulbIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c-1.421-.492-2.3-1.82-2.3-3.296v-1.5a6.75 6.75 0 0 1 1.09-3.837m13.82 0A6.75 6.75 0 0 1 18 12.75v1.5c0 1.476-.879 2.804-2.3 3.296M9 3.75A2.25 2.25 0 0 1 11.25 6h1.5A2.25 2.25 0 0 1 15 3.75v-1.5A2.25 2.25 0 0 1 12.75 0h-1.5A2.25 2.25 0 0 1 9 2.25v1.5Z" />
    </svg>
);