import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import svgr from '@svgr/rollup';

// eslint-disable-next-line
const packageJson = require('./package.json');

export default [
  {
    input: 'src/library/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      svgr({
        exportType: 'named',
        namedExport: 'ReactComponent',
      }),
      resolve({
        browser: true,
      }),
      peerDepsExternal(),
      json(),
      typescript({
        tsconfig: './rollup.tsconfig.json',
      }),
      commonjs(),
      terser(),
    ],
    external: ['react', 'react-dom', 'styled-components'],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
