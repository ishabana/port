import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync } from 'fs';
import * as fs from 'fs';

// Copy CNAME file to dist after build
const copyCNAME = () => {
  return {
    name: 'copy-cname',
    closeBundle() {
      const cnamePath = resolve(__dirname, 'CNAME');
      const distCnamePath = resolve(__dirname, 'docs', 'CNAME');
      if (fs.existsSync(cnamePath)) {
        copyFileSync(cnamePath, distCnamePath);
      } else {
        console.warn('CNAME file not found. Skipping copy.');
      }
    },
  };
};

export default defineConfig({
  base: '/', // Set base to '/' for custom domain
  build: {
    outDir: 'docs', // Set output directory to 'docs/' for GitHub Pages
  },
  plugins: [copyCNAME()],
});