const checkListItem = (check) => {
  return check ? "x" : " ";
};

const typeOfPR = [
  { title: "🍕 Feature", value: "feature" },
  { title: "🐛 Hotfix", value: "hotfix" },
  { title: "📝 Readme update", value: "readme" },
  { title: "🎨 Style", value: "style" },
  { title: "🧑‍💻 Code Refactor", value: "refactor" },
  { title: "🔥 Performance Improvements", value: "perf" },
  { title: "✅ Test", value: "test" },
  { title: "🤖 Build", value: "build" },
  { title: "🔁 CI", value: "ci" },
  { title: "📦 Chore (Release)", value: "chore" },
  { title: "⏩ Revert", value: "revert" },
];

module.exports = {
  questions: [
    {
      type: "multiselect",
      name: "type",
      message: "What type of PR is this? (check all applicable)",
      choices: typeOfPR,
      initial: 1,
    },
    {
      type: "text",
      name: "description",
      message: "Description",
    },
    {
      type: "text",
      name: "ticket",
      message: "Related Tickets & Documents",
    },
    {
      type: "select",
      name: "tests",
      message: "Added tests?",
      choices: [
        { title: "👍 yes", value: true },
        { title: "🙋 no, because I need help", value: false },
        { title: "🙅 no, because they are not needed", value: null },
      ],
      initial: 2,
    },
    {
      type: "select",
      name: "documentation",
      message: "Added to documentation?",
      choices: [
        { title: "📜 README.md", value: "readme" },
        { title: "📓 notion docs", value: "notion" },
        {
          title: "🙅 no documentation needed",
          value: "nodoc",
        },
      ],
      initial: 2,
    },
    {
      type: "text",
      name: "postDeployment",
      message:
        "[optional] Are there any post-deployment tasks we need to perform?",
    },
  ],
  body: ({
    type,
    description,
    ticket,
    tests,
    documentation,
    postDeployment,
  }) => {
    return `
# What type of PR is this? (check all applicable)
- [${checkListItem(type.includes("feature"))}] 🍕 Feature
- [${checkListItem(type.includes("hotfix"))}] 🐛 Hotfix
- [${checkListItem(type.includes("readme"))}] 📝 Readme update
- [${checkListItem(type.includes("style"))}] 🎨 Style
- [${checkListItem(type.includes("refactor"))}] 🧑‍💻 Code Refactor
- [${checkListItem(type.includes("perf"))}] 🔥 Performance Improvements
- [${checkListItem(type.includes("test"))}] ✅ Test
- [${checkListItem(type.includes("build"))}] 🤖 Build
- [${checkListItem(type.includes("ci"))}] 🔁 CI
- [${checkListItem(type.includes("chore"))}] 📦 Chore (Release)
- [${checkListItem(type.includes("revert"))}] ⏩ Revert

## Description

${description}

## Related Tickets & Documents

${ticket
        ? `[${ticket}](https://rankmi.myjetbrains.com/youtrack/issue/${ticket})`
        : ""
      }

## Mobile & Desktop Screenshots/Recordings

Add images or videos

## Added tests?

- [${checkListItem(tests)}] 👍 yes
- [${checkListItem(tests === null)}] 🙅 no, because they aren't needed
- [${checkListItem(!tests)}] 🙋 no, because I need help

## Added to documentation?

- [${documentation === "readme" ? "x" : " "}] 📜 README.md
- [${documentation === "notion" ? "x" : " "}] 📓 notion docs
- [${documentation === "nodoc" ? "x" : " "}] 🙅 no documentation needed

## [optional] Are there any post-deployment tasks we need to perform?
${postDeployment}
`;
  },
};
