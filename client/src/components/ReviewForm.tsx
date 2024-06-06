import { Button, Row, Col, Form } from "react-bootstrap";
import useForm from "../utils/useForm";
import { validateReview } from "../utils/review";
import {
  createReview,
  updateReview,
  getProductReviews,
  Review,
} from "../service/review";
import { AuthConsumer } from "./AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import StarRating from "./StarRating";

const outline = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    width="22"
    height="22"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    />
  </svg>
);

const solid = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="22"
    height="22"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
      clipRule="evenodd"
    />
  </svg>
);

interface ReviewsFormProps {
  productId: number;
  handleUpdate: () => void;
}

export default function ReviewsForm({
  productId,
  handleUpdate,
}: ReviewsFormProps) {
  const { user } = AuthConsumer();

  const [stars, setStars] = useState(0);
  const [isReviewed, setIsReviewed] = useState(false);
  const [userReview, setUserReview] = useState<Review | undefined>(undefined);
  const [userReviews, setUserReviews] = useState<Review[]>([]);

  async function getUserReview() {
    if (!user) {
      setIsReviewed(() => false);
    } else {
      const _userReview = await getProductReviews(productId, user?.user_id);
      setIsReviewed(() => _userReview.length > 0);
      setUserReview(() =>
        _userReview.length > 0 ? _userReview[0] : undefined
      );
    }

    const _userReviews = await getProductReviews(productId);
    setStars(
      () =>
        // sum / tot = avg
        _userReviews.reduce((acc, rev) => acc + rev.stars, 0) /
          _userReviews.length || 0
    );

    setUserReviews([..._userReviews]);
  }

  const [rating, setRating] = useState(0);

  async function createOrUpdateReview() {
    return isReviewed
      ? await updateReview(
          user!.user_id,
          productId,
          values.title,
          values.description,
          Number(values.stars)
        )
      : await createReview(
          user!.user_id,
          productId,
          values.title,
          values.description,
          Number(values.stars)
        );
  }

  useEffect(() => {
    getUserReview();
  }, [productId, handleUpdate, isReviewed]);

  const createUserReview = async () => {
    if (await createOrUpdateReview()) {
      toast.success("Review written!");
      handleUpdate();
      setRating(0);
      setShowForm(() => false);
      Object.keys(values).forEach((key) => {
        delete values[key];
      });
      Object.keys(errors).forEach((key) => {
        delete errors[key];
      });
    } else {
      toast.warning("Internal server error!");
    }
  };

  const { values, handleChangeValues, handleSubmit, errors } = useForm(
    createUserReview,
    validateReview
  );

  const [showForm, setShowForm] = useState(false);

  const _setShowForm = () => {
    if (!user) {
      toast.warning("Login to write a review!");
      return;
    }
    setShowForm(() => !showForm);
  };

  const setInputValue = (i: "title" | "description") => {
    if (!userReview) return values[i];
    return (values[i] =
      values[i] || values[i] == "" ? values[i] : userReview[i]);
  };

  return (
    <>
      <Row className="mb-4">
        <h3 className="mb-4">Reviews</h3>
        <Col>
          <div className="text-center">
            <h4>{stars}/5</h4>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <StarRating rating={stars} />
              <p className="m-0 mx-1"> ({userReviews.length})</p>
            </div>
          </div>
        </Col>
        <Col>
          <h4>Review the product</h4>
          <p>Share your thoughts with other customers!</p>

          <div className="d-flex gap-1">
            <Button variant="success" onClick={() => _setShowForm()}>
              {isReviewed ? "Edit your review" : "Write a review"}
            </Button>
          </div>
        </Col>
      </Row>
      {showForm && (
        <Form
          onSubmit={handleSubmit}
          className="p-5 custom-bg-secondary rounded-3 mb-4"
        >
          <Form.Group className="mb-3">
            <Form.Label className="p-0 m-0">Stars</Form.Label>
            <div className="d-flex">
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value}>
                  <Form.Check
                    type="radio"
                    id={`radio${value}`}
                    name="stars"
                    value={value}
                    checked={rating === value}
                    onClick={() => {
                      values.stars = value.toString();
                      setRating(value);
                    }}
                    onChange={() => {
                      values.stars = value.toString();
                      setRating(value);
                    }}
                    aria-label={`Rate ${value} out of 5`}
                    className="d-none"
                  />
                  <label htmlFor={`radio${value}`}>
                    {value <= rating ? solid : outline}
                  </label>
                </div>
              ))}
            </div>
            <Form.Text className="text-danger">{errors.stars || ""}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={setInputValue("title")}
              onChange={handleChangeValues}
              placeholder="Enter title"
              style={{ backgroundColor: "#e3f2e9" }}
            />
            <Form.Text className="text-danger">{errors.title || ""}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={5}
              value={setInputValue("description")}
              onChange={handleChangeValues}
              placeholder="Enter description"
              style={{ backgroundColor: "#e3f2e9" }}
            />
            <Form.Text className="text-danger">
              {errors.description || ""}
            </Form.Text>
          </Form.Group>

          <Button
            variant="success"
            type="submit"
            className="w-100 custom-btn-primary"
          >
            Submit
          </Button>
        </Form>
      )}
    </>
  );
}
