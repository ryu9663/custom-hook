import { useEffect, useState } from "react";
import styled from "styled-components";

function Toast({
  type,
  string,
  time = 2000,
}: {
  type: boolean;
  string: string;
  time: number;
}) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const timeOut = setTimeout(() => setOn(false), time);
    return () => clearTimeout(timeOut);
  }, []);
  if (on) return <Wrapper type={type}>{string}</Wrapper>;
  else return null;
}

export default Toast;

const Wrapper = styled.div<{ type: boolean }>`
  background: ${({ type }) => (type ? "blue" : "red")};
  width: 400px;
  height: 100px;
  padding: 30px;
`;
