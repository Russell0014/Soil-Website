import { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";

const APP_ID = "7cb662b7";
const APP_KEY = "2bd7c9f774add77409c236171010df5b";

interface Recipe {
  image: string;
  label: string;
  description: string;
  url: string;
}

interface Hit {
  recipe: Recipe;
}

interface RecipesData {
  hits: Hit[];
}

interface FetchGetRequestProps {
  mealType: string;
  calories: number;
}

// using https://www.edamam.com/ to get recipes
const FetchGetRequest = async ({
  mealType,
  calories,
}: FetchGetRequestProps): Promise<RecipesData | null> => {
  try {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&mealType=${mealType}&calories=${calories}&random=true`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
    const recipesData: RecipesData = await response.json();
    return recipesData;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
    return null;
  }
};

interface RecipesProps {
  calories: number;
}

function Recipes({ calories }: RecipesProps) {
  const [breakfast, setBreakfast] = useState<RecipesData | null>(null);
  const [lunch, setLunch] = useState<RecipesData | null>(null);
  const [dinner, setDinner] = useState<RecipesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get json breakfast, lunch, dinner
        const [breakfastData, lunchData, dinnerData] = await Promise.all([
          FetchGetRequest({ mealType: "Breakfast", calories }),
          FetchGetRequest({ mealType: "Lunch", calories }),
          FetchGetRequest({ mealType: "Dinner", calories }),
        ]);

        if (breakfastData !== null) {
          setBreakfast(breakfastData);
        }
        if (lunchData !== null) {
          setLunch(lunchData);
        }
        if (dinnerData !== null) {
          setDinner(dinnerData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [calories]);

  //sorting the recipes by days of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const mealsByWeek = new Map();

  for (let i = 0; i < 7; i++) {
    mealsByWeek.set(daysOfWeek[i], [
      {
        meal: "Breakfast",
        recipe: breakfast?.hits[i]?.recipe,
      },
      {
        meal: "Lunch",
        recipe: lunch?.hits[i]?.recipe,
      },
      {
        meal: "Dinner",
        recipe: dinner?.hits[i]?.recipe,
      },
    ]);
  }

  //making the recipe cards
  interface RecipeCardProps {
    data: {
      day: string;
      meal: string;
      recipe: {
        url: string;
        label: string;
        image: string;
      };
    };
  }

  const RecipeCard: React.FC<RecipeCardProps> = ({ data }) => {
    const { recipe } = data;
    return (
      <a href={recipe.url} target="_blank">
        <Card
          style={{
            width: "18rem",
            maxHeight: "400px",
            minHeight: "400px",
          }}
          className="mx-auto mb-4"
        >
          <Card.Img variant="top" src={recipe.image} />
          <Card.Body>
            <Card.Title>{recipe.label}</Card.Title>
          </Card.Body>
        </Card>
      </a>
    );
  };

  interface FrequencyButtonsProps {
    frequency: string;
    setFrequency: (freq: string) => void;
  }

  interface MealsProps {
    mealsByWeek: Map<string, { meal: string; recipe: Recipe }[]>;
  }

  const FrequencyButtons: React.FC<FrequencyButtonsProps> = ({
    frequency,
    setFrequency,
  }) => (
    <div className="text-center mt-4 mb-4" aria-label="Frequency options">
      {["Daily", "Weekly"].map((freq) => (
        <button
          key={freq}
          type="button"
          className={`btn m-2 ${
            frequency === freq ? "btn-success" : "btn-secondary"
          }`}
          onClick={() => setFrequency(freq)}
        >
          {freq}
        </button>
      ))}
    </div>
  );

  const DailyMeals: React.FC<MealsProps> = ({ mealsByWeek }) => (
    <Col>
      {Array.from(mealsByWeek.entries())
        .slice(0, 1)
        .map(([day, meals]) => (
          <div key={day}>
            <Row xs={1} md={1} lg={1} xl={1} xxl={3}>
              {meals.map((meal) => (
                <Col key={meal.meal}>
                  <h3 className="text-center">{meal.meal}</h3>
                  <RecipeCard data={{ day, ...meal }} />
                </Col>
              ))}
            </Row>
          </div>
        ))}
    </Col>
  );

  const WeeklyMeals: React.FC<MealsProps> = ({ mealsByWeek }) => (
    <Col>
      {Array.from(mealsByWeek.entries()).map(([day, meals]) => (
        <div key={day}>
          <h2 className="text-center mt-4">{day}</h2>
          <Row xs={1} md={1} lg={1} xl={1} xxl={3}>
            {meals.map((meal) => (
              <Col key={meal.meal}>
                <h4 className="text-center">{meal.meal}</h4>
                <RecipeCard data={{ day, ...meal }} />
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Col>
  );

  const [frequency, setFrequency] = useState("Daily");

  return (
    <div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <h1 className="text-center">Recipes</h1>
          <FrequencyButtons frequency={frequency} setFrequency={setFrequency} />
          <Row>
            {frequency === "Daily" ? (
              <DailyMeals mealsByWeek={mealsByWeek} />
            ) : (
              <WeeklyMeals mealsByWeek={mealsByWeek} />
            )}
          </Row>
        </>
      )}
    </div>
  );
}

export default Recipes;
