import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
        <Head>
          {/* Favicon */}
          <link rel="icon" href="/images/logo.jpg" type="image/x-icon" />

           {/* Tidio Chatbot */}
           <script src="//code.tidio.co/6fp0o1xr5cobneb6ua5skyfm05xc7w8u.js" async></script>
        </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
