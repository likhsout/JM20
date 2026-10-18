// Supabase client — uses real DB if env exists, else falls back to mockData (so preview still works)
let supabase = null;
let useMock = true;

try {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key && url.startsWith("https://")) {
    // Dynamic import to avoid crash if not installed
    const { createClient } = require("@supabase/supabase-js");
    supabase = createClient(url, key);
    useMock = false;
    console.log("[Supabase] Connected:", url);
  } else {
    console.log("[Supabase] No env — using mockData (preview mode)");
  }
} catch (e) {
  console.log("[Supabase] Not installed or no env — mock mode", e.message);
}

export { supabase, useMock };
