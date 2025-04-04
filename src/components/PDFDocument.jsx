import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { normalizeScoreFun } from '../utils/utils';

// Survey data
const surveyData = [
    { question: 'Product is affordable', answer: 7 },
    { question: 'Product does what it claims', answer: 10 },
    { question: 'Product is better than other products on the market', answer: 'Strongly agree' },
    { question: 'Product is easy to use', answer: 'Agree' },
    { question: 'How satisfied are you with our product?', answer: 8 },
    { question: 'How likely are you to recommend our product to a friend or co-worker?', answer: 9 },
    { question: 'What would make you more satisfied with our product?', answer: 'Strongly agree' },
    { question: 'Compared to our competitors, do you feel our product is:', answer: 'Strongly agree' },
    { question: 'Do you feel our current price is merited by our product?', answer: 'Agree' },
    { question: 'What is the highest and lowest price you would pay for a product like ours?', answer: 'Disagree' },
    { question: 'Please leave your email address if you would like us to contact you.', answer: 'Agree' },
    { question: 'Compared to our competitors, do you feel our product is:', answer: 'Strongly agree' },
    { question: 'Do you feel our current price is merited by our product?', answer: 'Agree' }
];

const calculateGeneralScore = (data) => {
    let totalScore = 0;
    data.forEach(item => {
        if (typeof item.answer === 'number') {
            totalScore += item.answer;
        } else if (item.answer === 'Strongly agree') {
            totalScore += 10;
        } else if (item.answer === 'Agree') {
            totalScore += 8;
        } else if (item.answer === 'Neutral') {
            totalScore += 5;
        } else if (item.answer === 'Disagree') {
            totalScore += 3;
        } else if (item.answer === 'Strongly disagree') {
            totalScore += 1;
        }
    });
    return totalScore / data.length;
};

const generalScore = calculateGeneralScore(surveyData);

