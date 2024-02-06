import { SvgIcon as MuiSvgIcon, styled } from "@mui/material";

const SvgIcon = styled(MuiSvgIcon, {
  name: "PlusIcon",
  shouldForwardProp: (prop) => prop !== "fill",
})(() => ({
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "2rem",
}));

const PlusIcon = (props: any) => {
  return (
    <SvgIcon {...props} viewBox="0 0 512 512" focusable="false">
      <path d="M256 112v288M400 256H112" />
    </SvgIcon>
  );
};

export default PlusIcon;
