/* third-party */
import React from "react";
import get from "lodash/get";
import { DndProvider } from "react-dnd";
import findIndex from "lodash/findIndex";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSessionStorage, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams,
  Redirect,
} from "react-router-dom";
import {
  parseDataset,
  getOptionsConfig,
  getDefaultOptionsValues,
  // @ts-ignore
} from "@rawgraphs/rawgraphs-core";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { NoMatchPage } from "app/modules/common/no-match-page";
import { useDataThemesRawData } from "app/hooks/useDataThemesRawData";
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import { DataThemesPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
import { DataThemesAlertDialog } from "app/modules/data-themes-module/components/alert-dialog";
import { DataThemesTabOrderViz } from "app/modules/data-themes-module/components/order-tab-viz";
import { DataThemesAddSectionButton } from "app/modules/data-themes-module/components/add-section-button";
import { DataThemesBuilderDataView } from "app/modules/data-themes-module/sub-modules/theme-builder/views/data";
import { DataThemesBuilderMapping } from "app/modules/data-themes-module/sub-modules/theme-builder/views/mapping";
import { DataThemesBuilderPreview } from "app/modules/data-themes-module/sub-modules/theme-builder/views/preview";
import { DataThemesBuilderFilters } from "app/modules/data-themes-module/sub-modules/theme-builder/views/filters";
import { DataThemesBuilderCustomize } from "app/modules/data-themes-module/sub-modules/theme-builder/views/customize";
import { DataThemesBuilderInitialView } from "app/modules/data-themes-module/sub-modules/theme-builder/views/initial";
import { DataThemesBuilderChartType } from "app/modules/data-themes-module/sub-modules/theme-builder/views/chart-type";
import { DataThemesBuilderPreviewTheme } from "app/modules/data-themes-module/sub-modules/theme-builder/views/preview-theme";
import { DataThemesBuilderTextView } from "app/modules/data-themes-module/sub-modules/theme-builder/views/text";
import { DataThemesBuilderExport } from "app/modules/data-themes-module/sub-modules/theme-builder/views/export";
import { DataThemesBuilderLock } from "app/modules/data-themes-module/sub-modules/theme-builder/views/lock";
import {
  charts,
  emptyDataThemeAPI,
  DataThemeAPIModel,
  defaultChartOptions,
} from "app/modules/data-themes-module/sub-modules/theme-builder/data";

export function DataThemesBuilder() {
  const history = useHistory();
  const location = useLocation();
  const { page, view } = useParams<{ page: string; view?: string }>();

  const [currentChart, setCurrentChart] = React.useState([[{}]]);
  const [isEditMode, setIsEditMode] = React.useState(page !== "new");
  const [currentChartData, setCurrentChartData] = React.useState([[{}]]);
  const [visualOptions, setVisualOptions] = useSessionStorage<any>(
    "visualOptions",
    [[{}]]
  );

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const themeIds = useStoreState((state) => state.dataThemes.ids.value);
  const activePanels = useStoreState(
    (state) => state.dataThemes.activePanels.value
  );
  const vizIsTextContent = useStoreState(
    (state) => state.dataThemes.textContent.vizIsTextContent
  );

  const {
    loading,
    clearStore,
    loadingData,
    loadDataset,
    filteredData,
    rawData,
    setIsInSession,
    setRawData,
    setFilteredData,
  } = useDataThemesRawData({
    visualOptions,
    setVisualOptions,
    currentChart,
    setCurrentChart,
    currentChartData,
    setCurrentChartData,
    updateLocalStates,
  });

  const selectedChartType = useStoreState(
    (state) => state.dataThemes.sync.chartType.value
  );
  const isSaveLoading = useStoreState(
    (state) => state.dataThemes.DataThemeCreate.loading
  );
  const isDataThemeLoading = useStoreState(
    (state) => state.dataThemes.DataThemeGet.loading
  );

  const loadDataTheme = useStoreActions(
    (actions) => actions.dataThemes.DataThemeGet.fetch
  );
  const loadedDataTheme = useStoreState(
    (state) =>
      (state.dataThemes.DataThemeGet.crudData ??
        emptyDataThemeAPI) as DataThemeAPIModel
  );
  const clearDataTheme = useStoreActions(
    (actions) => actions.dataThemes.DataThemeGet.clear
  );
  const resetAppliedFilters = useStoreActions(
    (actions) => actions.dataThemes.appliedFilters.reset
  );
  const resetMapping = useStoreActions(
    (actions) => actions.dataThemes.sync.mapping.reset
  );
  const resetIsLiveData = useStoreActions(
    (actions) => actions.dataThemes.sync.liveData.reset
  );
  const resetSelectedChartType = useStoreActions(
    (actions) => actions.dataThemes.sync.chartType.reset
  );
  const stepSelectionsActions = useStoreActions(
    (actions) => actions.dataThemes.sync.stepSelections
  );
  const resetActiveTabIndex = useStoreActions(
    (actions) => actions.dataThemes.activeTabIndex.reset
  );
  const resetActiveVizIndex = useStoreActions(
    (actions) => actions.dataThemes.activeVizIndex.reset
  );
  const resetThemeIds = useStoreActions(
    (actions) => actions.dataThemes.ids.reset
  );
  const resetActivePanels = useStoreActions(
    (actions) => actions.dataThemes.activePanels.reset
  );
  const resetTitles = useStoreActions(
    (actions) => actions.dataThemes.titles.reset
  );
  const resetTextContent = useStoreActions(
    (actions) => actions.dataThemes.textContent.reset
  );
  const removeVizId = useStoreActions(
    (state) => state.dataThemes.ids.removeViz
  );
  const removeVizMapping = useStoreActions(
    (actions) => actions.dataThemes.sync.mapping.removeViz
  );
  const removeVizActivePanel = useStoreActions(
    (state) => state.dataThemes.activePanels.removeViz
  );
  const removeVizChartType = useStoreActions(
    (state) => state.dataThemes.sync.chartType.removeViz
  );
  const removeVizLiveData = useStoreActions(
    (state) => state.dataThemes.sync.liveData.removeViz
  );
  const removeVizStepSelections = useStoreActions(
    (state) => state.dataThemes.sync.stepSelections.removeViz
  );
  const removeVizAppliedFilters = useStoreActions(
    (state) => state.dataThemes.appliedFilters.removeViz
  );
  const removeVizTextContent = useStoreActions(
    (state) => state.dataThemes.textContent.removeViz
  );
  const clearOrderData = useStoreActions(
    (actions) => actions.dataThemes.sync.vizOrderData.clear
  );
  const setTitle = useStoreActions(
    (actions) => actions.dataThemes.titles.setTitle
  );
  const setSubTitle = useStoreActions(
    (actions) => actions.dataThemes.titles.setSubTitle
  );
  const setVizDeleted = useStoreActions(
    (actions) => actions.dataThemes.sync.vizDeleted.setValue
  );
  const setVizDuplicated = useStoreActions(
    (actions) => actions.dataThemes.sync.vizDuplicated.setValue
  );
  const copyVizId = useStoreActions((state) => state.dataThemes.ids.addViz);
  const copyVizActivePanel = useStoreActions(
    (state) => state.dataThemes.activePanels.addViz
  );
  const copyVizChartType = useStoreActions(
    (state) => state.dataThemes.sync.chartType.copyViz
  );
  const copyVizLiveData = useStoreActions(
    (state) => state.dataThemes.sync.liveData.copyViz
  );
  const copyVizMapping = useStoreActions(
    (state) => state.dataThemes.sync.mapping.copyViz
  );
  const copyVizStepSelections = useStoreActions(
    (state) => state.dataThemes.sync.stepSelections.copyViz
  );
  const copyVizAppliedFilters = useStoreActions(
    (state) => state.dataThemes.appliedFilters.copyViz
  );
  const copyVizTextContent = useStoreActions(
    (state) => state.dataThemes.textContent.copyViz
  );

  function setVisualOptionsOnChange() {
    let tmpCurrentChart: any = [...currentChart];
    tmpCurrentChart[activeTabIndex][activeVizIndex] = get(
      charts,
      selectedChartType[activeTabIndex][activeVizIndex] || "barchart",
      null
    );
    setCurrentChart(tmpCurrentChart);
    const options = {
      ...getOptionsConfig(
        get(
          charts,
          selectedChartType[activeTabIndex][activeVizIndex] || "barchart",
          charts.barchart
        ).visualOptions
      ),
      ...get(
        defaultChartOptions,
        selectedChartType[activeTabIndex][activeVizIndex] || "barchart",
        {}
      ),
    };
    const defaultOptionsValues = getDefaultOptionsValues(options);

    let tmpVisualOptions: any = [...visualOptions];
    if (visualOptions[activeTabIndex][activeVizIndex] === undefined) {
      visualOptions[activeTabIndex][activeVizIndex] = {
        ...defaultOptionsValues,
      };
    }
    tmpVisualOptions[activeTabIndex][activeVizIndex] = {
      ...defaultOptionsValues,
      ...visualOptions[activeTabIndex][activeVizIndex],
      width:
        !visualOptions[activeTabIndex][activeVizIndex].width ||
        visualOptions[activeTabIndex][activeVizIndex].width ===
          defaultOptionsValues.width
          ? defaultOptionsValues.width
          : visualOptions[activeTabIndex][activeVizIndex].width,
    };
    setVisualOptions(tmpVisualOptions);
  }

  function updateLocalStates(addTab?: boolean) {
    if (addTab) {
      let tmpVisualOptions: any = [...visualOptions];
      tmpVisualOptions.push([{}]);
      setVisualOptions(tmpVisualOptions);
    }
    setCurrentChart((prev) => [...prev, []]);
    setCurrentChartData((prev) => [...prev, []]);
    setFilteredData((prev) => [...prev, [[]]]);
    setRawData((prev) => [
      ...prev,
      [
        {
          id: 0,
          count: 0,
          data: [],
          filterOptionGroups: [],
        },
      ],
    ]);
  }

  function addVizToLocalStates() {
    let tmpVisualOptions: any = [...visualOptions];
    tmpVisualOptions[activeTabIndex].push({});
    setVisualOptions(tmpVisualOptions);

    let tmpCurrentChart: any = [...currentChart];
    tmpCurrentChart[activeTabIndex].push(undefined);
    setCurrentChart(tmpCurrentChart);

    let tmpCurrentChartData: any = [...currentChartData];
    tmpCurrentChartData[activeTabIndex].push(undefined);
    setCurrentChartData(tmpCurrentChartData);
    let tmpRawData = [...rawData];
    tmpRawData[activeTabIndex].push({
      id: 0,
      count: 0,
      data: [],
      filterOptionGroups: [],
    });
    setRawData(tmpRawData);
  }

  function duplicateViz(tabIndex: number, vizIndex: number) {
    copyVizId({ tabIndex });
    copyVizActivePanel({ tabIndex });
    copyVizChartType({ tabIndex, vizIndex });
    copyVizLiveData({ tabIndex, vizIndex });
    copyVizMapping({ tabIndex, vizIndex });
    copyVizStepSelections({ tabIndex, vizIndex });
    copyVizAppliedFilters({ tabIndex, vizIndex });
    copyVizTextContent({ tabIndex, vizIndex });

    let tmpVisualOptions: any = [...visualOptions];
    tmpVisualOptions[tabIndex].push(tmpVisualOptions[tabIndex][vizIndex]);
    setVisualOptions(tmpVisualOptions);

    let tmpCurrentChart: any = [...currentChart];
    tmpCurrentChart[tabIndex].push(tmpCurrentChart[tabIndex][vizIndex]);
    setCurrentChart(tmpCurrentChart);

    let tmpCurrentChartData: any = [...currentChartData];
    tmpCurrentChartData[tabIndex].push(tmpCurrentChartData[tabIndex][vizIndex]);
    setCurrentChartData(tmpCurrentChartData);
    let tmpRawData = [...rawData];
    tmpRawData[tabIndex].push(tmpRawData[tabIndex][vizIndex]);
    setRawData(tmpRawData);
    setVizDuplicated(true);
  }

  function deleteViz(tabIndex: number, vizIndex: number) {
    let tmpRawData = [...rawData];
    let tmpVisualOptions: any = [...visualOptions];
    let tmpCurrentChartData: any = [...currentChartData];
    if (
      tmpRawData[tabIndex] &&
      tmpRawData[tabIndex][vizIndex] &&
      tmpVisualOptions[tabIndex] &&
      tmpVisualOptions[tabIndex][vizIndex] &&
      tmpCurrentChartData[tabIndex] &&
      tmpCurrentChartData[tabIndex][vizIndex]
    ) {
      tmpRawData[tabIndex].splice(vizIndex, 1);
      setRawData(tmpRawData);
      tmpVisualOptions[tabIndex].splice(vizIndex, 1);
      setVisualOptions(tmpVisualOptions);
      tmpCurrentChartData[tabIndex].splice(vizIndex, 1);
      setCurrentChartData(tmpCurrentChartData);
      removeVizId({ tabIndex, vizIndex });
      removeVizActivePanel({ tabIndex, vizIndex });
      removeVizChartType({ tabIndex, vizIndex });
      removeVizLiveData({ tabIndex, vizIndex });
      removeVizMapping({ tabIndex, vizIndex });
      removeVizStepSelections({ tabIndex, vizIndex });
      removeVizAppliedFilters({ tabIndex, vizIndex });
      removeVizTextContent({ tabIndex, vizIndex });
    }
    if (tmpRawData[tabIndex].length === 0) {
      addVizToLocalStates();
      history.push(`/data-themes/${page}/initial`);
    } else {
      setVizDeleted(true);
    }
  }

  async function clear() {
    sessionStorage.setItem("visualOptions", JSON.stringify([[{}]]));
    setRawData([
      [
        {
          id: 0,
          count: 0,
          data: [],
          filterOptionGroups: [],
        },
      ],
    ]);
    setFilteredData([[[]]]);
    setCurrentChart([[]]);
    setCurrentChartData([[]]);
    resetActiveTabIndex();
    resetActiveVizIndex();
    resetActivePanels();
    resetThemeIds();
    resetMapping();
    resetIsLiveData();
    resetSelectedChartType();
    resetTitles();
    resetTextContent();
    stepSelectionsActions.reset();
    resetAppliedFilters();
    clearStore();
    setIsInSession(0);
  }

  function clearDataThemeBuilder() {
    clear().then(() => {
      console.log(
        "End of reset.",
        "--resetActiveTabIndex",
        activeTabIndex,
        "--themeIds",
        themeIds,
        "--CurrentChart",
        currentChart,
        "--currentChartData",
        currentChartData,
        "--visualOptions",
        visualOptions
      );
    });
  }

  function setFilterOptionGroups(key: string, value: boolean) {
    const fOptionGroupsIndex = findIndex(
      rawData[activeTabIndex][activeVizIndex].filterOptionGroups,
      { name: key }
    );
    if (fOptionGroupsIndex > -1) {
      const updRawData = [...rawData];
      updRawData[activeTabIndex][activeVizIndex].filterOptionGroups[
        fOptionGroupsIndex
      ].enabled = value;
      setRawData(updRawData);
    }
  }

  React.useEffect(() => {
    document.body.style.background = "#fff";

    return () => {
      clearDataTheme();
      clearDataThemeBuilder();
      clearOrderData();
      setVizDeleted(false);
      setVizDuplicated(false);
    };
  }, []);

  React.useEffect(() => {
    !loading && setVisualOptionsOnChange();
  }, [selectedChartType, loading]);

  React.useEffect(() => {
    if (!loading) {
      let tmpCurrentChartData: any = [...currentChartData];
      tmpCurrentChartData[activeTabIndex][activeVizIndex] = parseDataset(
        filteredData[activeTabIndex][activeVizIndex],
        null,
        {
          locale: navigator.language || "en-US",
          decimal: ".",
          group: ",",
        }
      );
      setCurrentChartData(tmpCurrentChartData);
      let tmpCurrentChart: any = [...currentChart];
      tmpCurrentChart[activeTabIndex][activeVizIndex] = get(
        charts,
        selectedChartType[activeTabIndex][activeVizIndex] || "barchart",
        null
      );
      setCurrentChart(tmpCurrentChart);
    }
  }, [filteredData, loading]);

  React.useEffect(() => {
    const locationStateSet: boolean = typeof location.state !== "undefined";
    setIsEditMode(page !== "new" && locationStateSet);
  }, [page]);

  React.useEffect(() => {
    if (isEditMode) {
      loadDataTheme({
        getId: page,
        filterString:
          'filter={"fields":{"id":true,"title":true,"subTitle":true,"public":true,"tabs":false,"createdDate":true}}',
      });
    } else {
      clearDataTheme();
    }
  }, [isEditMode]);

  React.useEffect(() => {
    if (loadedDataTheme) {
      if (loadedDataTheme.title.length > 0) {
        setTitle({ title: loadedDataTheme.title });
      }
      if (loadedDataTheme.subTitle.length > 0) {
        setSubTitle({ subTitle: loadedDataTheme.subTitle });
      }
    }
  }, [loadedDataTheme]);

  useUpdateEffect(() => {
    clearOrderData();
    setVizDeleted(false);
    setVizDuplicated(false);
  }, [activeTabIndex]);

  let renderingKey = 0;

  return (
    <React.Fragment>
      <DataThemesAlertDialog />
      <DndProvider backend={HTML5Backend}>
        <Switch>
          {(loadingData || isSaveLoading || isDataThemeLoading) && (
            <PageLoader />
          )}
          <Route path={`/data-themes/:page/export`}>
            <DataThemesBuilderExport
              tabIndex={activeTabIndex}
              vizIndex={activeVizIndex}
              // data={rawData[activeTabIndex][activeVizIndex].data}
              data={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].data`,
                []
              )}
              loading={loading}
              loadDataset={loadDataset}
              currentChart={currentChart[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={
                currentChartData[activeTabIndex][activeVizIndex]
              }
              // filterOptionGroups={
              //   rawData[activeTabIndex][activeVizIndex].filterOptionGroups
              // }
              filterOptionGroups={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].filterOptionGroups`,
                []
              )}
              themeData={rawData}
              dimensions={get(
                currentChart[activeTabIndex][activeVizIndex],
                "dimensions",
                []
              )}
              updateLocalStates={updateLocalStates}
            />
          </Route>
          <Route path={`/data-themes/:page/customize`}>
            <DataThemesBuilderCustomize
              tabIndex={activeTabIndex}
              vizIndex={activeVizIndex}
              data={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].data`,
                []
              )}
              // data={rawData[activeTabIndex][activeVizIndex].data}
              loading={loading}
              loadDataset={loadDataset}
              currentChart={currentChart[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={
                currentChartData[activeTabIndex][activeVizIndex]
              }
              // filterOptionGroups={
              //   rawData[activeTabIndex][activeVizIndex].filterOptionGroups
              // }
              filterOptionGroups={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].filterOptionGroups`,
                []
              )}
              themeData={rawData}
              dimensions={get(
                currentChart[activeTabIndex][activeVizIndex],
                "dimensions",
                []
              )}
              updateLocalStates={updateLocalStates}
            />
          </Route>
          <Route path={`/data-themes/:page/lock`}>
            <DataThemesBuilderLock
              tabIndex={activeTabIndex}
              vizIndex={activeVizIndex}
              data={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].data`,
                []
              )}
              // data={rawData[activeTabIndex][activeVizIndex].data}
              loading={loading}
              loadDataset={loadDataset}
              currentChart={currentChart[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={
                currentChartData[activeTabIndex][activeVizIndex]
              }
              // filterOptionGroups={
              //   rawData[activeTabIndex][activeVizIndex].filterOptionGroups
              // }
              filterOptionGroups={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].filterOptionGroups`,
                []
              )}
              setFilterOptionGroups={setFilterOptionGroups}
              themeData={rawData}
              dimensions={get(
                currentChart[activeTabIndex][activeVizIndex],
                "dimensions",
                []
              )}
              updateLocalStates={updateLocalStates}
            />
          </Route>
          <Route path={`/data-themes/:page/filters`}>
            <DataThemesBuilderFilters
              tabIndex={activeTabIndex}
              vizIndex={activeVizIndex}
              data={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].data`,
                []
              )}
              // data={rawData[activeTabIndex][activeVizIndex].data}
              loading={loading}
              loadDataset={loadDataset}
              currentChart={currentChart[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={
                currentChartData[activeTabIndex][activeVizIndex]
              }
              // filterOptionGroups={
              //   rawData[activeTabIndex][activeVizIndex].filterOptionGroups
              // }
              filterOptionGroups={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].filterOptionGroups`,
                []
              )}
              dimensions={get(
                currentChart[activeTabIndex][activeVizIndex],
                "dimensions",
                []
              )}
              updateLocalStates={updateLocalStates}
            />
          </Route>
          <Route path={`/data-themes/:page/mapping`}>
            <DataThemesBuilderMapping
              tabIndex={activeTabIndex}
              vizIndex={activeVizIndex}
              data={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].data`,
                []
              )}
              // data={rawData[activeTabIndex][activeVizIndex].data}
              loading={loading}
              loadDataset={loadDataset}
              currentChart={currentChart[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={
                currentChartData[activeTabIndex][activeVizIndex]
              }
              // filterOptionGroups={
              //   rawData[activeTabIndex][activeVizIndex].filterOptionGroups
              // }
              filterOptionGroups={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].filterOptionGroups`,
                []
              )}
              dimensions={get(
                currentChart[activeTabIndex][activeVizIndex],
                "dimensions",
                []
              )}
              updateLocalStates={updateLocalStates}
            />
          </Route>
          <Route path={`/data-themes/:page/chart-type`}>
            <DataThemesBuilderChartType
              tabIndex={activeTabIndex}
              vizIndex={activeVizIndex}
              data={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].data`,
                []
              )}
              // data={rawData[activeTabIndex][activeVizIndex].data}
              loading={loading}
              loadDataset={loadDataset}
              visualOptions={visualOptions}
              currentChart={currentChart}
              setCurrentChart={setCurrentChart}
              setVisualOptions={setVisualOptions}
              // filterOptionGroups={
              //   rawData[activeTabIndex][activeVizIndex].filterOptionGroups
              // }
              filterOptionGroups={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].filterOptionGroups`,
                []
              )}
              updateLocalStates={updateLocalStates}
            />
          </Route>
          <Route path={`/data-themes/:page/preview`}>
            <DataThemesBuilderPreview
              tabIndex={activeTabIndex}
              vizIndex={activeVizIndex}
              allData={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].data`,
                []
              )}
              // allData={rawData[activeTabIndex][activeVizIndex].data}
              totalAvailable={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].count`,
                0
              )}
              // totalAvailable={rawData[activeTabIndex][activeVizIndex].count}
              loading={loading}
              data={filteredData[activeTabIndex][activeVizIndex]}
              loadDataset={loadDataset}
              visualOptions={visualOptions}
              // filterOptionGroups={
              //   rawData[activeTabIndex][activeVizIndex].filterOptionGroups
              // }
              filterOptionGroups={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].filterOptionGroups`,
                []
              )}
              updateLocalStates={updateLocalStates}
            />
          </Route>
          <Route path={`/data-themes/:page/data`}>
            <DataThemesBuilderDataView
              tabIndex={activeTabIndex}
              vizIndex={activeVizIndex}
              data={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].data`,
                []
              )}
              // data={rawData[activeTabIndex][activeVizIndex].data}
              totalAvailable={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].count`,
                0
              )}
              // totalAvailable={rawData[activeTabIndex][activeVizIndex].count}
              loading={loading}
              loadDataset={loadDataset}
              visualOptions={visualOptions}
              // filterOptionGroups={
              //   rawData[activeTabIndex][activeVizIndex].filterOptionGroups
              // }
              filterOptionGroups={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].filterOptionGroups`,
                []
              )}
              updateLocalStates={updateLocalStates}
            />
          </Route>
          <Route path={`/data-themes/:page/initial`}>
            <DataThemesBuilderInitialView
              loading={loading}
              data={filteredData[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              // filterOptionGroups={
              //   rawData[activeTabIndex][activeVizIndex].filterOptionGroups
              // }
              filterOptionGroups={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].filterOptionGroups`,
                []
              )}
              updateLocalStates={updateLocalStates}
              addVizToLocalStates={addVizToLocalStates}
            />
          </Route>
          <Route path={`/data-themes/:page/text`}>
            <DataThemesBuilderTextView
              data={rawData}
              loading={loading}
              visualOptions={visualOptions}
              filterOptionGroups={rawData}
              updateLocalStates={updateLocalStates}
            />
            <React.Fragment />
          </Route>
          <Route
            path={`/data-themes/:page`}
            component={() => {
              if (
                page === "new" &&
                activePanels[activeTabIndex][activeVizIndex] !== 4 &&
                !vizIsTextContent[activeTabIndex][activeVizIndex]
              ) {
                return <Redirect to="/data-themes/new/initial" />;
              }
              return (
                <React.Fragment>
                  {loading ? (
                    <PageLoader />
                  ) : (
                    <React.Fragment>
                      <DataThemesPageSubHeader
                        previewMode={!isEditMode && page !== "new"}
                        data={rawData[activeTabIndex][0].data}
                        loading={loading}
                        visualOptions={visualOptions}
                        filterOptionGroups={
                          rawData[activeTabIndex][0].filterOptionGroups
                        }
                        updateLocalStates={updateLocalStates}
                        tabsDisabled={page !== "new" && !isEditMode}
                        themeData={rawData}
                      />
                      <DataThemesToolBox
                        filtersView
                        tabIndex={activeTabIndex}
                        vizIndex={0}
                        data={rawData[activeTabIndex][0].data}
                        loading={loading}
                        visualOptions={visualOptions}
                        loadDataset={loadDataset}
                        filterOptionGroups={
                          rawData[activeTabIndex][0].filterOptionGroups
                        }
                        themeData={rawData}
                      />
                      <DataThemesTabOrderViz enabled={isEditMode}>
                        {rawData[activeTabIndex].map((_, vizIndex) => (
                          <DataThemesBuilderPreviewTheme
                            key={renderingKey++}
                            editable={isEditMode}
                            tabIndex={activeTabIndex}
                            vizIndex={vizIndex}
                            data={rawData[activeTabIndex][vizIndex].data}
                            loading={loading}
                            loadDataset={loadDataset}
                            currentChart={
                              currentChart[activeTabIndex][vizIndex]
                            }
                            visualOptions={visualOptions}
                            setVisualOptions={setVisualOptions}
                            currentChartData={
                              currentChartData[activeTabIndex][vizIndex]
                            }
                            filterOptionGroups={
                              rawData[activeTabIndex][vizIndex]
                                .filterOptionGroups
                            }
                            dimensions={get(
                              currentChart[activeTabIndex][vizIndex],
                              "dimensions",
                              []
                            )}
                            updateLocalStates={updateLocalStates}
                            themeData={rawData}
                            deleteViz={deleteViz}
                            duplicateViz={duplicateViz}
                          />
                        ))}
                      </DataThemesTabOrderViz>
                    </React.Fragment>
                  )}
                </React.Fragment>
              );
            }}
          />
          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </DndProvider>
      {(page === "new" || isEditMode) && (!view || view === "initial") && (
        <DataThemesAddSectionButton
          showCreateYourStoryText={
            history.location.pathname === `/data-themes/new/initial`
          }
          addVizToLocalStates={addVizToLocalStates}
        />
      )}
    </React.Fragment>
  );
}
