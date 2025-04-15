import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

// Copy CNAME file to dist after build
const copyCNAME = () => {
  return {
    name: 'copy-cname',
    closeBundle() {
      copyFileSync(resolve(__dirname, 'CNAME'), resolve(__dirname, 'dist', 'CNAME'));
    },
  };
};

export default defineConfig({
  base: '/port/', // updated to match repository name
  plugins: [copyCNAME()],
});