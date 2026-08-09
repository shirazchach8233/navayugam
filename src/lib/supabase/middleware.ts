import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  if (request.nextUrl.searchParams.has("__diag")) {
    return NextResponse.json({
      hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      hasKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      urlPrefix: (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").slice(0, 20),
      keyPrefix: (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").slice(0, 20),
    });
  }

  let supabaseResponse = NextResponse.next({ request });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
    const isLoginRoute = request.nextUrl.pathname === "/admin/login";

    if (isAdminRoute && !isLoginRoute && !user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    if (isLoginRoute && user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  } catch (err) {
    return NextResponse.json(
      { middlewareError: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
