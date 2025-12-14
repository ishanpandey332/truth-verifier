import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  // ✅ Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    // ✅ Read request body
    const { text } = await req.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: "Text is required" }),
        { status: 400 }
      );
    }

    // ✅ Get Gemini key from ENV
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY not configured" }),
        { status: 500 }
      );
    }

    // ✅ CALL GEMINI (THIS IS THE fetch)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `
You are an expert AI content detector.

Analyze the following text and determine whether it is AI-generated or human-written.

Respond ONLY in JSON like:
{
  "verdict": "AI-generated | Human-written",
  "confidence": "0-100",
  "reason": "short explanation"
}

Text:
"""${text}"""
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    // ✅ 🔴 THIS IS "AFTER fetch" (YOUR QUESTION)
    const data = await response.json();

    const resultText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // ✅ Send response back to frontend
    return new Response(resultText || "{}", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});
