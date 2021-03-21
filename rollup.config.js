// import serve from 'rollup-plugin-serve'
// import livereload from 'rollup-plugin-livereload'
// import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete'
import json from '@rollup/plugin-json';
import html from '@rollup/plugin-html';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import nodePolyFills from 'rollup-plugin-node-polyfills';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/main.ts',
  output: [
    {
      file: 'dist/bundle.js',
      format: 'iife',
      name: 'spacetraders',
    },
    {
      file: 'dist/bundle.min.js',
      format: 'iife',
      name: 'spacetraders',
      plugins: [ terser() ]
    }
  ],
  plugins: [
    typescript(),
    del({ targets: 'public/*' }),
    json(),
    html({ title: 'Space Traders' }),
    nodeResolve({
      extensions: ["js"],
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    // babel({
    //   presets: ["@babel/preset-react"]
    // }),
    commonjs(),
    nodePolyFills()
    // serve({
    //   open: true,
    //   verbose: true,
    //   contentBase: ["", "dist"],
    //   host: "localhost",
    //   port: 3000,
    // }),
    // livereload({
    //   watch: "dist"
    // })
  ]
};