import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

function PreviewPDF() {
  const category = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category) => category
    )
  );
  return (
    <div className="preview-pdf">
      <object
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
      </object>
    </div>
  );
}

export default PreviewPDF;
