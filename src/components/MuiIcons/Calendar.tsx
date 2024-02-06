import { SvgIcon as MuiSvgIcon, styled } from "@mui/material";

const SvgIcon = styled(MuiSvgIcon, {
  name: "CalendarIcon",
  shouldForwardProp: (prop) => prop !== "fill",
})(() => ({
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "2rem",
  viewBox: "0 0 512 512",
  focusable: "false",
}));

const CalendarIcon = (props: any) => {
  return (
    <SvgIcon {...props} viewBox="0 0 512 512" focusable="false">
      <rect x="48" y="80" width="416" height="384" rx="48" />
      <path d="M128 48v32M384 48v32M464 160H48" />
    </SvgIcon>
  );
};

export default CalendarIcon;
