// import { google } from "@ai-sdk/google";
// import { streamText } from "ai";
 
// export const maxDuration = 30;
 
// export async function POST(req: Request) {
//   const { messages } = await req.json();
//   const result = streamText({
//     model: google("gemini-2.0-flash"),
//     messages,
//   });
//   return result.toTextStreamResponse();
// }

// import { google } from "@ai-sdk/google";
// import { streamText } from "ai";

// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   // Convert Assistant UI message format → Gemini compatible
//   const formattedMessages = messages.map((msg: any) => ({
//     role: msg.role,
//     content:
//       msg.parts?.map((p: any) => p.text).join(" ") ||
//       msg.content ||
//       "",
//   }));

//   // Call Gemini model
//   const response = await streamText({
//     model: google("gemini-2.0-flash"),
//     messages: formattedMessages,
//   });

//   // ✅ v5: streamText already returns a valid Response object
//   return response;
// }


// import { google } from "@ai-sdk/google";
// import { streamText } from "ai";

// export const maxDuration = 30;

// export async function POST(req: Request): Promise<Response> {
//   try {
//     const { messages } = await req.json();

//     const formattedMessages = messages.map((msg: any) => ({
//       role: msg.role,
//       content:
//         msg.parts?.map((p: any) => p.text).join(" ") ||
//         msg.content ||
//         "",
//     }));

//     const result = await streamText({
//       model: google("gemini-2.0-flash"),
//       messages: formattedMessages,
//     });

//     // 👇 Tell TypeScript that result has a stream property at runtime
//     const stream = (result as unknown as { stream: ReadableStream }).stream;

//     return new Response(stream, {
//       headers: { "Content-Type": "text/plain" },
//     });
//   } catch (error: any) {
//     console.error("Gemini route error:", error);
//     return new Response(
//       JSON.stringify({
//         error: error.message || "Internal Server Error",
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }


import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request): Promise<Response> {
  try {
    const { messages } = await req.json();

    // Convert Assistant UI message format → plain prompt
    const prompt = (messages as any[])
      .map((m) => m?.parts?.map((p: any) => p?.text).join(" ") || m?.content || "")
      .join("\n");

    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt,
    });

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Gemini route error:", err);
    return new Response(JSON.stringify({ error: err?.message || "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
