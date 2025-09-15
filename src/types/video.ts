export interface Author {
    id: string;
    name: string;
    avatarUrl: string;
}

export interface Video {
    id: string;
    title: string;
    description?: string;
    thumbnailUrl?: string;
    videoUrl?: string;
    createdAt: string;
    author?: Author;
    userId?: string;
    views?: number;     
}

