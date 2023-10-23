import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import Paragraph from "./Paragraph";
import axios from "axios";

const Reviews = () => {
  const { movieId } = useContext(AppContext);
  const [reviews, setReviews] = useState(null);
  const maxReviewsCount = 5;
  useEffect(() => {
    if (!movieId) return;
    axios
      .get("http://127.0.0.1:5000/reviews", {
        params: {
          movie_id: movieId,
        },
      })
      .then((res) => setReviews(res.data.results));
  }, [movieId]);

  if (!reviews) return <></>;

  return (
    <div className="max-w-[1400px] px-10 py-8 mx-auto">
      <div className="text-4xl sm:text-5xl font-extrabold text-center mb-8">
        <h1>User Reviews</h1>
      </div>
      {reviews.length === 0 ? (
        <div>
          <h3 className=" text-gray-600 sm:text-xl text-lg text-center font-semibold">
            No reviews were found for this movie 🙁
          </h3>
        </div>
      ) : (
        <div className="border rounded-lg border-[#1f2937] overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 w-full">
            <thead className="bg-[#1f2937] text-left text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium text-gray-100">
                  Author
                </th>
                <th scope="col" className="px-6 py-3 font-medium text-gray-100">
                  Review
                </th>
                <th scope="col" className="px-6 py-3 font-medium text-gray-100">
                  Sentiment
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {reviews.slice(0, maxReviewsCount).map((review, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 font-semibold">
                    {review?.author || "NaN"}
                  </td>
                  <td className="px-6 py-4 font-light max-w-[80%] break-words">
                    <Paragraph text={review?.content} maxChars={200} />
                  </td>
                  <td className="px-6 py-4">
                    {review?.sentiment || "NaN"}
                    {review?.sentiment == "Good" ? " 😃" : " 😫"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reviews;
