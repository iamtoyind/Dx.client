// cc:application base#;application routes

// base
import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "app/utils/PrivateRoute";
import { useScrollToTop } from "app/hooks/useScrollToTop";
import { PageLoader } from "app/modules/common/page-loader";
import { RouteWithAppBar } from "app/utils/RouteWithAppBar";

const HomeModule = lazy(() => import("app/modules/home-module"));
const CasesModule = lazy(
  () => import("app/modules/home-module/sub-modules/cases")
);
const ContactModule = lazy(
  () => import("app/modules/home-module/sub-modules/contact")
);

const AboutModule = lazy(
  () => import("app/modules/home-module/sub-modules/about")
);
const DatasetsModule = lazy(() => import("app/modules/datasets-module"));
const ChartsModule = lazy(() => import("app/modules/charts-module"));
const ChartModule = lazy(() => import("app/modules/chart-module"));
const ReportModule = lazy(() => import("app/modules/report-module"));
const OnboardingModule = lazy(() => import("app/modules/onboarding-module"));
const DatasetUploadSteps = lazy(
  () => import("app/fragments/datasets-fragment/upload-steps")
);
const UserProfileModule = lazy(() => import("app/modules/user-profile-module"));
const EditMetaData = lazy(
  () => import("app/modules/datasets-module/editMetaData")
);

export function MainRoutes() {
  useScrollToTop();

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/onboarding/:page">
          <OnboardingModule />
        </Route>
        <RouteWithAppBar exact path="/">
          <HomeModule />
        </RouteWithAppBar>
        <RouteWithAppBar exact path="/cases">
          <CasesModule />
        </RouteWithAppBar>
        <RouteWithAppBar exact path="/contact">
          <ContactModule />
        </RouteWithAppBar>
        <RouteWithAppBar exact path="/report/:page/:view?">
          <ReportModule />
        </RouteWithAppBar>
        <RouteWithAppBar exact path="/about">
          <AboutModule />
        </RouteWithAppBar>
        <PrivateRoute exact path="/user-management/:page">
          <UserProfileModule />
        </PrivateRoute>
        <RouteWithAppBar exact path="/chart/:page/:view?">
          <ChartModule />
        </RouteWithAppBar>
        <RouteWithAppBar exact path="/datasets">
          <DatasetsModule />
        </RouteWithAppBar>
        <RouteWithAppBar exact path="/charts">
          <ChartsModule />
        </RouteWithAppBar>
        <RouteWithAppBar exact path="/dataset/:id/edit">
          <EditMetaData />
        </RouteWithAppBar>
        <RouteWithAppBar exact path="/dataset-upload">
          <DatasetUploadSteps />
        </RouteWithAppBar>
      </Switch>
    </Suspense>
  );
}
