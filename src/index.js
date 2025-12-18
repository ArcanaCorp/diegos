import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { routers } from "./app/routers";
import { Providers } from "./app/providers";


import '@/shared/css/global.css'
import '@/shared/css/system.css'

createRoot(document.getElementById('root')).render(
    <>
        <Providers>
            <RouterProvider router={routers} />
        </Providers>
    </>
)


if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("✅ SW registrado"))
      .catch(err => console.error("❌ SW error", err));
}