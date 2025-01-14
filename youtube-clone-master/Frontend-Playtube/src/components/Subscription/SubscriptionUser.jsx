import React, { useRef, useState } from "react";
import { toggleSubscription } from "../../app/Slices/subscriptionSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatSubscription } from "../../helpers/formatFigures";
import LoginPopup from "../Auth/LoginPopup";

function SubscriptionUser( profile ) {
  const dispatch = useDispatch();
  const loginPopupDialog = useRef();

  const { status: authStatus } = useSelector(({ auth }) => auth);
  const [isSubscribed, setIsSubscribed] = useState(profile.isSubscribed);
  const [isLoading, setIsLoading] = useState(false); // Optional: Add a loading state to disable the button during subscription toggle

  async function handleToggleSubscription() {
    if (!authStatus) {
      return loginPopupDialog.current?.open();
    }

    setIsLoading(true); // Start loading when toggling subscription

    try {
      await dispatch(toggleSubscription(profile._id)).unwrap(); // Optional: You can use .unwrap() to handle the dispatch success/failure
      setIsSubscribed((prev) => !prev); // Toggle subscription after the dispatch is successful
    } catch (error) {
      console.error("Subscription toggle failed: ", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  }

  const buttonClass = isSubscribed
    ? "bg-[#ae7aff] text-white"
    : "bg-white text-black";

  return (
    <>
      <LoginPopup ref={loginPopupDialog} message="Sign in to Subscribe..." />
      <li key={profile._id} className="flex w-full justify-between">
        <div className="flex items-center gap-x-2">
          <div className="h-14 w-14 shrink-0">
            <Link to={`/user/${profile.username}`}>
              <img
                src={profile.avatar}
                alt={profile.username}
                className="h-full w-full rounded-full"
              />
            </Link>
          </div>
          <div className="block">
            <h6 className="font-semibold">
              <Link to={`/user/${profile.username}`}>{profile.fullName}</Link>
            </h6>
            <p className="text-sm text-gray-300">
              {formatSubscription(profile.subscribersCount)}
            </p>
          </div>
        </div>
        <div className="block">
          <button
            onClick={handleToggleSubscription}
            disabled={isLoading} // Disable the button while processing
            className={`px-3 py-2 rounded ${buttonClass} `}
          >
            <span>{isSubscribed ? "Subscribed" : "Subscribe"}</span>
          </button>
        </div>
      </li>
    </>
  );
}

export default SubscriptionUser;
