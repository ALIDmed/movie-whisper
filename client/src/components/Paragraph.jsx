import { useState } from "react";

const Paragraph = ({ text, maxChars }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p>
        {expanded ? text : text.slice(0, maxChars)}
        {!expanded && text.length > maxChars && "... "}
        {text.length > maxChars && (
          <span
            onClick={() => setExpanded((prev) => !prev)}
            className="cursor-pointer text-blue-500"
          >
            {expanded ? " Read Less" : " Read More"}
          </span>
        )}
      </p>
    </div>
  );
};

export default Paragraph;
