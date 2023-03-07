import { Container } from "@material-ui/core";
import { PageHeader } from "app/components/PageHeader";
import React from "react";
import { useTitle } from "react-use";
import { PageTopSpacer } from "../common/page-top-spacer";
import { dataSetsCss } from "../datasets-module/style";
import Table from "./component/table";

export default function DataSetDetailModule() {
  useTitle("Dataxplorer - Datasets");

  return (
    <div css={dataSetsCss}>
      <PageHeader title="My Datasets" />
      <PageTopSpacer />

      <div
        css={`
          color: #231d2c;
          font-family: "Inter";
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          width: 100%;
        `}
      >
        <p>Uploaded datasets</p>
        {/* <Box height={4} /> */}
        <p
          css={`
            margin-top: -8px;
          `}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <Table />
      </div>
    </div>
  );
}