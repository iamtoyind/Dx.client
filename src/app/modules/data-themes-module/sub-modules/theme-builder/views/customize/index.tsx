/* third-party */
import React from "react";
import isEmpty from "lodash/isEmpty";
import useTitle from "react-use/lib/useTitle";
import { useHistory, useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { useUpdateEffectOnce } from "app/hooks/useUpdateEffectOnce";
import { DataThemesCommonChart } from "app/modules/data-themes-module/components/common-chart";
import { CHART_DEFAULT_WIDTH } from "app/modules/data-themes-module/sub-modules/theme-builder/data";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
import { getRequiredFieldsAndErrors } from "app/modules/data-themes-module/sub-modules/theme-builder/views/mapping/utils";
import { DataThemesBuilderCustomizeProps } from "app/modules/data-themes-module/sub-modules/theme-builder/views/customize/data";

export function DataThemesBuilderCustomize(
  props: DataThemesBuilderCustomizeProps
) {
  useTitle("Data Themes - Customize");

  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const containerRef = React.useRef<HTMLDivElement>(null);

  const [nextEnabled, setNextEnabled] = React.useState<boolean>(false);

  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);
  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const stepSelectionsData = useStoreState(
    (state) => state.dataThemes.sync.stepSelections
  );
  const setActivePanels = useStoreActions(
    (state) => state.dataThemes.activePanels.setValue
  );

  React.useEffect(() => {
    // When the Customize component is rendered, we are at step 6.
    setActivePanels({
      tabIndex: activeTabIndex,
      vizIndex: activeVizIndex,
      panel: 6,
    });
  }, []);

  useUpdateEffectOnce(() => {
    if (
      containerRef.current &&
      props.visualOptions[activeTabIndex][activeVizIndex].width ===
        CHART_DEFAULT_WIDTH
    ) {
      let tmpVisualOptions = [...props.visualOptions];
      tmpVisualOptions[activeTabIndex][activeVizIndex] = {
        ...props.visualOptions[activeTabIndex][activeVizIndex],
        width: containerRef.current.clientWidth,
      };
      props.setVisualOptions(tmpVisualOptions);
    }
  }, [containerRef]);

  React.useEffect(() => {
    const { updRequiredFields, updErrors, updMinValuesFields } =
      getRequiredFieldsAndErrors(
        mapping[activeTabIndex][activeVizIndex],
        props.dimensions
      );

    setNextEnabled(
      updRequiredFields.length === 0 &&
        updErrors.length === 0 &&
        updMinValuesFields.length === 0
    );
  }, [mapping, props.dimensions]);

  if (
    (stepSelectionsData.step1[activeTabIndex][activeVizIndex].dataset ===
      null &&
      !props.loading) ||
    isEmpty(mapping[activeTabIndex][activeVizIndex])
  ) {
    history.push(`/data-themes/${page}/data`);
  }

  return (
    <div css={commonStyles.container}>
      <div css={commonStyles.innercontainer}>
        <div
          ref={containerRef}
          css={`
            width: calc(100% - 24px);
            height: calc(100vh - 225px);
          `}
        >
          <DataThemesCommonChart
            containerRef={containerRef}
            renderedChart={props.renderedChart}
            visualOptions={props.visualOptions}
            setVisualOptions={props.setVisualOptions}
            renderedChartSsr={props.renderedChartSsr}
            renderedChartMappedData={props.renderedChartMappedData}
          />
        </div>
      </div>
    </div>
  );
}