import { Suspense } from "react";
import Buy_Now_Client from './Buy_Now_Client.jsx';

export default function Buy_Now() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <Buy_Now_Client />
    </Suspense>
  );
}
