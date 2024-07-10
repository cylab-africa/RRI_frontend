const questions = [
    {
      id: 1,
      layerId: 1,
      question:
        "What societal problem does your innovation address, and how does it positively impact the local community or society as a whole?",
       dimention:"Benefits to Society & Public Engagement",
       weight:0.319/2,
      subquestions: [
        {
          id: 1,
          type: "text",
          weight: 5,
          questionText:
            "Briefly describe the societal problem that your innovation or research project addresses and how it positively impacts the local community or society as a whole.",
        },
        {
          id: 2,
          type: "scale",
          weight: 5,
          questionText:
            "How well does your research or innovation project positively impact the local community or society as a whole?",
        },
      ],
    },
    {
      id: 2,
      layerId: 1,
      question: "How do you involve the local community in the design and implementation of your innovation to ensure their needs and perspectives are considered?",
      dimention:"Benefits to Society & Public Engagement",
      weight:0.319/2,
      subquestions: [
        {
          id: 3,
          type: "choice",
          weight: 10,
          questionText:
            "You involve the local community in the design and implementation of your innovation to ensure their needs and perspectives are considered.",
        },
      ],
    },
    {
      id: 3,
      layerId: 1,
      question: "Can you provide insights into the ethical considerations that have guided the development and deployment of your innovation?",
      dimention :"Ethics & Governance",
      weight:0.339/2,
      subquestions: [
        {
          id: 4,
          type: "scale",
          weight: 5,
          questionText:
            "How well do you consider ethical concerns in the development of your innovation?",
        },
        {
          id: 5,
          type: "scale",
          weight: 5,
          questionText:
            "How well do you consider ethical concerns in the deployment of your innovation?.",
        },
      ],
    },
    {
      id: 4,
      layerId: 1,
      question: "What governance mechanisms are in place to ensure responsible decision-making and compliance with relevant regulations and ethical guidelines?",
      dimention :"Ethics & Governance",
      weight:0.339/2,
      subquestions: [
        {
          id: 6,
          type: "choice",
          weight: 10,
          questionText:
            "We have implemented governance mechanisms to ensure responsible decision-making and compliance with relevant regulations and ethical guidelines.",
        },
      ],
    },
    {
      id: 5,
      layerId: 1,
      question: "How do you protect the privacy and security of individuals' data collected by your innovation, including obtaining consent and preventing unauthorized access?",
      dimention :"Privacy and Security",
      weight:0.342/2,
      subquestions: [
        {
          id: 7,
          type: "scale",
          weight: 2.5,
          questionText:
            "How well do you protect the privacy of individuals’ data collected by your innovation or research project?",
        },
        {
          id: 8,
          type: "choice",
          weight: 2.5,
          questionText:
            "You ensure that you obtain informed consent before collecting data from individuals.",
        },
        {
          id: 9,
          type: "choice",
          weight: 2.5,
          questionText:
            "You implement security mechanisms to prevent unauthorized access to data.",
        },
        {
          id: 10,
          type: "choice",
          weight: 2.5,
          questionText:
            "You implement security mechanisms to protect individuals’ data at rest and on transit.",
        },
      ],
    },
    {
      id: 6,
      layerId: 1,
      question: "In case of security incidents or breaches, how do you handle and communicate such events transparently to affected parties and stakeholders?",
      dimention :"Privacy and Security",
      weight:0.342/2,
      subquestions: [
        {
          id: 11,
          type: "choice",
          weight: 5,
          questionText:
            "You transparently communicate security incidents and breaches  to affected parties and stakeholders.",
        },
        {
          id: 12,
          type: "choice",
          weight: 5,
          questionText:
            "You transparently handle security incidents and breaches  with affected parties and stakeholders.",
        },
      ],
    },

    {
      id: 7,
      layerId: 2,
      question: "What steps do you take to identify and address biases in data collection, analysis, and interpretation to ensure fair and equitable outcomes?",
      dimention :"Fairness, gender equality & inclusivity",
      weight:0.488/3,
      subquestions: [
        {
          id: 13,
          type: "scale",
          weight: 10,
          questionText:
            "How well do you take steps to identify and address biases in data collection, analysis, and interpretation to ensure fair and equitable outcomes?",
        },
      ],
    },
    
    {
      id: 9,
      layerId: 2,
      question: "How do you ensure that your innovation is accessible and affordable to individuals and communities, especially those in remote or underserved areas?",
      dimention :"Fairness, gender equality & inclusivity",
      weight:0.488/3,
      subquestions: [
        {
          id: 14,
          type: "choice",
          weight: 10,
          questionText:
            "We plan to ensure that your innovation or research project is accessible and affordable to individuals and communities, especially those in remote or underserved areas.",
        },
      ],
    },
    {
      id: 10,
      layerId: 2,
      question: "In what ways does your innovation incorporate inclusivity, considering the needs and perspectives of individuals with disabilities or those from different cultural backgrounds?",
      dimention :"Fairness, gender equality & inclusivity",
      weight:0.488/3,
      subquestions: [
        {
          id: 15,
          type: "choice",
          weight: 10,
          questionText:
            "Your  innovation or research project incorporates inclusivity and considers the needs and perspectives of individuals with disabilities or those from different cultural backgrounds.",
        },
      ],
    },
    {
      id: 11,
      layerId: 2,
      question: "What accountability mechanisms are in place to ensure that your innovation's outcomes and consequences are tracked, evaluated, and communicated to relevant stakeholders?",
      dimention :"Responsiveness, transparency, & accountability",
      weight:0.512,
      subquestions: [
        {
          id: 16,
          type: "choice",
          weight: 10,
          questionText:
            "You have put in place accountability mechanisms to ensure that your innovation or research project's outcomes and consequences are tracked, evaluated, and communicated to relevant stakeholders.",
        },
      ],
    },
    {
      id: 12,
      layerId: 2,
      question: "How do you ensure that your innovation's data and findings are accessible and understandable to individuals from diverse educational and linguistic backgrounds?",
      dimention:"Fairness, gender equality & inclusivity",
      weight:0.488/4,
      subquestions: [
        {
          id: 17,
          type: "choice",
          weight: 10,
          questionText:
            "You ensure that your innovation or research project's data and findings are accessible and understandable to individuals from diverse educational and linguistic backgrounds.",
        },
      ],
    },

    {
      id: 13,
      layerId: 3,
      question: "How do you ensure that individuals and communities have the necessary information and autonomy to make informed decisions about their participation in and interactions with your innovation.",
      dimention :"Human agency and oversight",
      weight:0.5,
      subquestions: [
        {
          id: 18,
          type: "choice",
          weight: 10,
          questionText:
            "You ensure that individuals and communities have the necessary information and autonomy to make informed decisions about their participation in and interactions with your innovation or research project.",
        },
      ],
    },
    {
      id: 14,
      layerId: 3,
      question: "How do you ensure that human values and ethical considerations are integrated into the development and deployment of the innovation, and that these values guide its decision-making processes?",
      dimention :"Human agency and oversight",
      weight:0.5,
      subquestions: [
        {
          id: 19,
          type: "choice",
          weight: 10,
          questionText:
            "You ensure that human values and ethical considerations are integrated into the development and deployment of the innovation, and that these values guide its decision-making processes.",
        },
      ],
    },
  ];



