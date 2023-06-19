import styled from "@emotion/styled";

export interface Props {
  color: string;
  time: number;
  trigger: boolean;
  size: number;
}

const SVGWrapper = styled.span`
  width: 110%;
  height: 20px;
  position: absolute;
  bottom: 5px;
  left: 0;
`;

const Path = styled.path<Props>`
  stroke: ${(props) => props.color};
  stroke-width: ${(props) => props.size};
  stroke-linecap: round;
  stroke-dashoffset: ${(props) => (props.trigger ? 60 : 390)};
  stroke-dasharray: 390;
  transition: all ${(props) => props.time}s;
`;

export const Underline = ({ color, size, trigger, time }: Props) => {
  return (
    <SVGWrapper>
      <svg viewBox="0 0 174 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
          color={color}
          time={time}
          trigger={trigger}
          size={size}
          d="M2.184 7.404c17.923 0 24.462-2.474 40.922-2.943 8.028-.229 59.438-1.148 64.175-1.368 14.133-.657 36.013-1.744 62.608 4.311 8.092 1.843-25.485-.13-36.391 1.046-15.655 1.69-32.732 2.346-49.015 2.85-13.589.421-53.558.512-64.376.786"
        />
      </svg>
    </SVGWrapper>
  );
};
