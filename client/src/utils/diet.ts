const DIET_LIST_KEY = "__DIET";

export function getDietList() {
  try {
    return JSON.parse(localStorage.getItem(DIET_LIST_KEY) || "{}");
  } catch {
    return {};
  }
}

function calculateCalories(
  weight: number,
  height: number,
  age: number,
  activityLevel: number,
  gender: string,
  calorieAdjustment: number
) {
  const bmr =
    gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = bmr * activityLevel;
  const targetCalories = tdee + calorieAdjustment;
  return targetCalories;
}

export function gainWeight(
  weight: number,
  height: number,
  age: number,
  activityLevel: number,
  gender: string
) {
  return calculateCalories(weight, height, age, activityLevel, gender, 500);
}

export function loseWeight(
  weight: number,
  height: number,
  age: number,
  activityLevel: number,
  gender: string
) {
  return calculateCalories(weight, height, age, activityLevel, gender, -500);
}

export function maintainWeight(
  weight: number,
  height: number,
  age: number,
  activityLevel: number,
  gender: string
) {
  return calculateCalories(weight, height, age, activityLevel, gender, 0);
}
