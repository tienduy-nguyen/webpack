export const add = (a = 1, b = 2): number => a + b;
export const treeShaking = (): void => {
  console.log('This phrase will not appear on build file');
};
