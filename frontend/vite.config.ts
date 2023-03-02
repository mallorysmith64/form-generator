import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths"; // --> import it

export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'build') {
    return {
      // build specific config
      plugins: [react(), tsconfigPaths()], // --> add here
      // do NOT define 'global' here... it is used in the 'else' block, below.
      define: {
      }
    }
  } else {
    return {
      plugins: [react(), tsconfigPaths()],
      define: { 
        // By default, Vite doesn't include shims for NodeJS/
        // necessary for segment analytics lib to work
        global: {}   // it's needed here and not in the 'if' block above
      }
    }
  }
})

