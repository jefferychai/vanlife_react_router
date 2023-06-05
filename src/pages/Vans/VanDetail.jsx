import React, { Suspense } from "react";
import {
  Link,
  useLocation,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import arrowIcon from "../../images/Arrow 1.png";
import { getVans } from "../../api";

export function loader({ params }) {
  return defer({ van: getVans(params.id) });
}

export default function VanDetail() {
  const location = useLocation();
  const dataPromise = useLoaderData();

  // javascript optional chainning method
  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  function renderVanDetail(van) {
    return (
      <div className="van-detail">
        <img src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
    );
  }

  return (
    <div className="van-detail-container">
      <Link
        to={`..${search}`}
        relative="path"
        className="back-button back-button-align"
      >
        <img src={arrowIcon} alt="arrow_icon" />
        Back to {type} vans
      </Link>

      <Suspense fallback={<h2>Loading van...</h2>}>
        <Await resolve={dataPromise.van}>{renderVanDetail}</Await>
      </Suspense>
    </div>
  );
}