const styles = StyleSheet.create({
    principle: {
        textAlign: 'left',
        fontSize: 12

    },
    document: {
        padding: 20,
    },
    page: {
        flexDirection: 'column',
        padding: 30,
    },
    pageView: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        backgroundColor: '#F2F2F2',
        borderRadius: '10px',
        padding: 30
    },
    sectionTitle: {
        fontSize: 14,
    },
    sectionSubTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 6,
    },
    textSection: {
        marginTop: 10,
        marginBottom: 10
    },
    layerSection: {
        marginTop: 20,
        marginBottom: 5
    },
    image: {
        width: 150,
        height: 50,
        marginBottom: 10,
        alignSelf: 'center'
    },
    header: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20
    },
    title: {
        fontSize: 20,
        margin: 0
    },
    subtitle: {
        fontSize: 12,
        marginBottom: 5
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'justify' // Text justification
    },
    resultsTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 10,
        textDecoration: 'underline',
        textAlign: 'center'
    },
    question: {
        marginBottom: 5,
        marginTop: 10,
        fontSize: 12,
        textAlign: 'justify' // Text justification
    },
    summary: {
        marginTop: 20,
        fontSize: 12,
        textAlign: 'center' // Center alignment for summary
    },
    badge: {
        display: 'inline-block',
        padding: '5px 10px',
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        borderRadius: 4,
    },
    badgeColorExcellent: {
        color: '#008000'
    },
    badgeColorAverage: {
        color: '#FFA500'
    },
    badgeColorPoor: {
        color: '#FF0000'
    },
    badgeExcellent: {
        backgroundColor: '#008000'
    },
    badgeAverage: {
        backgroundColor: '#FFA500'
    },
    badgePoor: {
        backgroundColor: '#FF0000'
    },
    table: {
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginBottom: 10,
        textAlign: 'left'
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row'
    },

    tableCol: {
        width: '50%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: '10',
        marginTop: 5,
        fontSize: 12,
        padding: 3,
        textAlign: 'left'
    },

    spacer: {
        marginVertical: 10,  // Adjust the space as needed
    },

    descriptionSection: {
        marginBottom: 10,
        marginTop: 10,
    },
    descriptionText: {
        fontSize: 12, // Smaller than section title for hierarchy
        color: '#555', // Neutral color for description
        lineHeight: '1.5', // Comfortable line spacing for readability
        // marginBottom: 10,
        textAlign: 'justify', // Clean alignment for explanatory text
    },
    overall: {
        flexDirection: 'column',  // Ensures that items are stacked vertically
        alignItems: 'flex-start',  // Aligns text to the left (you can adjust as needed)
        marginBottom: 20,  // Adds space below the section
    },

    scoreText: {

        fontSize: 12,
        marginLeft: 15,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bullets: {
        marginVertical: 10,
    },
    bulletText: {
        fontSize: 12,
        color: '#666',  // Lighter color to keep focus on the score
        marginBottom: 5,
    },

    scoreContainer: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',  // Add a subtle background color
    },
    scoreTextLarge: {
        fontSize: 24,  // Make the score number stand out
        fontWeight: 'bold',
        // color: '#000',
    },
    scoreLabelText: {
        fontSize: 14,
        // color: '#666',
    },
    performanceLabelText: {
        fontSize: 16,
        fontWeight: '500',
        // color: '#000',
    },

    layerScoreContainer: {
        flexDirection: 'row',  // Ensures Layer label and score are side by side
        justifyContent: 'space-between',  // Keeps label and score at opposite ends
        alignItems: 'center',  // Centers content vertically
        paddingVertical: 8,  // Adds spacing between layers
        borderBottomWidth: 1,  // Optional: add a divider
        borderBottomColor: '#ddd',  // Light gray divider
    },

    layerText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
    },

    layerScore: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    principleScoreContainer: {
        flexDirection: 'row',  // Displays principle name and score side by side
        justifyContent: 'space-between',  // Aligns name to the left, score to the right
        alignItems: 'center',  // Vertically aligns content
        paddingVertical: 8,  // Adds vertical padding between principles
        borderBottomWidth: 1,  // Optional: add a separator
        borderBottomColor: '#ddd',  // Light gray separator
    },

    principleText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
    },

    principleScore: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
    },

    layersText: {

        marginLeft: 15,
        marginTop: 5,
        fontSize: 12,
        lineHeight: '1.5',
        marginBottom: 5,
        textAlign: 'justify' // Text justification for descriptions
    },
    scoreLegend: {
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 20
    },

    scoreBox: {
        width: 10,
        height: 10,
        marginRight: 5
    },
    scoreBoxRed: {
        backgroundColor: '#FF0000'
    },
    scoreBoxOrange: {
        backgroundColor: '#FFA500'
    },
    scoreBoxGreen: {
        backgroundColor: '#008000'
    },
    square: {
        width: 10,
        height: 10,
        borderWidth: 1,
        borderColor: '#000',
        marginRight: 5
    },
    checkboxLabel: {
        display: 'flex',
        flexDirection: 'row'
    },
    checkedSquare: {
        width: 10,
        height: 10,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'grey',
        marginRight: 5,
        position: 'relative'
    },

    // score description
    scoreSection: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        elevation: 30,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginTop: 93,
        marginBottom: 20,
        marginLeft: 14,
        marginRight: 14,
    },
    titleText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    scoreLegend: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    scoreBox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        marginRight: 12,
    },
    scoreBoxRed: {
        backgroundColor: '#FF0000',
    },
    scoreBoxOrange: {
        backgroundColor: '#FFA500',
    },
    legendText: {
        fontSize: 12,
        color: '#555',
        flexShrink: 1,
    },
    severityText: {
        fontWeight: 'bold',
        color: '#333',
    },
    percentageRange: {
        fontWeight: '600',
        color: '#111',
    },
});

