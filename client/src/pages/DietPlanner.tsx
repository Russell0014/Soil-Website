import { Container, Row, Col, Button } from "react-bootstrap";
import { getLoggedIn } from "../utils/user";
import DietPlannerForm from "../components/DietPlannerForm";
import Recipes from "../components/Recipes";

const DietPlannerGetStarted = () => (
  <Container fluid className="col-lg-8">
    <Row className="pt-4">
      <Col lg={6} md={10} className="mx-auto px-4 align-content-center">
        <h2>Key Features:</h2>
        <p>
          <strong>Personalized Profiles:</strong> Create your own profile to
          input information such as age, weight, height, activity level, dietary
          preferences, and health goals.
        </p>
        <p>
          <strong>Goal Setting:</strong> Set specific objectives such as weight
          loss, muscle gain, or overall health improvement to receive customized
          diet plans.
        </p>
        <p>
          <strong>Meal Planning Tools:</strong> Plan your daily or weekly meals
          based on your preferences, dietary restrictions, and calorie
          requirements. Choose from a wide range of recipes or food items to
          create your ideal meal plan.
        </p>
      </Col>
      <Col lg={6} md={10} className="mx-auto px-4 my-auto">
        <img
          src="src/assets/mealPlans.jpg"
          alt="Meal Plans"
          className="img-fluid mx-auto d-block rounded mt-4 mb-4"
          style={{ maxHeight: 300 }}
        />
      </Col>
    </Row>
    <Row className="" style={{ paddingTop: 120, paddingBottom: 100 }}>
      <h3 className="text-center display-4">Begin your journey!</h3>
      <p className="text-center mx-auto" style={{ maxWidth: 800 }}>
        Unlock personalized meal planning! Sign up for free to start reaching
        your health goals, whether it's weight loss, muscle gain, or overall
        health improvement.
      </p>
      <div className="text-center">
        <a className="btn btn-success" href="/signup">
          Sign Up
        </a>
      </div>
    </Row>
  </Container>
);

const DietPlannerFormStyled = () => {
  return (
    <Container fluid className="col-lg-8 mb-5 mt-5">
      <Row className="pt-4">
        <Col lg={6} md={10} className="mx-auto px-4 align-content-center">
          <DietPlannerForm />
        </Col>
      </Row>
    </Container>
  );
};

const MealPlan = () => {
  const diet = JSON.parse(localStorage.getItem("__DIET") as string);
  const email = Object.keys(diet)[0];
  const age = diet[email][0].age;
  const weight = diet[email][0].weight;
  const height = diet[email][0].height;
  const activityLevel = diet[email][0].activityLevel;
  const dietaryPreferences = diet[email][0].dietaryPreferences;
  const healthGoal = diet[email][0].healthGoal;
  const calories = diet[email][0].calories;

  return (
    <div className="p-5">
      <Row className="mx-auto justify-content-center">
        <Col md={2} style={{ minWidth: "200px" }}>
          <div
            className=" rounded-2 p-4 mb-5"
            style={{ backgroundColor: "#e3f2e9", minWidth: 200 }}
          >
            <h1>Your Profile</h1>
            <p>Age: {age}</p>
            <p>Weight: {weight}</p>
            <p>Height: {height}</p>
            <p>Activity Level: {activityLevel}</p>
            <p>Dietary Preferences: {dietaryPreferences}</p>
            <p>Health Goal: {healthGoal}</p>
            <p>Daily Calories: {calories}</p>
            <div className="d-flex justify-content-center">
              <a href="/profile/diet-plan">
                <Button variant="success">Edit Profile</Button>
              </a>
            </div>
          </div>
        </Col>
        <Col md={8}>
          <Recipes calories={calories} />
        </Col>
      </Row>
    </div>
  );
};

function DietPlanner() {
  const isLoggedIn = getLoggedIn();
  const hasDiet = localStorage.getItem("__DIET");

  document.title = "SOIL | Diet Planner";
  return (
    <div>
      <div>
        <div
          style={{
            position: "relative",
            height: 300,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "url('src/assets/dose-juice-sTPy-oeA3h0-unsplash.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(35%)",
            }}
          ></div>
          <Container style={{ position: "relative", textAlign: "left" }}>
            <h1 className="text-white display-2 fw-bold ">Diet Planner</h1>
            <p className="text-white" style={{ maxWidth: 800 }}>
              Welcome to the SOIL Diet Planner! Discover recipes and meal plans
              to reach your health goals, whether it's weight loss, muscle gain,
              or just eating healthier. We've got you covered with all you need
              to plan your meals.
            </p>
          </Container>
        </div>
      </div>
      {isLoggedIn ? (
        hasDiet ? null : (
          <DietPlannerFormStyled />
        )
      ) : (
        <DietPlannerGetStarted />
      )}
      {hasDiet && <MealPlan />}
    </div>
  );
}

export default DietPlanner;
