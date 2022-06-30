import { useEffect, useLayoutEffect, useState } from "react";

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};

const useAnyKeyToRender = () => {
  const forceUpdate = useForceUpdate();
  // keydownイベントハンドラにforceUpdateを指定
  useEffect(() => {
    window.addEventListener("keydown", forceUpdate); //
    return () => window.removeEventListener("keydown", forceUpdate);
  }, []);
};

// コンポーネント表示前に、ブラウザのウィンドウサイズを取得するフック
const useWindowSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const resize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useLayoutEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);
  return [width, height];
};

// コンポーネント表示前に、マウスの座標を取得する
const useMousePosition = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const setPosition = ({ x, y }: { x: number; y: number }) => {
    setX(x);
    setY(y);
  };
  useLayoutEffect(() => {
    window.addEventListener("mousemove", setPosition);
    return () => window.removeEventListener("mousemove", setPosition);
  }, []);
  return [x, y];
};

export { useForceUpdate, useAnyKeyToRender, useWindowSize, useMousePosition };
