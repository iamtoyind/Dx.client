import React from "react";
import EmpowerBlock from "../cases/components/empowerBlock";
import { Box, Container, TextField } from "@material-ui/core";
import HomeFooter from "../../components/Footer";
import { ReactComponent as FullEllipse } from "app/modules/home-module/assets/contact-lg-ellispe.svg";

const DXLogo = (
  <svg
    width="184"
    height="32"
    viewBox="0 0 184 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.524 26H7.652C14.672 26 19.496 20.888 19.496 13.508V13.256C19.496 5.84 14.672 0.799998 7.652 0.799998H0.524V26ZM7.58 3.284C13.088 3.284 16.688 7.316 16.688 13.292V13.544C16.688 19.52 13.088 23.516 7.58 23.516H3.224V3.284H7.58ZM28.9989 26.396C31.7709 26.396 33.6069 25.028 34.7229 23.264V26H37.2789V13.94C37.2789 11.744 36.6309 10.016 35.4789 8.864C34.2549 7.64 32.4909 6.992 30.2229 6.992C27.9189 6.992 26.0829 7.64 24.3189 8.504L25.1469 10.628C26.4429 9.944 28.0629 9.368 29.9349 9.368C32.9589 9.368 34.7229 10.988 34.7229 14.012V15.128C33.3189 14.696 31.8789 14.372 29.8989 14.372C25.7589 14.372 22.9869 16.568 22.9869 20.42V20.564C22.9869 24.272 25.8669 26.396 28.9989 26.396ZM29.5749 24.236C27.3429 24.236 25.5789 22.76 25.5789 20.42V20.312C25.5789 17.936 27.2349 16.388 30.2229 16.388C32.0589 16.388 33.5709 16.712 34.7589 17.144V19.484C34.7589 22.22 32.4549 24.272 29.5749 24.236ZM47.6486 26.288C48.7286 26.288 49.6286 26.036 50.4566 25.64V23.408C49.7006 23.732 48.9806 23.912 48.2606 23.912C46.6406 23.912 45.5606 23.192 45.5606 21.212V9.548H50.4566V7.244H45.5606V1.772H42.9686V7.244H40.7006V9.548H42.9686V21.644C42.9686 24.992 44.9846 26.288 47.6486 26.288ZM59.409 26.396C62.181 26.396 64.017 25.028 65.133 23.264V26H67.689V13.94C67.689 11.744 67.041 10.016 65.889 8.864C64.665 7.64 62.901 6.992 60.633 6.992C58.329 6.992 56.493 7.64 54.729 8.504L55.557 10.628C56.853 9.944 58.473 9.368 60.345 9.368C63.369 9.368 65.133 10.988 65.133 14.012V15.128C63.729 14.696 62.289 14.372 60.309 14.372C56.169 14.372 53.397 16.568 53.397 20.42V20.564C53.397 24.272 56.277 26.396 59.409 26.396ZM59.985 24.236C57.753 24.236 55.989 22.76 55.989 20.42V20.312C55.989 17.936 57.645 16.388 60.633 16.388C62.469 16.388 63.981 16.712 65.169 17.144V19.484C65.169 22.22 62.865 24.272 59.985 24.236ZM95.4374 31.4H98.0294V22.508C99.2534 24.56 101.125 26.36 104.113 26.36C107.929 26.36 111.601 23.012 111.601 16.784V16.424C111.601 10.196 107.929 6.884 104.113 6.884C101.161 6.884 99.2894 8.72 98.0294 10.844V7.244H95.4374V31.4ZM103.609 24.02C100.657 24.02 97.9214 21.212 97.9214 16.82V16.46C97.9214 12.068 100.657 9.224 103.609 9.224C106.489 9.224 108.937 11.924 108.937 16.496V16.784C108.937 21.392 106.561 24.02 103.609 24.02ZM116.22 26H118.812V0.00799775H116.22V26ZM131.679 26.396C136.503 26.396 140.031 22.184 140.031 16.712V16.496C140.031 11.024 136.539 6.884 131.715 6.884C126.891 6.884 123.363 11.06 123.363 16.532V16.784C123.363 22.256 126.855 26.396 131.679 26.396ZM131.715 24.056C128.511 24.056 126.027 20.924 126.027 16.712V16.532C126.027 12.356 128.367 9.224 131.679 9.224C134.883 9.224 137.403 12.356 137.403 16.568V16.748C137.403 20.888 135.027 24.056 131.715 24.056ZM144.34 26H146.932V17.072C146.932 12.248 149.74 9.8 153.232 9.8H153.376V6.992C150.316 6.848 148.048 8.756 146.932 11.384V7.244H144.34V26ZM163.495 26.396C166.303 26.396 168.247 25.316 169.939 23.588L168.463 21.932C167.167 23.228 165.655 24.092 163.603 24.092C160.651 24.092 158.095 21.788 157.807 17.648H170.407C170.443 17.324 170.443 16.82 170.443 16.568C170.443 10.916 167.635 6.884 162.919 6.884C158.527 6.884 155.179 10.88 155.179 16.604V16.784C155.179 22.724 158.923 26.396 163.495 26.396ZM157.807 15.632C158.059 11.708 160.147 9.152 162.919 9.152C165.979 9.152 167.671 12.068 167.851 15.632H157.807ZM174.609 26H177.201V17.072C177.201 12.248 180.009 9.8 183.501 9.8H183.645V6.992C180.585 6.848 178.317 8.756 177.201 11.384V7.244H174.609V26Z"
      fill="#231D2C"
    />
    <path
      d="M85.8305 0.799998L81.4745 8.972L77.1905 0.799998H71.2505L78.3785 13.184L70.9265 26H76.7225L81.3665 17.36L85.9745 26H91.9145L84.4265 13.112L91.6265 0.799998H85.8305Z"
      fill="#CEA8BC"
    />
  </svg>
);

