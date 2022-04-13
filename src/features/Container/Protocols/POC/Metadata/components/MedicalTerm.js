import "./medical.scss";
import InfoIcon from "apollo-react-icons/Info";
import IconButton from "apollo-react/components/IconButton";
import Tooltip from "apollo-react/components/Tooltip";
import { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import Accordion from "apollo-react/components/Accordion";
import AccordionDetails from "apollo-react/components/AccordionDetails";
import AccordionSummary from "apollo-react/components/AccordionSummary";

// const words = [
//   {
//     name: "asthma",
//     term: "Indication",
//   },
//   {
//     name: "LABA",
//     term: "Bronchodilators",
//   },
// ];

// const sentence = "Happiness is a journey, not a destination.";

const MedicalTerm = ({ data, detail }) => {
  console.log("Medical Terms", data, detail);
  // const sentenceArr = sentence.split(" ");
  const [words, setWords] = useState([]);
  useEffect(() => {
    const wordArr = [];
    if (!isEmpty(data)) {
      Object.keys(data).map((key) => {
        const obj = {
          name: key,
          ...data[key],
        };
        wordArr.push(obj);
      });
      setWords(wordArr);
    }
  }, [data]);
  const isPresent = (word) => {
    let found = false;
    let index = -1;
    for (let i = 0; i < words.length; i++) {
      if (word.toLowerCase().includes(words[i].name.toLowerCase())) {
        found = true;
        index = i;
        break;
      }
    }
    return { found, index };
  };

  const renderWords = (elem) => {
    if (isPresent(elem).found) {
      return (
        <div className="word word-box">
          <label>
            {elem}
            <Tooltip
              variant="dark"
              // title="Medical Terms"
              // subtitle="Lorem ipsum dolor sit amet."
              extraLabels={[
                {
                  title: "Class",
                  subtitle: words[isPresent(elem).index].class,
                },
                {
                  title: "Ontology",
                  subtitle: words[isPresent(elem).index].ontology,
                },
                {
                  title: "Synonyms",
                  subtitle: words[isPresent(elem).index].synonyms.map(
                    (item) => item
                  ),
                },
              ]}
              placement="top"
              style={{ marginRight: 192 }}
            >
              <IconButton color="primary">
                <InfoIcon fontSize={12} />
              </IconButton>
            </Tooltip>
          </label>
          {/* <span>{words[isPresent(elem).index].term}</span> */}
        </div>
      );
    } else {
      return <div className="word">{elem}</div>;
    }
  };
  const renderSentences = (para) => {
    const sentenceArr = para.split(" ");
    return (
      <div className="medical-term">
        {sentenceArr.map((elem) => (
          <div>{renderWords(elem)}</div>
        ))}
      </div>
    );
  };
  return (
    <Accordion>
      <AccordionSummary>
        <div className="meta-parent-header">Medical Terms</div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="meta-container">
          <div className="attributes-term">
            {detail &&
              detail.length > 0 &&
              detail.map((elem) => <div>{renderSentences(elem.content)}</div>)}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default MedicalTerm;
