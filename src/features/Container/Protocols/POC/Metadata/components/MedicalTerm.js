import "./medical.scss";
const words = [
  {
    name: "journey",
    term: "travelling",
  },
  {
    name: "destination",
    term: "End of Line",
  },
  //   {
  //     name: "happiness",
  //     term: "Stay Happy",
  //   },
];

const sentence = "Happiness is a journey, not a destination.";

const MedicalTerm = () => {
  const sentenceArr = sentence.split(" ");
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
          <label>{elem}</label>
          <span>{words[isPresent(elem).index].term}</span>
        </div>
      );
    } else {
      return <div className="word">{elem}</div>;
    }
  };
  return (
    <div className="medical-term">
      {sentenceArr.map((elem) => (
        <div>{renderWords(elem)}</div>
      ))}
    </div>
  );
};

export default MedicalTerm;
