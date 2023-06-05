import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
  const { currentVan } = useOutletContext();

  return (
    <div>
      <img
        src={currentVan.imageUrl}
        alt={`${currentVan.name}_img`}
        className="host-van-detail-photo"
      />
    </div>
  );
}
