import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
        preferBuiltins: false,
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist',
        rootDir: './src',
        exclude: ['**/*.test.ts', '**/*.test.tsx'],
        include: ['src/**/*'],
      }),
    ],
    external: [
      'react',
      'react-native',
      'expo',
      'expo-linear-gradient',
      'expo-screen-orientation',
      '@expo/vector-icons',
      'react-native-reanimated',
      'react-native-gesture-handler',
    ],
  },
];

export default config;