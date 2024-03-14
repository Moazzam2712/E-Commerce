import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../store/Items";
import { fetchActions } from "../store/fetch";

const FetchItems = () => {
    const fetchStatus = useSelector((store) => store.fetchStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    dispatch(fetchActions.markFetchingStarted());

    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then(({ products }) => {
        dispatch(fetchActions.markFetchDone());
        dispatch(fetchActions.markFetchingDone());
        dispatch(itemActions.addInitialItems(products));
      });
  }, []);


  return <></>;
};

export default FetchItems;
