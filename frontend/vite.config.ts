import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths"; // --> import it

export default defineConfig(() => {
   return {
      // build specific config
      plugins: [react(), tsconfigPaths()], // --> add here
      // do NOT define 'global' here... it is used in the 'else' block, below.
      define: {},
   };
});
