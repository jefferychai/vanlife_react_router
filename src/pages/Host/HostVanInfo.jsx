import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanInfo() {
  const { currentVan } = useOutletContext();

  return (
    <section className="host-van-detail-info-text">
      <p>
        <strong>Name:</strong> {currentVan.name}
      </p>
      <p className="capitalize">
        <strong>Category:</strong> {currentVan.type}
      </p>
      <p>
        <strong>Description:</strong> {currentVan.description}
      </p>
      <p>
        <strong>Visibility:</strong> Public
      </p>
    </section>
  );
}
