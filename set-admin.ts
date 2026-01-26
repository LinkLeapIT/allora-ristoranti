import { setAdminClaim } from './src/firebase/server';

// Add the UIDs of the users you want to make admins
const uids = [
  'pcYMvNULeARPZ1MfLpExUQ7K1NO2',
  'OznCtLCdcMP0EJrATcYmjYiZX1v1',
  'EFeXWmwipWg9zy3JKkDWYw61Liq2',
  // Add more UIDs as needed
];

const promises = uids.map(uid => setAdminClaim(uid));

Promise.all(promises)
  .then(() => {
    console.log('Admin claims set successfully for all users');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error setting admin claims:', error);
    process.exit(1);
  });
