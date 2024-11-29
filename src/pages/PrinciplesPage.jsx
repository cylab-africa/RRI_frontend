import React from "react";

const styles = {
    container: {
      maxWidth: "900px",
      margin: "40px auto",
      padding: "20px",
      background: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    h1: {
      fontSize: "30px",
      color: "#009647",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "30px",
    },
    description: {
      fontSize: " 16px",
      marginBottom: "30px",
      textAlign: "justify",
    },
    principlesList: {
      listStyle: "none",
      padding: 0,
    },
    listItem: {
      padding: "15px 20px",
      margin: "10px 0",
      background: "#f1f1f1",
      borderLeft: "5px solid #009647",
      borderRadius: "8px",
      fontSize: "16px",
      display: "flex",
      alignItems: "flex-start",
    },

    principleTitle: {
        display: "inline-block",
        fontWeight: "bold",
        // color: "#0056b3",
        marginRight: "10px",
        whiteSpace: "nowrap",
      },
      principleDescription: {
        display: "inline-block",
        color: "#333",
      },
      

  };

const PrinciplesPage = () => {
  const principles = [
    {
      title: "Privacy",
      description:
        "Respect individual privacy by collecting and using personal data only when necessary, with proper consent and confidentiality safeguards.",
    },
    {
      title: "Transparency",
      description:
        "Clearly communicate decision-making processes, data usage, and potential biases to ensure openness and build trust.",
    },
    {
      title: "Ethics",
      description:
        "Adhere to the highest ethical standards in research and innovation, respecting societal values and individual rights.",
    },
    {
      title: "Inclusivity",
      description:
        "Ensure accessibility for all, accommodating people of diverse abilities, backgrounds, and cultures, including those with disabilities.",
    },
    {
      title: "Responsiveness",
      description:
        "Innovate in ways that respond to stakeholder needs and expectations, ensuring fairness and accountability.",
    },
    {
      title: "Fairness",
      description:
        "Treat all individuals equally, without discrimination based on race, gender, ethnicity, religion, or other protected characteristics.",
    },
    {
      title: "Governance",
      description:
        "Establish accountable and adaptable measures to guide research and innovation toward acceptable and desirable futures.",
    },
    {
      title: "Public Engagement",
      description:
        "Involve diverse stakeholders in discussions about science and technology, ensuring outcomes align with societal values and needs.",
    },
    {
      title: "Accountability",
      description:
        "Take responsibility for any harm caused by innovations and ensure that the responsible parties are clearly identifiable.",
    },
    {
      title: "Gender Equality",
      description:
        "Promote balanced representation of men and women in research and innovation teams, considering gender perspectives in outcomes.",
    },
    {
      title: "Human Agency and Oversight",
      description:
        "Enable individuals to understand, control, and intervene in the use of technology, especially in critical decisions.",
    },
    {
      title: "Security",
      description:
        "Safeguard data and privacy from unauthorized access or misuse through robust protection measures.",
    },
    {
      title: "Sustainability",
      description:
        "Develop environmentally friendly innovations that minimize harm and promote sustainable practices.",
    },
    {
      title: "Benefit to Society",
      description:
        "Focus on addressing significant societal challenges, such as poverty, climate change, and public health, to improve overall well-being.",
    },
    {
      title: "Open Access",
      description:
        "Make research findings, methodologies, and data freely available whenever possible, promoting transparency and collaboration.",
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Principles of Responsible Research and Innovation</h1>
      <p style={styles.description}>
        Responsible Research and Innovation (RRI) is a policy-driven approach
        that emphasizes inclusive and sustainable research and innovation. It
        promotes engagement with society throughout the research process to
        ensure ethical and socially beneficial outcomes.
      </p>
      <ul style={styles.principlesList}>
        {principles.map((principle, index) => (
          <li key={index} style={styles.listItem}>
            <span style={styles.principleTitle}>{principle.title}:</span>
            <span style={styles.principleDescription}>{principle.description}</span>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default PrinciplesPage;
