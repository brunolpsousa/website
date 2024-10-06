import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest): NextResponse | undefined {
  if (
    ['cv', 'curriculo', 'resume'].some((e) =>
      request.nextUrl.pathname.includes(e),
    )
  ) {
    return NextResponse.redirect(new URL('/curriculum', request.url));
  }
}

export const config = {
  matcher: '/(.*)',
};
