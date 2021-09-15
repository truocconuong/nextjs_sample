import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import { useRouter } from "next/router";
import { Row, Spin } from "antd";
import AuthHoc from "../AuthHoc";
import { generatePDF } from "@redux/actions/startYourWill";

function PreviewPDF() {
  const [numPages, setNumPages] = useState(null);
  const [renderPage, setRenderPage] = useState(false);
  const [urlPdf, setUrlPdf] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(
        generatePDF((response) => {
          if (response.success) {
            setUrlPdf(response?.data);
            setRenderPage(true);
          }
        })
      );
    } else router.push("/start-your-will-create");
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return renderPage ? (
    <div className="preview-pdf">
      <Document
        file={{
          url: `${process.env.NEXT_PUBLIC_API_URL}${urlPdf}`,
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
      style={{ height: "80vh", width: "100%" }}
    >
      <Spin size="large" />
    </Row>
  );
}

export default AuthHoc(PreviewPDF);