// //   100%
//   const subquestionScores = [
//     {
//       id: 1,
//       score: 'The Mira project is an internet observatory project for Africa',
//       q_number: 1
//     },
//     { id: 2, score: 10, q_number: 1 },
//     { id: 3, score: 10, q_number: 2 },
//     { id: 4, score: 10, q_number: 3 },
//     { id: 5, score: 10, q_number: 3 },
//     { id: 6, score: 10, q_number: 4 },
//     { id: 7, score: 10, q_number: 5 },
//     { id: 8, score: 10, q_number: 5 },
//     { id: 9, score: 10, q_number: 5 },
//     { id: 10, score: 10, q_number: 5 },
//     { id: 11, score: 10, q_number: 6 },
//     { id: 12, score: 10, q_number: 6 },
//     { id: 13, score: 10, q_number: 7 },
//     { id: 14, score: 10, q_number: 9 },
//     { id: 15, score: 10, q_number: 10 },
//     { id: 16, score: 10, q_number: 11 },
//     { id: 17, score: 10, q_number: 12 },
//     { id: 18, score: 10, q_number: 13 },
//     { id: 19, score: 10, q_number: 14 }
//   ]

  

//   //   70 - 100 %
//   const subquestionScores = [
//     {
//       id: 1,
//       score: 'The Mira project is an internet observatory project for Africa',
//       q_number: 1
//     },
//     { id: 2, score: 8, q_number: 1 },
//     { id: 3, score: 5, q_number: 2 },
//     { id: 4, score: 10, q_number: 3 },
//     { id: 5, score: 10, q_number: 3 },
//     { id: 6, score: 10, q_number: 4 },
//     { id: 7, score: 10, q_number: 5 },
//     { id: 8, score: 10, q_number: 5 },
//     { id: 9, score: 10, q_number: 5 },
//     { id: 10, score: 10, q_number: 5 },
//     { id: 11, score: 10, q_number: 6 },
//     { id: 12, score: 10, q_number: 6 },
//     { id: 13, score: 10, q_number: 7 },
//     { id: 14, score: 10, q_number: 9 },
//     { id: 15, score: 10, q_number: 10 },
//     { id: 16, score: 10, q_number: 11 },
//     { id: 17, score: 10, q_number: 12 },
//     { id: 18, score: 10, q_number: 13 },
//     { id: 19, score: 10, q_number: 14 }
//   ]



