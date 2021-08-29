import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Document, Page, pdfjs } from "react-pdf";

function PreviewPDF() {
  const category = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category) => category
    )
  );
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
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
  );
}

export default PreviewPDF;
