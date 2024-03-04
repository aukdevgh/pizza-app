import { HTMLAttributes, ReactNode } from 'react';

export interface IHeadlingProps extends HTMLAttributes<HTMLHeadElement> {
    children: ReactNode;
}
