import React, { Suspense } from "react";
import {
  Link,
  Outlet,
  NavLink,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import arrowIcon from "../../images/Arrow 1.png";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ params, request }) {
  await requireAuth(request);
  return defer({ currentVan: getHostVans(params.id) });
}

export default function HostVanDetail() {
  const dataPromise = useLoaderData();

  function renderCurrentVanDetail(currentVan) {
    return (
      <div className="host-van-detail-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} alt={`${currentVan.name}_img`} />
          <div className="host-van-detail-info">
            <i className={`van-type ${currentVan.type} selected capitalize`}>
              {currentVan.type}
            </i>
            <h1>{currentVan.name}</h1>
            <p>
              <strong>${currentVan.price}</strong>/day
            </p>
          </div>
        </div>

        <nav className="host-van-detail-nav">
          <NavLink
            to="."
            end
            className={({ isActive }) => (isActive ? "selected" : null)}
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            className={({ isActive }) => (isActive ? "selected" : null)}
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            className={({ isActive }) => (isActive ? "selected" : null)}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ currentVan }} />
      </div>
    );
  }

  return (
    <section>
      <Link to="/host/vans" className="back-button">
        <img src={arrowIcon} alt="arrow_icon" />
        Back to all vans
      </Link>

      <Suspense fallback={<h2 className="loading">Loading van...</h2>}>
        <Await resolve={dataPromise.currentVan}>{renderCurrentVanDetail}</Await>
      </Suspense>
    </section>
  );
}
