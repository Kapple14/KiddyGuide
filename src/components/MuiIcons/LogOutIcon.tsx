import { SvgIcon as MuiSvgIcon, styled } from "@mui/material";

const SvgIcon = styled(MuiSvgIcon, {
  name: "LogOutIcon",
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

const LogOutIcon = (props: any) => {
  return (
    <SvgIcon {...props} viewBox="0 0 512 512" focusable="false">
      <path d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256" />
    </SvgIcon>
  );
};

export default LogOutIcon;
