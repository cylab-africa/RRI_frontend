export function formatDate(dateString) {
    // Define the options for formatting
    const date = new Date(dateString)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
  
    // Create a new Intl.DateTimeFormat object with the specified options
    const formatter = new Intl.DateTimeFormat('en-US', options);
  
    // Format the date
    return formatter.format(date);
  }

  export function normalizeScoreFun(score, maxScore, mormalTo) {
    if (maxScore === 0) {
      throw new Error("maxScore cannot be zero");
    }
    
    const normalizedScore = (score / maxScore) * mormalTo;
    return Math.round(normalizedScore); // Rounding to the nearest integer
  }


  export function getColorBasedOnNumber(number) {
    if (number < 0 || number > 100) {
      throw new Error("Number must be between 0 and 100.");
    }
  
    if (number < 50.0) {
      return "red";
    } else if (number < 70.0) {
      return "orange";
    } else {
      return "green";
    }
  }