export default function ContactModule() {
  return (
    <>
      <EmpowerBlock />
      <Container maxWidth="lg">
        <div
          css={`
            position: relative;
            z-index: 1;

            height: 874px;

            margin: auto;
            margin-top: 50px;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          `}
        >
          <FullEllipse
            css={`
              position: absolute;
              z-index: -1;
            `}
          />
          <form
            css={`
              width: 522px;
              margin: auto;
              h4 {
                font-family: "Gotham Narrow Bold", sans-serif;
                font-size: 36px;
                line-height: 43px;
                color: #231d2c;
                text-align: center;
              }
              p {
                font-weight: 325;
                font-size: 24px;
                line-height: 29px;
                text-align: center;
                font-family: "Gotham Narrow", sans-serif;
                margin-top: 0;
              }
            `}
          >
            <h4>Contact us!</h4>
            <p>
              Schedule a free demo now or ask us any data related question you
              may have.
            </p>
            <TextField
              id="standard-basic"
              label="E-mail"
              variant="standard"
              fullWidth
              required
            />
            <TextField
              id="standard-basic"
              label="First Name"
              variant="standard"
              fullWidth
            />
            <TextField
              id="standard-basic"
              label="Last Name"
              variant="standard"
              fullWidth
            />
            <TextField
              id="standard-basic"
              label="Company Name"
              variant="standard"
              fullWidth
            />
            <TextField
              id="standard-basic"
              label="Message"
              variant="standard"
              fullWidth
              required
            />
            <Box height={60} />
            <button
              type="submit"
              css={`
                border: none;
                outline: none;
                background: #6061e5;
                border-radius: 50.7829px;
                height: 64px;
                width: 100%;
                color: #ffffff;
                font-weight: 700;
                font-size: 24px;
                font-family: "Inter", sans-serif;
                :hover {
                  cursor: pointer;
                  opacity: 0.9;
                }
              `}
            >
              SUBMIT
            </button>
          </form>
        </div>
        <div
          css={`
            width: 40%;
            margin: auto;
            margin-top: 213px;
            text-align: center;
            font-weight: 325;
            font-size: 24px;
            line-height: 29px;
            text-align: center;
            color: #231d2c;
            font-family: "Gotham Narrow", sans-serif;
          `}
        >
          {DXLogo}
          <p
            css={`
              margin-bottom: 0;
            `}
          >
            Keizersgracht 555, 1017 DR Amsterdam
          </p>
          <p
            css={`
              margin-top: 0;
            `}
          >
            The Netherlands
          </p>
          <p
            css={`
              margin-bottom: 0px;
            `}
          >
            E-mail: contact@dataxplorer.org
          </p>
          <p
            css={`
              margin-top: 8px;
            `}
          >
            Tel: +3120 213 4466{" "}
          </p>
        </div>
        <Box height={100} />
      </Container>
      <HomeFooter />
    </>
  );
}