const getBadgeStyle = (score) => {
    if (score >= 70) {
        return styles.badgeExcellent;
    } else if (score >= 50) {
        return styles.badgeAverage;
    } else {
        return styles.badgePoor;
    }
};

const getBadgeColorStyle = (score) => {
    if (score >= 70) {
        return styles.badgeColorExcellent;
    } else if (score >= 50) {
        return styles.badgeColorAverage;
    } else {
        return styles.badgeColorPoor;
    }
};
const getPerformanceLabel = (score) => {
    if (score >= 70) {
        return '(Excellent)';
    } else if (score >= 50) {
        return '(Needs improvement)';
    } else {
        return '(Requires Attention)';
    }
}

const Checkbox = ({ checked }) => (
    <View style={checked ? styles.checkedSquare : styles.square} />
);

const generateAnswerElement = (answer) => {
    if (answer.type === 'scale' && answer.score >= 0 && answer.score <= 10) {
        return <Text style={styles.text}>Score: {answer.score > 0 ? `${answer.score}/10` : "N/A"}</Text>;
    } else {
        return (
            <View style={styles.checkboxGroup}>
                <View style={styles.checkboxLabel}><Checkbox checked={answer.score === 0} /> <Text style={styles.text}>N/A</Text></View>
                <View style={styles.checkboxLabel}><Checkbox checked={answer.score === 1} /> <Text style={styles.text}>Strongly agree</Text></View>
                <View style={styles.checkboxLabel}><Checkbox checked={answer.score === 2.5} /> <Text style={styles.text}>Agree</Text></View>
                <View style={styles.checkboxLabel}><Checkbox checked={answer.score === 5} /> <Text style={styles.text}>Neutral</Text></View>
                <View style={styles.checkboxLabel}><Checkbox checked={answer.score === 7.5} /> <Text style={styles.text}>Disagree</Text></View>
                <View style={styles.checkboxLabel}><Checkbox checked={answer.score === 10} /> <Text style={styles.text}>Strongly disagree</Text></View>
            </View>
        );
    }
};

const getOverallRecommendation = (generalScore, principleScores, layerScores) => {
    let recommendations = [];

    if (generalScore < 50) {
        recommendations.push("Your project requires significant improvements to align with RRI principles. Below are key recommendations based on specific gaps:");
    } else if (generalScore < 70) {
        recommendations.push("Your project meets some RRI standards but needs enhancements. Here are a few improvements to consider:");
    } else {
        recommendations.push("Your project is well-aligned with RRI principles. Keep up the good work and look for continuous improvement opportunities.");
    }

    const principleRecommendations = {
        "Benefits to Society & Public Engagement": "Increase societal impact by addressing pressing global challenges and enhance public involvement.",
        "Ethics & Governance": "Follow ethical guidelines, avoid conflicts of interest, and conduct regular ethical reviews. Develop clear accountability structures.",
        "Privacy & Security": "Ensure data anonymization, obtain explicit user consent, and implement robust encryption. Strengthen cybersecurity with multi-factor authentication.",
        "Fairness, Gender Equality & Inclusivity": "Ensure unbiased and equal treatment, promote gender-balanced research teams, and enhance accessibility for diverse populations.",
        "Responsiveness, Transparency & Accountability": "Adapt research based on real-time feedback, make decision-making processes transparent, and ensure accountability for actions taken.",
        "Human Agency & Oversight": "Enable users to have greater control over technological decisions and ensure human values guide development and deployment.",
        "Open Access": "Promote collaboration by making research findings freely accessible."
    };

    let wellAlignedPrinciples = []; // To collect principles that are doing well
    let improvementRecommendations = []; // To collect principles that need improvements

    // Loop through each principle and score
    Object.entries(principleScores).forEach(([principle, scoreData]) => {
        let score = scoreData?.avg * 10;
        if (score < 50) {
            improvementRecommendations.push(`Critical improvement needed in ${principle}: ${principleRecommendations[principle]}`);
        } else if (score < 70) {
            improvementRecommendations.push(`Moderate improvements required in ${principle}: ${principleRecommendations[principle]}`);
        } else {
            wellAlignedPrinciples.push(principle);
        }
    });

    // Construct the final output
    if (wellAlignedPrinciples.length > 0) {
        recommendations.push(`• Your project is doing well in the following principles: ${wellAlignedPrinciples.join(', ')}.`);
    }

    // Append the improvement recommendations if any
    if (improvementRecommendations.length > 0) {
        recommendations.push(improvementRecommendations.map(rec => `• ${rec}`).join("\n"));
    }

    return recommendations.join("\n");
};





