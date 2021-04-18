const ProfColor = (prof) => {
  switch (prof) {
    case "Guardian":
      return "rgb(51, 153, 204)";
    case "Warrior":
      return "rgb(244, 152, 61)";
    case "Engineer":
      return "rgb(153, 102, 51)";
    case "Ranger":
      return "rgb(102, 204, 51)";
    case "Thief":
      return "rgb(151, 69, 80)";
    case "Elementalist":
      return "rgb(220, 66, 62)";
    case "Mesmer":
      return "rgb(153, 51, 153)";
    case "Necromancer":
      return "rgb(51, 153, 102)";
    case "Revenant":
      return "rgb(204, 99, 66)";
    default:
      return "white";
  }
};

export default ProfColor;
