import React from 'react';
import { themeProps } from '../Icon/icon';
export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: themeProps;
}
declare const Progress: React.FC<ProgressProps>;
export default Progress;