const PDFDocument = ({ surveyData, names, project, generalScore, principleScores, layerScores, description, logoUrl }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.pageView}>

                <Image style={styles.image} src={require('../images/Upanzi-Network-logo.png')} />
                <View style={styles.header}>
                    <Text style={styles.title}>{`RRI Self-Assessment Report for ${project.name}`}</Text>
                </View>



                {/* report overview */}
                <View style={styles.textSection}>
                    <Text style={styles.sectionTitle}>1. Report Overview</Text>
                </View>
                <View style={styles.descriptionSection}>
                    <Text style={styles.descriptionText}>
                        This report provides an evaluation of the project based on the Responsible Research
                        and Innovation (RRI) framework. The purpose is to assess how well the project
                        aligns with RRI principles. The assessment uses a traffic light system (green, yellow, red)
                        to visually indicate the level of adherence to RRI principles.
                    </Text>
                </View>



                {/* personal information  */}
                <View style={styles.textSection}>
                    <Text style={styles.sectionTitle}>2. Project Information</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Project Owner</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{names}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Project Name</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{project.name}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Date Downloaded</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{new Date().toLocaleDateString()}</Text>
                        </View>
                    </View>
                </View>

                {/* RRI explanation  */}
                <View style={styles.textSection}>
                    <Text style={styles.sectionTitle}>3. RRI Explanation </Text>
                </View>
                <View style={styles.descriptionSection}>
                    <Text style={styles.descriptionText}>
                        Responsible Research and Innovation (RRI) ensures that scientific and technological advancements are ethical, inclusive, and sustainable.
                        It focuses on transparency, public engagement, and aligning innovation with societal needs and values.
                        RRI encourages researchers and innovators to think beyond results and consider the broader impacts of their work on people, society, and the environment.
                        It's about making innovation meaningful and beneficial for all, asking "Should we?" as much as "Can we?"
                    </Text>
                    {/* <Text style={styles.descriptionText}>
                        RRI is crucial because it fosters a positive societal impact from research,
                        addressing challenges while promoting fairness, inclusivity, and long-term
                        sustainability. It encourages innovation that is both scientifically
                        rigorous and socially responsible.
                    </Text> */}
                </View>
                {/* Summary section */}

                <View style={styles.textSection}>
                    {/* Section Title */}
                    <Text style={styles.sectionTitle}>4. Summary of Assessment Results</Text>
                </View>
                <View>

                    {/* Description Text */}
                    <Text style={styles.descriptionText}>
                        This section provides a detailed overview of the assessment results, enabling project owners to understand their
                        performance comprehensively. The results are presented hierarchically, starting from the overall project score,
                        followed by performance evaluations across individual layers, and finally, insights on adherence to specific principles.
                        This structure ensures that stakeholders can identify strengths and areas for improvement effectively, facilitating
                        informed decision-making and alignment with Responsible Research and Innovation (RRI) principles.
                    </Text>
                </View>


                <View style={[styles.textSection, styles.overall]}>

                    <View wrap={false}>
                        <Text style={styles.sectionSubTitle}>a. Overall Assessment:</Text>
                        <Text style={styles.descriptionText}>
                            The Overall Assessment summarizes the project's performance against Responsible Research and Innovation (RRI) principles,
                            aggregating scores from all layers and principles.
                        </Text>

                        {/* Key Points */}
                        <View style={styles.bullets}>
                            <Text style={styles.bulletText}>• High scores: Strong adherence to RRI values</Text>
                            <Text style={styles.bulletText}>• Low scores: Highlight areas for improvement</Text>
                        </View>

                        {/* Spacer */}
                        <View style={styles.spacer} />

                        {/* Highlighted Score */}
                        <View style={[styles.scoreContainer, getBadgeColorStyle(generalScore.toFixed(1))]}>
                            <Text style={styles.scoreTextLarge}>{generalScore.toFixed(1)}</Text>
                            <Text style={styles.scoreLabelText}>out of 100</Text>
                            <Text style={styles.performanceLabelText}>{getPerformanceLabel(generalScore.toFixed(1))}</Text>
                        </View>
                    </View>
                    {/* Layer section */}
                    <View style={[styles.textSection, styles.layerSection]}>
                        <Text style={styles.sectionSubTitle}>b. Layer Results Overview</Text>

                        {/* Brief Explanation */}
                        <Text style={styles.descriptionText}>
                            The Responsible Research and Innovation (RRI) framework is divided into three layers, each reflecting a key aspect of ethical, societal, and sustainability considerations. Below is a breakdown of the results from the self-assessment tool, along with the RRI score for each layer. The scoring is based on a 0 to 100% scale, where higher scores indicate better alignment with the RRI principles.
                        </Text>
                        <View style={styles.spacer} />

                        {/* Layer Scores */}
                        {layerScores.map((score, index) => (
                            <View key={index} style={[styles.layerScoreContainer]}>
                                <Text style={styles.layerText}>Layer {index + 1}:</Text>
                                <Text style={[styles.layerScore, getBadgeColorStyle(score.toFixed(1))]}>
                                    {score.toFixed(1)} out of 100  {getPerformanceLabel(score.toFixed(1))}
                                </Text>
                            </View>
                        ))}
                    </View>


                    <View style={[styles.textSection, styles.principleSection]} wrap={false}>
                        <Text style={styles.sectionSubTitle}>c. Principle Scores</Text>

                        {/* Brief Explanation */}
                        <Text style={styles.descriptionText}>
                            The Principle Scores provide an in-depth evaluation of the project's alignment with individual Responsible
                            Research and Innovation (RRI) principles. Each score highlights specific areas of strength and identifies
                            opportunities for improvement.
                        </Text>
                        <View style={styles.spacer} />

                        {/* Principles List */}
                        {Object.keys(principleScores).map((principle, index) => (
                            <View key={index} style={[styles.principleScoreContainer]}>
                                <Text style={styles.principleText}>{principle}:</Text>
                                <Text style={[styles.principleScore, getBadgeColorStyle((principleScores[principle]?.avg * 10).toFixed(1))]}>
                                    {(principleScores[principle]?.avg * 10).toFixed(1)} out of 100  {getPerformanceLabel((principleScores[principle]?.avg * 10).toFixed(1))}
                                </Text>
                            </View>
                        ))}
                    </View>


                    {/* Overall Recommendation Section */}
                    <View style={styles.scoreSection} wrap={false}>
                        <View style={styles.textSection}>
                            <Text style={styles.sectionTitle}>5. Overall Recommendation</Text>
                        </View>
                        <View style={styles.descriptionSection}>
                            <Text style={styles.descriptionText}>{getOverallRecommendation(generalScore, principleScores, layerScores)}</Text>
                        </View>
                    </View>

                </View>
            </View>

        </Page>

        {/* New Page for Questions and Responses & Description of the Framework */}

        <Page size="A4" style={styles.page}>
            <View style={styles.pageView}>

                <View style={styles.header}>
                    <Text style={styles.title}>Appendix</Text>
                </View>

                <View style={styles.textSection}>
                    <Text style={styles.sectionTitle}>A. Questions and Answers </Text>
                </View>

                {surveyData.map((item, index) => (

                    (index == 0)
                        ? (
                            <View key={index} style={styles.section} wrap={false}>
                                <Text style={styles.question}>{index + 1}. {item.question}:</Text>
                                <Text style={styles.text}></Text>
                                <Text style={styles.text}>{description}</Text>
                            </View>
                        )
                        : (
                            <View key={index} style={styles.section} wrap={false}>
                                <Text style={styles.question}>{index + 1}. {item.question}</Text>
                                {generateAnswerElement(item.answer)}
                            </View>
                        )
                ))}

                {/* Description Section */}
                <View style={styles.textSection}>
                    <Text style={styles.sectionTitle}>B. Description of the Framework</Text>
                </View>
                <View style={styles.descriptionSection}>
                    <Text style={styles.descriptionText}>
                        The Responsible Research and Innovation (RRI) framework provides a comprehensive approach to embedding ethical, societal, and sustainability considerations into research and innovation projects.It evaluates projects across three distinct layers, each contributing to the overall RRI Index based on weighted importance:
                    </Text>

                    {/* Framework Layers */}
                    <View style={styles.sectionSubTitle}>
                        <Text style={styles.descriptionText}>Layer 1 assesses the privacy and security, benefit to society and ethics as well as governance. It ensures a project uphold the rights of individuals and communities. </Text>
                        <Text style={styles.titleText}>Weight: 34.6%</Text>


                        <Text style={styles.descriptionText}>Layer 2 emphasizes the need for transparency in decision-making and the promotion of gender equity throughout the innovation process. This includes open communication about project goals, the inclusion of diverse stakeholders, and ensuring that gender and other social biases do not impede participation in the project. </Text>
                        <Text style={styles.titleText}>Weight: 33.1%</Text>


                        <Text style={styles.descriptionText}>Layer 3 ensures that the project respects human agency, providing stakeholders with a voice in decision-making. It also emphasizes on open access making sure that projects are open to contributions from different individuals. </Text>
                        <Text style={styles.titleText}>Weight: 32.3%</Text>

                    </View>

                    <Text style={styles.descriptionText}>
                        Each layer is evaluated using its principles, and scores are weighted to calculate the final RRI Index. The higher the score, the greater the alignment with RRI principles, offering a measurable benchmark for responsible innovation.
                    </Text>
                </View>

                {/* Score Explanation */}
                <View style={[styles.scoreSection, {
                    width: 450
                }]} wrap={false}>
                    <Text style={styles.descriptionText}>The RRI Index is transformed into a simple traffic light system for ease of interpretation:</Text>

                    {/* Visual Legend */}
                    <View style={styles.scoreLegend}>
                        <View style={[styles.scoreBox, styles.scoreBoxRed]} />
                        <Text style={styles.legendText}>
                            <Text style={styles.severityText}>Red </Text>
                            {'( critical issues requiring immediate action to address gaps)'}: <Text style={styles.percentageRange}>0-49%</Text>
                        </Text>
                    </View>
                    <View style={styles.scoreLegend}>
                        <View style={[styles.scoreBox, styles.scoreBoxOrange]} />
                        <Text style={styles.legendText}>
                            <Text style={styles.severityText}>Amber </Text>
                            {'( moderate concerns suggests areas for refinement)'}: <Text style={styles.percentageRange}>50-70%</Text>
                        </Text>
                    </View>
                    <View style={styles.scoreLegend}>
                        <View style={[styles.scoreBox, styles.scoreBoxGreen]} />
                        <Text style={styles.legendText}>
                            <Text style={styles.severityText}>Green </Text>
                            {'( excellent performance with minimal or no adjustments )'}: <Text style={styles.percentageRange}>70-100%</Text>
                        </Text>
                    </View>

                </View>
            </View>
        </Page>


    </Document >
);



export { PDFDocument };
