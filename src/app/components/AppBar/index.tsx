import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import Toolbar from "@material-ui/core/Toolbar";
import MUIAppBar from "@material-ui/core/AppBar";
import MenuItem from "@material-ui/core/MenuItem";
import { useCMSData } from "app/hooks/useCMSData";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import { headercss } from "app/components/AppBar/style";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import { homeTabStateAtom } from "app/state/recoil/atoms";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconChevronLeft from "@material-ui/icons/ChevronLeft";
import { MobileAppbarSearch } from "app/components/Mobile/AppBarSearch";
import { NavLink, useLocation, useHistory, Link } from "react-router-dom";

const TextHeader = (label: string) => (
  <h2
    css={`
      font-size: 18px;
      font-weight: bold;
      font-family: "Inter", "Helvetica Neue", sans-serif;
    `}
  >
    {label}
  </h2>
);

function MobileHeader() {
  const history = useHistory();

  return (
    <React.Fragment>
      <IconButton
        onClick={() => history.goBack()}
        css={`
          padding-left: 0;
        `}
      >
        <IconChevronLeft htmlColor="#fff" />
      </IconButton>
      <MobileAppbarSearch />
    </React.Fragment>
  );
}

export const StyledMenu = withStyles({
  paper: {
    minWidth: 220,
    borderRadius: "0 0 10px 10px",
    boxShadow: "0px 0px 10px rgba(152, 161, 170, 0.6)",
    "&::-webkit-scrollbar": {
      width: 5,
      borderRadius: 10,
      background: "#231d2c",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: 10,
      background: "#dfe3e6",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 10,
      background: "#231d2c",
    },
  },
  list: {
    padding: 0,
    maxHeight: 500,
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    autoFocus={false}
    {...props}
  />
));

export const StyledMenuItem = withStyles(() => ({
  root: {
    padding: 0,
    width: "100%",
    borderBottom: "1px solid #DFE3E6",
    "& a": {
      width: "100%",
      fontSize: "14px",
      color: "#231d2c",
      padding: "10px 12px",
      textDecoration: "none",
    },
  },
}))(MenuItem);

export function AppBar() {
  const location = useLocation();
  const cmsData = useCMSData({ returnData: true });
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [openSearch, setOpenSearch] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [tabState, setTabState] = useRecoilState<"data" | "charts" | "report">(
    homeTabStateAtom
  );

  function handleClose() {
    setAnchorEl(null);
  }

  function getMobilePageHeader() {
    switch (location.pathname) {
      case "/about":
        return TextHeader(get(cmsData, "componentsAppBar.about", ""));
      case "/datasets":
        return (
          <React.Fragment>
            {TextHeader("Explore")}
            <MobileAppbarSearch />
          </React.Fragment>
        );
      default:
        return <MobileHeader />;
    }
  }

  React.useEffect(() => {
    if (anchorEl) {
      handleClose();
    }
    if (openSearch) {
      setOpenSearch(false);
    }
  }, [location.pathname]);

  if (location.pathname === "/" && isMobile) {
    return <React.Fragment />;
  }

  return (
    <MUIAppBar
      elevation={0}
      position="fixed"
      color="secondary"
      css={`
        display: flex;
      `}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          variant="dense"
          css={`
            gap: 32px;
            width: 100%;
            height: 48px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          `}
        >
          {isMobile && getMobilePageHeader()}
          {!isMobile && (
            <div css={headercss}>
              <div
                css={`
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                `}
              >
                <NavLink
                  to="/"
                  css={`
                    gap: 2.5rem;
                    display: flex;
                    padding-top: 5px;
                    margin-right: 180px;
                    justify-content: center;
                  `}
                >
                  <img
                    src="/logo.svg"
                    alt={get(cmsData, "componentsAppBar.logoAlt", "")}
                  />
                </NavLink>
                <div
                  css={`
                    gap: 2.5rem;
                    display: flex;
                    justify-content: center;

                    > div {
                      font-size: 14px;
                      font-weight: 700;

                      &:hover {
                        color: #cea8bc;
                        cursor: pointer;
                      }
                    }
                  `}
                >
                  <div
                    css={`
                      color: ${tabState === "data" ? "#cea8bc" : "#231d2c"};
                    `}
                    onClick={() => setTabState("data")}
                  >
                    Data
                  </div>
                  <div
                    css={`
                      color: ${tabState === "charts" ? "#cea8bc" : "#231d2c"};
                    `}
                    onClick={() => setTabState("charts")}
                  >
                    Charts
                  </div>
                  <div
                    css={`
                      color: ${tabState === "report" ? "#cea8bc" : "#231d2c"};
                    `}
                    onClick={() => setTabState("report")}
                  >
                    Reports
                  </div>
                </div>
              </div>
              <button>Log in</button>
            </div>
          )}
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
}
