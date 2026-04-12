import type { Component, ComponentChildren } from 'preact';

export type NodeProps<P = {}> = P & {
    children?: ComponentChildren | string;
    className?: string;
};

export type ImageSrcSet = {
    dk: string;
    dkAvif?: string;
    dk2x?: string;
    dkAvif2x?: string;
    dk3x?: string;
    dkAvif3x?: string;
    dkTiny?: string;
    tb: string;
    tbAvif?: string;
    tb2x?: string;
    tbAvif2x?: string;
    tb3x?: string;
    tbAvif3x?: string;
    tbTiny?: string;
    mb: string;
    mbAvif?: string;
    mb2x?: string;
    mbAvif2x?: string;
    mb3x?: string;
    mbAvif3x?: string;
    mbTiny?: string;
};

export type ImageType = {
    srcSet: ImageSrcSet;
    alt:
        | {
              ru: string;
              en: string;
          }
        | undefined;
};

export type RouteMatch = {
    path: string;
    component: (() => Component | null) & { name: string; length: number };
    query: Record<string, string>;
    params: Record<string, string>;
    rest: string;
};
