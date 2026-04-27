export const PageTitle = (title) => {
  switch (title) {
    case "overview":
      return "Dashboard";
    case "applications":
      return "Applications";
    case "council":
      return "Council Members";
    case "awardees":
      return "Awardees";
    case "content":
      return "Content Management";
    case "messages":
      return "Messages";
    case "preferences":
      return "Preferences";
    default:
      return "Dashboard";
  }
};
