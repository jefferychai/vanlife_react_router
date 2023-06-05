import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {
  const { currentVan } = useOutletContext();

  return (
    <p className="host-van-detail-price">
      <span>${currentVan.price}.00</span>/day
    </p>
  );
}
