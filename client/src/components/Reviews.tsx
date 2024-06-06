import StarRating from "./StarRating";
import { getProductReviews, Review, deleteReview } from "../service/review";
import { useEffect, useState } from "react";
import { AuthConsumer } from "./AuthContext";
import { Card, Button, Modal } from "react-bootstrap";

interface ReviewsProps {
  productId: number;
  reload: boolean;
  handleUpdate: () => void;
}

const trash = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    height={24}
    width={24}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);

function Reviews({ productId, reload, handleUpdate }: ReviewsProps) {
  const { user } = AuthConsumer();
  const [userReviews, setUserReviews] = useState<Review[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [reloadAfterDelete, setReloadAfterDelete] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getProductReviews(productId, undefined).then((reviews) => {
      setUserReviews(reviews);
    });
  }, [productId, reload, reloadAfterDelete]);

  function ReviewCards({ review }: { review: Review }) {
    return (
      <Card
        className="rounded-1 border-0 mb-4"
        style={{ backgroundColor: "#cde9d7" }}
      >
        <Card.Body>
          <StarRating rating={review.stars} />
          <div className="d-flex justify-content-between align-items-start flex-column">
            <div>
              <Card.Title className="pt-1">
                <h4>{review.title}</h4>
              </Card.Title>
              <Card.Text>{review.description}</Card.Text>
              <Card.Text>
                {review.User.username},{" "}
                {new Date(review.review_created).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Card.Text>
            </div>
            {user?.user_id === review.user_id && (
              <>
                <Button
                  variant=""
                  className="p-0 align-self-end"
                  onClick={handleButtonClick}
                >
                  {trash}
                </Button>

                <Modal show={showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete Review</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to delete your review?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      No
                    </Button>
                    <Button
                      variant="danger"
                      onClick={async () => {
                        handleClose();
                        await deleteReview(user.user_id, productId);
                        setReloadAfterDelete(!reloadAfterDelete);
                        handleUpdate();
                      }}
                    >
                      Yes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      {userReviews.map((review) => (
        <ReviewCards key={review.id} review={review} />
      ))}
    </div>
  );
}

export default Reviews;
