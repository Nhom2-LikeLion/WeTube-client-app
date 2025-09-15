// import { NextRequest, NextResponse } from "next/server";
// import { AccessToken } from "livekit-server-sdk";
//
// export async function POST(req: NextRequest) {
//     try {
//         const { roomName, userId } = await req.json();
//
//         if (!roomName || !userId) {
//             return NextResponse.json({ error: "roomName and userId are required" }, { status: 400 });
//         }
//
//         const apiKey = process.env.LIVEKIT_API_KEY;
//         const apiSecret = process.env.LIVEKIT_API_SECRET;
//
//         if (!apiKey || !apiSecret) {
//             return NextResponse.json(
//                 { error: "LIVEKIT_API_KEY and LIVEKIT_API_SECRET must be set in env" },
//                 { status: 500 }
//             );
//         }
//
//         const at = new AccessToken(apiKey, apiSecret, { identity: userId });
//         at.addGrant({
//             room: roomName,
//             roomJoin: true,
//             canPublish: true,
//             canSubscribe: true,
//             canPublishData: true,
//         });
//
//         const token = at.toJwt();
//
//         return NextResponse.json({ token });
//     } catch (err: any) {
//         console.error("Error creating token:", err);
//         return NextResponse.json({ error: "Failed to create token" }, { status: 500 });
//     }
// }
