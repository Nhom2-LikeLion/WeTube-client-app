export interface Author {
    id: string;
    name: string;
    avatarUrl: string;
}

export interface Post {
    id: string;
    content: string;
    imageUrl: string;
    createdAt: string;
    likeCount: number;
    commentCount: number;
    // author: Author;
}
