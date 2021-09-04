import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Document, Page, pdfjs } from "react-pdf";
import { useRouter } from "next/router";
import { Row, Spin } from "antd";
import { checkDoneAllOption } from "@util/index";
import AuthHoc from "../AuthHoc";

function PreviewPDF() {
  const [numPages, setNumPages] = useState(null);
  const [renderPage, setRenderPage] = useState(false);

  const router = useRouter();

  const category = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category) => category
    )
  );

  const starYourWillData = useSelector(
    createSelector(
      (state: any) => state?.startYourWill,
      (startYourWill) => startYourWill
    )
  );

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);
  useEffect(() => {
    if (checkDoneAllOption(category)) {
      setRenderPage(true);
    } else router.push("/start-your-will-create");
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return renderPage ? (
    <div className="preview-pdf">
      <Document
        file={{
          url: `${process.env.NEXT_PUBLIC_API_URL}${starYourWillData?.pathDownload}`,
        }}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  ) : (
    <Row
      justify="center"
      align="middle"
      style={{ height: "50%", width: "100%" }}
    >
      <Spin size="large" />
    </Row>
  );
}

export default AuthHoc(PreviewPDF);
