import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

const BASE_URL = 'https://viacep.com.br/ws/';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const cep = searchParams.get('code');

  if (cep?.length !== 8) {
    return Response.json({ message: 'Invalid code' }, { status: 400 });
  }

  const res = await fetch(`${BASE_URL}${cep}/json/`);
  const data = await res.json();

  if (data.erro) {
    return Response.json({ message: 'Invalid code' }, { status: 400 });
  }

  return Response.json({ data });
}
