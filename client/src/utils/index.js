import axios from "axios";

export const getMovieWatchTime = (time) => {
  const hours = parseInt(time / 60);
  const minutes = time - hours * 60;
  return `${hours}h ${minutes}min`;
};

export const reviewColor = (rating) => {
  if (rating < 49) return "#db2360";
  else if (rating < 69) return "#d2d531";
  else {
    return "#20be70";
  }
};

export const extractCrew = (crewObject) => {
  const crew = [];
  const seekedJobs = {
    "Executive Producer": 0,
    Producer: 0,
    Director: 0,
    Writer: 0,
  };
  crewObject.map((crewMember) => {
    if (
      seekedJobs.hasOwnProperty(crewMember.job) &&
      seekedJobs[crewMember.job] === 0
    ) {
      crew.push(crewMember);
      seekedJobs[crewMember.job] = 1;
    }
  });
  return crew;
};

export const formatNumber = (number) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number / 100);

  return formattedPrice;
};
