'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';

const jodBlue: MantineColorsTuple = [
  '#eef6fc',
  '#dce8f3',
  '#b3d0e8',
  '#88b7de',
  '#66a1d6',
  '#5193d1',
  '#458dd0',
  '#3779b9',
  '#2c6ca5',
  '#1b5d93',
];

const jodDarkBlue: MantineColorsTuple = [
  '#f2f4f8',
  '#e3e5ea',
  '#c2c9d5',
  '#9fabc1',
  '#8191b0',
  '#6f81a5',
  '#6479a1',
  '#54678e',
  '#495b7f',
  '#29364e',
];

export const theme = createTheme({
  /* Put your mantine theme override here */
  colors: {
    jodBlue,
    jodDarkBlue,
  },
});

// menu sidebar blue color: #29364E = #3c4f72
// background page: #E9F3FB = #eef6fc
