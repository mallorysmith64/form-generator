import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths"; // --> import it

export default defineConfig({
   plugins: [react(), tsconfigPaths()], // --> add here
   // define: {
   //    // By default, Vite doesn't include shims for NodeJS/
   //    // necessary for segment analytics lib to work
   //    global: {},
   // },
});
