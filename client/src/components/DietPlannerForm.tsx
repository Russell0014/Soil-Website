import { Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useState } from "react";
import { getLoggedIn } from "../utils/user";

import { gainWeight, loseWeight, maintainWeight } from "../utils/diet";

const dietFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const age = parseInt((form[0] as HTMLInputElement).value);
  const gender = (form[1] as HTMLInputElement).value;
  const weight = parseFloat((form[2] as HTMLInputElement).value);
  const height = parseFloat((form[3] as HTMLInputElement).value);
  const activityLevel = parseFloat((form[4] as HTMLInputElement).value);
  const healthGoal = (form[5] as HTMLInputElement).value;
  const dietaryPreferences = (form[6] as HTMLInputElement).value;

  let calories: number;

  if (healthGoal === "lose") {
    calories = loseWeight(weight, height, age, activityLevel, gender);
  } else if (healthGoal === "gain") {
    calories = gainWeight(weight, height, age, activityLevel, gender);
  } else {
    calories = maintainWeight(weight, height, age, activityLevel, gender);
  }

  const loggedInUser = getLoggedIn();
  const dietData = {
    age,
    gender,
    weight,
    height,
    activityLevel,
    healthGoal,
    dietaryPreferences,
    calories,
  };

  if (loggedInUser) {
    const storedData = JSON.parse(localStorage.getItem("__DIET") || "{}");
    storedData[loggedInUser.email] = [dietData]; // replace the existing data
    localStorage.setItem("__DIET", JSON.stringify(storedData));
  }
};
const DietPlannerForm = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dietFormSubmit(event);
    }

    setValidated(true);
    if (form.checkValidity() === true) {
      toast.success("Profile updated successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const loggedInUser = getLoggedIn();
  const storedData = JSON.parse(localStorage.getItem("__DIET") || "[]");
  const initialDietData =
    loggedInUser && storedData[loggedInUser.email]
      ? storedData[loggedInUser.email][0]
      : {};
  const [age, setAge] = useState(initialDietData.age || "");
  const [gender, setGender] = useState(initialDietData.gender || "");
  const [weight, setWeight] = useState(initialDietData.weight || "");
  const [height, setHeight] = useState(initialDietData.height || "");
  const [activityLevel, setActivityLevel] = useState(
    initialDietData.activityLevel || ""
  );
  const [healthGoal, setHealthGoal] = useState(
    initialDietData.healthGoal || ""
  );
  const [dietaryPreferences, setDietaryPreferences] = useState(
    initialDietData.dietaryPreferences || ""
  );

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <h2>Personalized Diet Profile</h2>
      <Form.Group as={Col} controlId="formAge">
        <Form.Label>Age:</Form.Label>
        <Form.Control
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid age.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} controlId="formGender">
        <Form.Label>Gender:</Form.Label>
        <Form.Control
          as="select"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please select a gender.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Weight (kg):</Form.Label>
        <Form.Control
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid weight.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Height (cm):</Form.Label>
        <Form.Control
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid height.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Activity Level:</Form.Label>
        <Form.Control
          as="select"
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
          required
        >
          <option value="">Select...</option>
          <option value={1.2}>Sedentary</option>
          <option value={1.375}>Lightly Active</option>
          <option value={1.55}>Moderately Active</option>
          <option value={1.725}>Very Active</option>
          <option value={1.9}>Extra Active</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please select an activity level.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Health Goals:</Form.Label>
        <Form.Control
          as="select"
          value={healthGoal}
          onChange={(e) => setHealthGoal(e.target.value)}
          required
        >
          <option value="">Select...</option>
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Gain Weight</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please select a health goal.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Dietary Preferences:</Form.Label>
        <Form.Control
          as="select"
          value={dietaryPreferences}
          onChange={(e) => setDietaryPreferences(e.target.value)}
          required
        >
          <option value="">Select...</option>
          <option value="none">None</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten-Free</option>
          <option value="dairy-free">Dairy-Free</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please select a dietary preference.
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="success" type="submit" className="mt-4 mx-auto d-block">
        Submit
      </Button>
    </Form>
  );
};

export default DietPlannerForm;
