import { setAdminClaim } from '@/firebase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const uids = [
    'pcYMvNULeARPZ1MfLpExUQ7K1NO2',
    'OznCtLCdcMP0EJrATcYmjYiZX1v1',
    'EFeXWmwipWg9zy3JKkDWYw61Liq2',
  ];

  try {
    await Promise.all(uids.map(uid => setAdminClaim(uid)));
    return NextResponse.json({ message: 'Admin claims set successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set admin claims' }, { status: 500 });
  }
}
