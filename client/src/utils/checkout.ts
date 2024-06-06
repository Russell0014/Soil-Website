function validateInput(i: string) {
  return !i || !i.trim(); // must be valid and not empty string
}

function validateEmail(v: Record<string, string>): string {
  if (!v.email) return "Enter a email!";
  else if (!/\S+@\S+\.\S+/.test(v.email)) return "Enter a valid email address!";

  return "";
}

function validatePostcode(v: Record<string, string>): string {
  if (!v.postcode) return "Enter a postcode!";
  else if (isNaN(Number(v.postcode))) return "Invalid postcode!";
  else if (v.postcode.length < 3 || v.postcode.length > 5)
    return "Invalid postcode!";
  return "";
}

// using luhns algorithm
// references
// https://cs50.harvard.edu/x/2020/psets/1/credit/
// https://www.geeksforgeeks.org/luhn-algorithm/
// https://developer.paypal.com/api/nvp-soap/payflow/integration-guide/test-transactions/#standard-test-cards
function validateCardNumber(v: Record<string, string>): string {
  const card = v.cnum;
  if (!card) return "Enter a card number!";
  if (isNaN(Number(card))) return "Enter a valid card number!";

  const cardLength = card.length;
  if (cardLength <= 10) return "Enter a valid card number!";

  let sum = 0;
  for (let i = cardLength - 1; i >= 0; i--) {
    let digit = card.charCodeAt(i) - "0".charCodeAt(0); // get digit char to int
    if ((cardLength - i) % 2 === 0) {
      // 2 * every second digit from back
      digit *= 2;
      if (digit >= 10) {
        sum += Math.floor(digit / 10) + (digit % 10);
      } else {
        sum += digit;
      }
    }
    // just add
    else {
      sum += digit;
    }
  }
  if (sum % 10 !== 0) return "Enter valid a card number!";
  return "";
}

function validateCardExp(v: Record<string, string>): string {
  const cexpDate = new Date(v.cexp);
  const currDate = new Date();
  if (cexpDate < currDate) return "Invalid card expiry!";
  return "";
}

function validateCardCCV(v: Record<string, string>): string {
  if (!v.cccv) return "Enter a CCV!";
  else if (isNaN(Number(v.cccv))) return "Invalid CCV!";
  else if (v.cccv.length < 3 || v.cccv.length > 4) return "Invalid CCV!";
  return "";
}

async function validateCheckout(v: Record<string, string>) {
  const errors: Record<string, string> = {};

  if (validateInput(v.fname)) errors.fname = "Enter your first name!";
  if (validateInput(v.lname)) errors.lname = "Enter your last name!";
  if (validateEmail(v)) errors.email = validateEmail(v);

  // We will not be strict on validating location
  if (validateInput(v.address)) errors.address = "Enter a delivery address!";
  if (validateInput(v.country)) errors.country = "Enter country!";
  if (validateInput(v.state)) errors.state = "Enter state!";
  if (validatePostcode(v)) errors.postcode = validatePostcode(v);

  if (validateInput(v.cname)) errors.cname = "Enter your full name on card!";
  if (validateCardNumber(v)) errors.cnum = validateCardNumber(v);
  if (validateCardExp(v)) errors.cexp = validateCardExp(v);
  if (validateCardCCV(v)) errors.cccv = validateCardCCV(v);

  return errors;
}

export { validateCheckout };
