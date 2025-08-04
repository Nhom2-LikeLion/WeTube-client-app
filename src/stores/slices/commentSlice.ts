// import { StateCreator } from 'zustand';
// import { Comment, CommentSortOption } from '@/modules/watch/types/comment.types';

// export interface CommentSlice {
//   // State
//   comments: {
//     byVideoId: Record<string, {
//       items: Comment[];
//       totalCount: number;
//       isLoading: boolean;
//       hasMore: boolean;
//       sortBy: CommentSortOption['value'];
//       error: string | null;
//       lastFetched: number | null;
//     }>;
//     replyStates: Record<string, {
//       isLoading: boolean;
//       isExpanded: boolean;
//       replies: Comment[];
//     }>;
//   };

//   // Actions
//   commentActions: {
//     // Comment CRUD operations
//     setComments: (videoId: string, comments: Comment[]) => void;
//     addComment: (videoId: string, comment: Comment) => void;
//     updateComment: (videoId: string, commentId: string, updates: Partial<Comment>) => void;
//     deleteComment: (videoId: string, commentId: string) => void;
    
//     // Reply operations
//     addReply: (videoId: string, parentId: string, reply: Comment) => void;
//     toggleReplies: (commentId: string) => void;
//     setRepliesLoading: (commentId: string, isLoading: boolean) => void;
    
//     // Bulk operations with deep merge
//     updateCommentState: (videoId: string, updates: {
//       items?: Comment[];
//       totalCount?: number;
//       isLoading?: boolean;
//       hasMore?: boolean;
//       sortBy?: CommentSortOption['value'];
//       error?: string | null;
//     }) => void;
    
//     // Like/dislike operations
//     toggleCommentLike: (videoId: string, commentId: string) => void;
//     toggleCommentDislike: (videoId: string, commentId: string) => void;
    
//     // Utility actions
//     clearComments: (videoId: string) => void;
//     setSortBy: (videoId: string, sortBy: CommentSortOption['value']) => void;
//   };
// }

// export const createCommentSlice: StateCreator<
//   CommentSlice,
//   [['zustand/immer', never]],
//   [],
//   CommentSlice
// > = (set, get) => ({
//   comments: {
//     byVideoId: {},
//     replyStates: {},
//   },

//   commentActions: {
//     setComments: (videoId, comments) =>
//       set((state) => {
//         if (!state.comments.byVideoId[videoId]) {
//           state.comments.byVideoId[videoId] = {
//             items: [],
//             totalCount: 0,
//             isLoading: false,
//             hasMore: true,
//             sortBy: 'top',
//             error: null,
//             lastFetched: null,
//           };
//         }
//         state.comments.byVideoId[videoId].items = comments;
//         state.comments.byVideoId[videoId].lastFetched = Date.now();
//       }),

//     addComment: (videoId, comment) =>
//       set((state) => {
//         if (!state.comments.byVideoId[videoId]) {
//           state.comments.byVideoId[videoId] = {
//             items: [],
//             totalCount: 0,
//             isLoading: false,
//             hasMore: true,
//             sortBy: 'top',
//             error: null,
//             lastFetched: null,
//           };
//         }
//         state.comments.byVideoId[videoId].items.unshift(comment);
//         state.comments.byVideoId[videoId].totalCount += 1;
//       }),

//     updateComment: (videoId, commentId, updates) =>
//       set((state) => {
//         const videoComments = state.comments.byVideoId[videoId];
//         if (!videoComments) return;

//         const commentIndex = videoComments.items.findIndex(c => c.id === commentId);
//         if (commentIndex !== -1) {
//           // Shallow merge updates
//           Object.assign(videoComments.items[commentIndex], updates);
//         }
//       }),

//     deleteComment: (videoId, commentId) =>
//       set((state) => {
//         const videoComments = state.comments.byVideoId[videoId];
//         if (!videoComments) return;

//         videoComments.items = videoComments.items.filter(c => c.id !== commentId);
//         videoComments.totalCount = Math.max(0, videoComments.totalCount - 1);
//       }),

//     addReply: (videoId, parentId, reply) =>
//       set((state) => {
//         const videoComments = state.comments.byVideoId[videoId];
//         if (!videoComments) return;

//         const parentComment = videoComments.items.find(c => c.id === parentId);
//         if (parentComment) {
//           if (!parentComment.replies) {
//             parentComment.replies = [];
//           }
//           parentComment.replies.push(reply);
//           parentComment.replyCount += 1;
//         }
//       }),

//     toggleReplies: (commentId) =>
//       set((state) => {
//         if (!state.comments.replyStates[commentId]) {
//           state.comments.replyStates[commentId] = {
//             isLoading: false,
//             isExpanded: false,
//             replies: [],
//           };
//         }
//         state.comments.replyStates[commentId].isExpanded = 
//           !state.comments.replyStates[commentId].isExpanded;
//       }),

//     setRepliesLoading: (commentId, isLoading) =>
//       set((state) => {
//         if (!state.comments.replyStates[commentId]) {
//           state.comments.replyStates[commentId] = {
//             isLoading: false,
//             isExpanded: false,
//             replies: [],
//           };
//         }
//         state.comments.replyStates[commentId].isLoading = isLoading;
//       }),

//     // Deep merge for complex state updates
//     updateCommentState: (videoId, updates) =>
//       set((state) => {
//         if (!state.comments.byVideoId[videoId]) {
//           state.comments.byVideoId[videoId] = {
//             items: [],
//             totalCount: 0,
//             isLoading: false,
//             hasMore: true,
//             sortBy: 'top',
//             error: null,
//             lastFetched: null,
//           };
//         }
        
//         // Deep merge updates
//         Object.assign(state.comments.byVideoId[videoId], updates);
//       }),

//     toggleCommentLike: (videoId, commentId) =>
//       set((state) => {
//         const videoComments = state.comments.byVideoId[videoId];
//         if (!videoComments) return;

//         const comment = videoComments.items.find(c => c.id === commentId);
//         if (comment) {
//           if (comment.isLiked) {
//             comment.isLiked = false;
//             comment.likes = Math.max(0, comment.likes - 1);
//           } else {
//             comment.isLiked = true;
//             comment.likes += 1;
//             if (comment.isDisliked) {
//               comment.isDisliked = false;
//               comment.dislikes = Math.max(0, comment.dislikes - 1);
//             }
//           }
//         }
//       }),

//     toggleCommentDislike: (videoId, commentId) =>
//       set((state) => {
//         const videoComments = state.comments.byVideoId[videoId];
//         if (!videoComments) return;

//         const comment = videoComments.items.find(c => c.id === commentId);
//         if (comment) {
//           if (comment.isDisliked) {
//             comment.isDisliked = false;
//             comment.dislikes = Math.max(0, comment.dislikes - 1);
//           } else {
//             comment.isDisliked = true;
//             comment.dislikes += 1;
//             if (comment.isLiked) {
//               comment.isLiked = false;
//               comment.likes = Math.max(0, comment.likes - 1);
//             }
//           }
//         }
//       }),

//     clearComments: (videoId) =>
//       set((state) => {
//         delete state.comments.byVideoId[videoId];
//       }),

//     setSortBy: (videoId, sortBy) =>
//       set((state) => {
//         if (state.comments.byVideoId[videoId]) {
//           state.comments.byVideoId[videoId].sortBy = sortBy;
//         }
//       }),
//   },
// });