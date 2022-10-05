export const PhishingQuestions = [
  {
    questionText: "Which one of these statements is correct?",
    answerOptions: [
      {
        answerText:
          "If you get an email that looks like it's from someone you know, you can click on any links as long as you have a spam blocker and anti-virus protection.",
        isCorrect: false,
      },
      {
        answerText:
          "You can trust an email really comes from a client if it uses the client's logo and contains at least one fact about the client that you know to be true.",
        isCorrect: false,
      },
      {
        answerText:
          "If you get a message from a colleague who needs your network password, you should never give it out unless the colleague says it's an emergency.",
        isCorrect: false,
      },
      {
        answerText:
          "If you get an email from Human Resources asking you to provide personal information right away, you should check it out first to make sure they are who they say are.",
        isCorrect: true,
      },
    ],
  },
  {
    questionText:
      "An email from your boss asks for the name, addresses, and credit card information of the company's top clients. The email says it's urgent and to please reply right away. You should reply right away. True or False?",
    answerOptions: [
      { answerText: "True", isCorrect: false },
      { answerText: "False", isCorrect: true },
    ],
  },
  {
    questionText:
      "You get a text message from a vendor who asks you to click on a link to renew your password so that you can log in to its website. You should:",
    answerOptions: [
      {
        answerText:
          "Reply to the text to confirm that you really need to renew your password.",
        isCorrect: false,
      },
      {
        answerText:
          "Pick up the phone and call the vendor, using a phone number you know to be correct, to confirm that the request is real.",
        isCorrect: true,
      },
      {
        answerText:
          "Click on the link. If it takes you to the vendor's website, then you'll know it's not a scam.",
        isCorrect: false,
      },
    ],
  },
  {
    questionText:
      "Email authentication can help protect against phishing attacks. True or False?",
    answerOptions: [
      { answerText: "True", isCorrect: true },
      { answerText: "False", isCorrect: false },
    ],
  },
  {
    questionText:
      "If you fall for a phishing scam, what should you do to limit the damage?",
    answerOptions: [
      {
        answerText: "Delete the phishing email.",
        isCorrect: false,
      },
      {
        answerText: "Unplug the computer. This will get rid of any malware.",
        isCorrect: false,
      },
      {
        answerText: "Change any compromised passwords.",
        isCorrect: true,
      },
    ],
  },
];
