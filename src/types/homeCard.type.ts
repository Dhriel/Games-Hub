export interface CardProps {
    url: string;
    name: string;
    slug: string;
    rating: string | number;
    id: string;
}

export interface CaterogiesProps {
    id: string;
    name: string;
}

export interface GameDetailsProps {
    name: string;
    rating: string | number;
    id: string;
    description: string;
    background: string;
    backgroundAdditional: string;
    platforms: PlatformStoresProps[];
    stores: PlatformStoresProps[];
    genres: PlatformStoresProps[];
    link?: string;
}

export interface PlatformStoresProps {
    id: string;
    name: string;
}