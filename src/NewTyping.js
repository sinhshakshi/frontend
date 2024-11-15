import { useState } from 'react';
import { diffWords } from 'diff';

const NewTyping = () => {
  const [userInput, setUserInput] = useState(''); // User's input
  const [result, setResult] = useState(''); // Comparison result

  const originalParagraph = `Today perhaps your only association with the word 'polio' is the Sabin Oral Vaccine that protects children from the disease. Fifty-five years ago, this was not so. The dreaded disease, which mainly affects the brain and the spinal cord; causes stiffening and weakening of the muscles, crippling and paralysis - which is why I am in a wheelchair today.`;

  const compareParagraph = () => {
    // Trim both original and user input to avoid trailing spaces affecting the comparison
    const trimmedOriginal = originalParagraph.trim();
    const trimmedUserInput = userInput.trim();

    // Use diffWords to compare the original and user input paragraphs word-by-word
    const diff = diffWords(trimmedOriginal, trimmedUserInput);

    // Build the comparison result by mapping the diff output to formatted HTML
    const comparisonResult = diff.map(part => {
      const text = part.value.trim(); // Trim text to avoid extra spaces
      if (part.added) {
        // Extra words in user input (marked in red)
        return `<span class="wrongword">${text}</span>`;
      } else if (part.removed) {
        // Missing words from the original paragraph (marked in gray)
        return `<span class="missingword">${text}</span>`;
      } else {
        // Correct words (marked in green)
        return `<span class="correctword">${text}</span>`;
      }
    }).join(' ');

    // Set the result in the state
    setResult(comparisonResult);
  };

  return (
    <div>
      <h2>Typing Test</h2>
      <div>
        <h3>Original Paragraph:</h3>
        <p>{originalParagraph}</p>
      </div>
      <div>
        <textarea
          placeholder="Start typing here..."
          rows={10}
          cols={100}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <br />
        <button onClick={compareParagraph}>Compare</button>
      </div>
      <div>
        <h3>Comparison Result:</h3>
        <div
          className="comparison-result"
          dangerouslySetInnerHTML={{ __html: result }}
        ></div>
      </div>
      <style jsx>{`
        .correctword {
          color: green;
        }
        .wrongword {
          color: red;
        }
        .missingword {
          color: gray;
        }
        .comparison-result {
          border: 1px solid #ccc;
          padding: 10px;
          background-color: #f9f9f9;
        }
      `}</style>
    </div>
  );
};

export default NewTyping;
