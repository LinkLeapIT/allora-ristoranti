// src/app/debug/page.tsx
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic'; // Ensure this is always server-rendered

export default function DebugPage() {
  const commitHash = process.env.NEXT_PUBLIC_COMMIT_SHA || 'Not set';
  const deployedAt = process.env.NEXT_PUBLIC_DEPLOY_TIMESTAMP || 'Not set';
  const nodeEnv = process.env.NODE_ENV;

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h2>🔍 Deployment Debug Info</h2>
      <p><strong>Commit Hash:</strong> {commitHash}</p>
      <p><strong>Deployed At:</strong> {deployedAt}</p>
      <p><strong>Environment:</strong> {nodeEnv}</p>
    </div>
  );
}
