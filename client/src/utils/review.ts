function validateStars(stars: string) {
  if (!stars) return "Enter a star rating!";
  if (Number(stars) < 1 || Number(stars) > 5)
    return "Enter a star rating from 1-5!";
  return "";
}

function validateTitle(title: string) {
  if (!title || !title.trim()) return "Enter a review title!";
  if (title.length < 5) return "Title to short, must be greater than 5!";
  else if (title.length > 100) return "Title to long, must be less than 100!";
  return "";
}

function validateDescription(description: string) {
  if (!description || !description.trim()) return "Enter a review description!";
  const descriptionTrimmed = description.trim();

  const wordCount = description.trim().split(" ").length;
  if (descriptionTrimmed.length < 5)
    return "Description is too short!, must be more than 5 characters";
  if (descriptionTrimmed.length > 450)
    return "Description is too short!, must be less than 450 characters";
  else if (wordCount < 5)
    return "Description is too short, must be more than 5 words!";
  else if (wordCount > 100)
    return "Description is too long, must be less than 100 words!";
  return "";
}

export async function validateReview(v: Record<string, string>) {
  const errors: Record<string, string> = {};

  if (validateStars(v.stars)) errors.stars = validateStars(v.stars);
  if (validateTitle(v.title)) errors.title = validateTitle(v.title);
  if (validateDescription(v.description))
    errors.description = validateDescription(v.description);

  return errors;
}
