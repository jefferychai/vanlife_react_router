import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  return (
    <div className="error">
      <h1>Error: {error.message}</h1>
      <h2>
        {error.status} - {error.statusText}
      </h2>
    </div>
  );
}
