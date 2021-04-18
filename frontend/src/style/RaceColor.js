const RaceColor = (race) => {
  switch (race) {
    case "Human":
      return "rgb(255,229,102)";
    case "Asura":
      return "rgb(162, 123, 241)";
    case "Sylvari":
      return "rgb(97,230,101)";
    case "Charr":
      return "rgb(254, 120, 135)";
    case "Norn":
      return "rgb(117,186,255)";
    default:
      return "white";
  }
};

export default RaceColor;
