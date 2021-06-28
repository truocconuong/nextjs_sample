import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="/static/assets/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/static/assets/css/owl.carousel.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.css" />
          <link rel="stylesheet" href="/static/assets/css/animate.min.css" />
          <link rel="stylesheet" href="/static/assets/css/fontawesome-all.css" />
          <link rel="stylesheet" href="/static/assets/css/style.css" />
          {/* Color switcher Alternatives | you can remove this section */}
          <link rel="stylesheet" type="text/css" href="/static/assets/css/colors/switch.css" />
          <link href="/static/assets/css/colors/color-2.css" rel="alternate stylesheet" type="text/css" title="color-2" />
          <link href="/static/assets/css/colors/color-3.css" rel="alternate stylesheet" type="text/css" title="color-3" />
          <link href="/static/assets/css/colors/color-4.css" rel="alternate stylesheet" type="text/css" title="color-4" />
          <link href="/static/assets/css/colors/color-5.css" rel="alternate stylesheet" type="text/css" title="color-5" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />



        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <script src="/static/assets/js/jquery-3.3.1.min.js"></script>
          <script src="/static/assets/js/bootstrap.min.js"></script>
          <script src="/static/assets/js/popper.min.js"></script>
          <script src="/static/assets/js/owl.carousel.min.js"></script>
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>
          <script src="/static/assets/js/form-step.js"></script>
          <script src="/static/assets/js/jquery.validate.min.js"></script>
          <script src="/static/assets/js/main.js"></script>
          <script src="/static/assets/js/switch.js"></script> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
