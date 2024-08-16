// MetaTags.js
import React from "react";
import { Helmet } from "react-helmet";

const MetaTags = () => (
  <>
    <Helmet>
      <meta name="description" content="Beatblast" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
      <meta name="theme-color" content="#f9f6ee" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-title" content="Beatblast" />
      <meta name="msapplication-TileColor" content="#f9f6ee" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
    </Helmet>
  </>
);

export default MetaTags;
