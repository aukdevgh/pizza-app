import { ReactNode, ButtonHTMLAttributes } from 'react';

export interface IButtonPops extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    appearence?: 'big' | 'small';
}
