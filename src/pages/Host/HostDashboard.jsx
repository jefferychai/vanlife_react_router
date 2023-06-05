import React, { Suspense } from "react";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { requireAuth } from "../../utils";
import { getHostVans } from "../../api";
import { BsStarFill } from "react-icons/bs";

export async function loader({ request }) {
  await requireAuth(request);
  return defer({ vans: getHostVans() });
}

export default function HostDashboard() {
  const dataPromise = useLoaderData();

  function renderVanElements(vans) {
    const hostVansEls = vans.map((van) => {
      return (
        <div key={van.id} className="host-van-single">
          <img src={van.imageUrl} alt={`${van.name}_img`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
          <Link to={`vans/${van.id}`} className="view-all">
            View
          </Link>
        </div>
      );
    });

    return (
      <>
        <div className="host-vans-list">
          <section>{hostVansEls}</section>
        </div>
      </>
    );
  }

  return (
    <>
      <section className="host-dashboard-earnings">
        <div className="info">
          <h1>Welcome!</h1>
          <p>
            Income last <span>30 days</span>
          </p>
          <h2>$2,260</h2>
        </div>
        <Link to="income" className="view-all">
          Details
        </Link>
      </section>
      <section className="host-dashboard-reviews">
        <h2>Review score</h2>
        <BsStarFill className="star" />
        <p>
          <span>5.0</span>/5
        </p>
        <Link to="reviews" className="view-all">
          Details
        </Link>
      </section>
      <section className="host-dashboard-vans">
        <div className="top">
          <h2>Your listed vans</h2>
          <Link to="vans" className="view-all">
            View all
          </Link>
        </div>
        <Suspense fallback={<h3 className="loading">Loading vans...</h3>}>
          <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
        </Suspense>
      </section>
    </>
  );
}
