export type StudyTip = {
  id: string;
  title: string;
  description: string;
};

const studyTips: StudyTip[] = [
  {
    id: "1",
    title: "Take Short Breaks",
    description:
      "Study for a focused period, then take a short break to refresh your mind.",
  },
  {
    id: "2",
    title: "Set Small Goals",
    description:
      "Break large assignments into smaller tasks that are easier to complete.",
  },
  {
    id: "3",
    title: "Practice What You Learn",
    description:
      "Writing code and building small projects can help you understand programming concepts better.",
  },
  {
    id: "4",
    title: "Review Your Notes",
    description:
      "Spend a few minutes reviewing previous lessons before starting a new topic.",
  },
  {
    id: "5",
    title: "Avoid Distractions",
    description:
      "Keep unnecessary notifications and distractions away while studying.",
  },
];

export default studyTips;