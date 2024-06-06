import { useState, useEffect } from "react";
import Reviews from "./Reviews";
import ReviewsForm from "./ReviewForm";
import { getProductReviews } from "../service/review";

interface ReviewContainerProps {
  productID: number;
}

function ReviewContainer({ productID }: ReviewContainerProps) {
  const [reload, setReload] = useState(false);
  // useEffect for checking if product has reviews
  const [hasReviews, setHasReviews] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await getProductReviews(productID, undefined);
      if (reviews.length > 0) setHasReviews(true);
    };

    fetchReviews();
  }, [productID, reload]);

  const handleUpdate = () => {
    setReload(() => !reload);
  };

  return (
    <>
      <ReviewsForm productId={productID} handleUpdate={handleUpdate} />
      {hasReviews && (
        <Reviews
          productId={productID}
          reload={reload}
          handleUpdate={handleUpdate}
        />
      )}
    </>
  );
}

export default ReviewContainer;
