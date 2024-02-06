import { SvgIcon as MuiSvgIcon, styled } from "@mui/material";

const SvgIcon = styled(MuiSvgIcon, {
  name: "ArrowDownIcon",
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

const ArrowDownIcon = (props: any) => {
  return (
    <SvgIcon {...props} viewBox="0 0 512 512" focusable="false">
      <path d="M112 184l144 144 144-144"></path>{" "}
    </SvgIcon>
  );
};

export default ArrowDownIcon;