// //   50 - 70 %
// const subquestionScores = [
//     {
//       id: 1,
//       score: 'The Mira project is an internet observatory project for Africa',
//       q_number: 1
//     },
//     { id: 2, score: 8, q_number: 1 },
//     { id: 3, score: 5, q_number: 2 },
//     { id: 4, score: 1, q_number: 3 },
//     { id: 5, score: 10, q_number: 3 },
//     { id: 6, score: 6, q_number: 4 },
//     { id: 7, score: 4, q_number: 5 },
//     { id: 8, score: 4, q_number: 5 },
//     { id: 9, score: 6, q_number: 5 },
//     { id: 10, score: 7, q_number: 5 },
//     { id: 11, score: 8, q_number: 6 },
//     { id: 12, score: 10, q_number: 6 },
//     { id: 13, score: 10, q_number: 7 },
//     { id: 14, score: 9, q_number: 9 },
//     { id: 15, score: 10, q_number: 10 },
//     { id: 16, score: 3, q_number: 11 },
//     { id: 17, score: 2, q_number: 12 },
//     { id: 18, score: 10, q_number: 13 },
//     { id: 19, score: 0, q_number: 14 }
//   ]


//   0 - 50 %
const subquestionScores = [
    {
      id: 1,
      score: 'The Mira project is an internet observatory project for Africa',
      q_number: 1
    },
    { id: 2, score: 8, q_number: 1 },
    { id: 3, score: 5, q_number: 2 },
    { id: 4, score: 1, q_number: 3 },
    { id: 5, score: 1, q_number: 3 },
    { id: 6, score: 6, q_number: 4 },
    { id: 7, score: 4, q_number: 5 },
    { id: 8, score: 4, q_number: 5 },
    { id: 9, score: 6, q_number: 5 },
    { id: 10, score: 7, q_number: 5 },
    { id: 11, score: 8, q_number: 6 },
    { id: 12, score: 1, q_number: 6 },
    { id: 13, score: 1, q_number: 7 },
    { id: 14, score: 9, q_number: 9 },
    { id: 15, score: 1, q_number: 10 },
    { id: 16, score: 3, q_number: 11 },
    { id: 17, score: 2, q_number: 12 },
    { id: 18, score: 1, q_number: 13 },
    { id: 19, score: 0, q_number: 14 }
  ]


  const layerOne = [];
  const layerTwo = [];
  const layerThree = [];
  
  subquestionScores.forEach(scoreEntry => {
    const q_number = scoreEntry.q_number;
    const question = questions.find(q => q.id === q_number);
    const layerId = question.layerId;
    if (layerId === 1) {
      layerOne.push(scoreEntry);
    } else if (layerId === 2) {
      layerTwo.push(scoreEntry);
    } else if (layerId === 3) {
      layerThree.push(scoreEntry);
    }
  });
  
  function calculateLayerAverage(layer) {
    let totalWeightedScore = 0;
    let totalWeight = 0;
    layer.forEach(scoreEntry => {
      const q_number = scoreEntry.q_number;
      const question = questions.find(q => q.id === q_number);
      const subquestion = question.subquestions.find(sq => sq.id === scoreEntry.id);

      const weight = subquestion.weight;
      const score = scoreEntry.score;
      if (typeof score === 'number') {
        totalWeightedScore += score * weight;
        totalWeight += weight;
      }
    });
    return totalWeight === 0 ? 0 : totalWeightedScore / totalWeight;
  }
  
  const layerOneAverage = calculateLayerAverage(layerOne);
  const layerTwoAverage = calculateLayerAverage(layerTwo);
  const layerThreeAverage = calculateLayerAverage(layerThree);
  
  const totalLayerWeight = questions.reduce((sum, q) => sum + q.weight, 0);
  const generalAverage = (
    layerOneAverage * questions.filter(q => q.layerId === 1).reduce((sum, q) => sum + q.weight, 0) +
    layerTwoAverage * questions.filter(q => q.layerId === 2).reduce((sum, q) => sum + q.weight, 0) +
    layerThreeAverage * questions.filter(q => q.layerId === 3).reduce((sum, q) => sum + q.weight, 0)
  ) / totalLayerWeight;
  
  console.log("Layer One Average:", layerOneAverage);
  console.log("Layer Two Average:", layerTwoAverage);
  console.log("Layer Three Average:", layerThreeAverage);
  console.log("General Average:", generalAverage);
  