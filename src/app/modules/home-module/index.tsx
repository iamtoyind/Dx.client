/* third-party */
import React from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import useTitle from "react-use/lib/useTitle";
import Container from "@material-ui/core/Container";
/* project */
import { Search } from "app/components/Search";
import {
  createChartFromReportAtom,
  homeDisplayAtom,
  persistedReportStateAtom,
} from "app/state/recoil/atoms";
import ToggleButtons from "app/components/ToggleButton/toggleButtonGroup";
import ChartsGrid from "app/modules/home-module/components/Charts/chartsGrid";
import ReportsGrid from "app/modules/home-module/components/Reports/reportsGrid";
import DatasetsGrid from "app/modules/home-module/components/Datasets/datasetsGrid";

export default function HomeModule() {
  useTitle("DX DataXplorer");

  const [display, setDisplay] = useRecoilState(homeDisplayAtom);
  const clearPersistedReportState = useResetRecoilState(
    persistedReportStateAtom
  );
  const clearCreateChartFromReportState = useResetRecoilState(
    createChartFromReportAtom
  );
  React.useEffect(() => {
    clearPersistedReportState();
    clearCreateChartFromReportState();
  }, []);

  const displayGrid = () => {
    switch (display) {
      case "data":
        return <DatasetsGrid />;
      case "charts":
        return <ChartsGrid />;
      case "reports":
        return <ReportsGrid />;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <div
          css={`
            width: 100%;
            display: flex;
            padding-top: 130px;
            align-items: center;
            flex-direction: column;
            a {
              text-decoration: none;
            }
          `}
        >
          <img
            src="/logo.svg"
            width={244}
            height={44}
            alt="dataxplorer logo"
            css={`
              transform: scale(2);
            `}
          />
          <p
            css={`
              font-size: 16px;
              font-weight: 400;
              text-align: center;
            `}
          >
            Data exploration solution that boosts your performance
          </p>
          <Search />
          <div
            css={`
              display: flex;
              justify-content: center;
              margin: 2rem 0;
            `}
          >
            <ToggleButtons alignment={display} setAlignment={setDisplay} />
          </div>
          {displayGrid()}
        </div>
      </Container>
    </React.Fragment>
  );
}
