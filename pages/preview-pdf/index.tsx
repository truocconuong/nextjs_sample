import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Document, Page, pdfjs } from "react-pdf";
import { useRouter } from "next/router";
import { Row, Spin } from "antd";

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

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
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
          url: `${process.env.NEXT_PUBLIC_API_URL}${category?.will_pdf_link}`,
        }}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>

      {/* <object
        data={`${process.env.NEXT_PUBLIC_API_URL}${category?.will_pdf_link}`}
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <p>
          Your web browser doesn't have a PDF plugin.
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}${category?.will_pdf_link}`}
          >
            click here to download the PDF file.
          </a>
        </p>
      </object> */}
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

export default PreviewPDF;
