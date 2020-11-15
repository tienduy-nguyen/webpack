export const add = (a = 1, b = 2) => a + b;
export const treeShaking = () => {
  console.log('This phrase will be not in the build file');
};
