// 2次元リスト`array`内に特定の要素`element`が存在するならばtrueを返す
const isElementContained = <T>(array: T[][], element: T): boolean => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === element) {
        return true;
      }
    }
  }
  return false;
};

export default isElementContained;
