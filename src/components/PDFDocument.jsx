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
        fontSize: 10
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
        fontSize: 12,
        marginLeft: 10,
    },
    textSection: {
        marginTop: 20,
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
        fontSize: 10,
        marginBottom: 5,
        textAlign: 'justify' // Text justification
    },
    resultsTitle: {
        fontSize: 14,
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
        fontSize: 14,
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
    // tableColHeader: {
    //     width: '50%',
    //     borderStyle: 'solid',
    //     borderWidth: 1,
    //     borderLeftWidth: 0,
    //     borderTopWidth: 0,
    //     backgroundColor: '#f3f3f3'
    // },
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
        fontSize: 10,
        padding: 3,
        textAlign: 'left'
    },
    descriptionSection: {
        marginBottom: 20
    },
    descriptionText: {
        marginTop: 5,
        fontSize: 12,
        lineHeight: '1.5',
        marginBottom: 5,
        textAlign: 'justify' // Text justification for descriptions
    },
    overall: {
        display: 'flex',
        flexDirection: 'row'
    },
    scoreSection: {
        marginTop: 20,
        marginBottom: 20
    },
    scoreText: {
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'justify' // Text justification for score
    },
    layersText: {
        marginLeft: 15,
        marginTop: 5,
        fontSize: 10,
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
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        margin: 16,
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
        fontSize: 10,
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

const PDFDocument = ({ surveyData, names, project, generalScore, principleScores, layerScores, logoUrl }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.pageView}>

                <Image style={styles.image} src={require('../images/Upanzi-Network-logo.png')} />
                <View style={styles.header}>
                    <Text style={styles.title}>Responsible Research and Innovation Report</Text>
                </View>



                {/* report overview */}
                <View style={styles.textSection}>
                    <Text style={styles.sectionTitle}>1. Report Overview</Text>
                </View>
                <View style={styles.descriptionSection}>
                    <Text style={styles.descriptionText}>
                        This report provides an evaluation of the project based on the Responsible Research
                        and Innovation (RRI) framework. The purpose is to assess how well the project
                        aligns with RRI principles such as public engagement, ethics, governance, open access,
                        and gender equality. The assessment uses a traffic light system (green, yellow, red)
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
                        Responsible Research and Innovation (RRI) promotes inclusive, transparent,
                        and socially responsible research and innovation. It incorporates ethical,
                        societal, and sustainability considerations throughout the research process,
                        actively engaging stakeholders to align research with societal needs.
                    </Text>
                    <Text style={styles.descriptionText}>
                        RRI is crucial because it fosters a positive societal impact from research,
                        addressing challenges while promoting fairness, inclusivity, and long-term
                        sustainability. It encourages innovation that is both scientifically
                        rigorous and socially responsible.
                    </Text>
                </View>


                {/* summary results */}
                <View style={styles.textSection}>
                    <Text style={styles.sectionTitle}>3. Summary Results </Text>
                </View>

                <View style={[styles.textSection, styles.overall]}>
                    <Text style={styles.sectionSubTitle}>a. Overall Scores:</Text>
                    <Text style={[styles.sectionSubTitle, getBadgeColorStyle(generalScore.toFixed(1))]}>{generalScore.toFixed(1)}{' '} out of 100
                        {getPerformanceLabel(generalScore.toFixed(1))}
                    </Text>
                </View>

                <View style={[styles.layerSection, styles.overall]}>
                    <Text style={styles.sectionSubTitle}>b. Layer Score </Text>
                </View>
                <View style={[styles.overall]}>
                    <Text style={[styles.layersText]}>- Layer 1:{' '} </Text>
                    <Text style={[styles.layersText, getBadgeColorStyle(layerScores[0])]}>{layerScores[0].toFixed(1)}{' '} out of 100
                        {getPerformanceLabel(layerScores[0].toFixed(1))}
                    </Text>

                </View>
                <View style={[styles.overall]}>
                    <Text style={[styles.layersText]}>- Layer 2:{' '} </Text>
                    <Text style={[styles.layersText, getBadgeColorStyle(layerScores[1].toFixed(1))]}>
                        {layerScores[1].toFixed(1)}{' '} out of 100
                        {getPerformanceLabel(layerScores[1].toFixed(1))}
                    </Text>
                </View>
                <View style={[styles.overall]}>
                    <Text style={[styles.layersText]}>- Layer 3:{' '} </Text>
                    <Text style={[styles.layersText, getBadgeColorStyle(layerScores[2].toFixed(1))]}>
                        {layerScores[2].toFixed(1)}{' '} out of 100
                        {getPerformanceLabel(layerScores[2].toFixed(1))}
                    </Text>
                </View>




                {/* start of principles details */}
                <View style={[styles.layerSection, styles.overall]}>
                    <Text style={styles.sectionSubTitle}>c. Principle Scores </Text>
                </View>
                <View style={[styles.overall]}>
                    <Text style={[styles.layersText]}>- Benefits to Society & Public Engagement:{' '} </Text>
                    <Text style={[styles.layersText, getBadgeColorStyle((principleScores['Benefits to Society & Public Engagement']?.avg * 10).toFixed(2))]}>
                        {principleScores['Benefits to Society & Public Engagement']?.avg.toFixed(2) * 10}{' '} out of 100
                        {getPerformanceLabel(principleScores['Benefits to Society & Public Engagement']?.avg.toFixed(2) * 10)}
                    </Text>
                </View>
                <View style={[styles.overall]}>
                    <Text style={[styles.layersText]}>- Ethics & Governance:{' '} </Text>
                    <Text style={[styles.layersText, getBadgeColorStyle((principleScores['Ethics & Governance']?.avg * 10).toFixed(2))]}>
                        {principleScores['Ethics & Governance']?.avg.toFixed(2) * 10}{' '} out of 100
                        {getPerformanceLabel(principleScores['Ethics & Governance']?.avg.toFixed(2) * 10)}
                    </Text>
                </View>

                <View style={[styles.overall]}>
                    <Text style={[styles.layersText]}>- Privacy & Security:{' '} </Text>
                    <Text style={[styles.layersText, getBadgeColorStyle((principleScores['Privacy & Security']?.avg * 10).toFixed(2))]}>
                        {principleScores['Privacy & Security']?.avg.toFixed(2) * 10}{' '} out of 100
                        {getPerformanceLabel(principleScores['Privacy & Security']?.avg.toFixed(2) * 10)}
                    </Text>
                </View>
                <View style={[styles.overall]}>
                    <Text style={[styles.layersText]}>- Fairness, Gender Equality & Inclusivity:{' '} </Text>
                    <Text style={[styles.layersText, getBadgeColorStyle((principleScores['Fairness, Gender Equality & Inclusivity']?.avg * 10).toFixed(2))]}>
                        {principleScores['Fairness, Gender Equality & Inclusivity']?.avg.toFixed(2) * 10}{' '} out of 100
                        {getPerformanceLabel(principleScores['Fairness, Gender Equality & Inclusivity']?.avg.toFixed(2) * 10)}
                    </Text>
                </View>
                <View style={[styles.overall]}>
                    <Text style={[styles.layersText]}>- Responsiveness, Transparency & Accountability:{' '} </Text>
                    <Text style={[styles.layersText, getBadgeColorStyle((principleScores['Responsiveness, Transparency & Accountability']?.avg * 10).toFixed(2))]}>
                        {principleScores['Responsiveness, Transparency & Accountability']?.avg.toFixed(2) * 10}{' '} out of 100
                        {getPerformanceLabel(principleScores['Responsiveness, Transparency & Accountability']?.avg.toFixed(2) * 10)}
                    </Text>
                </View>
                <View style={[styles.overall]}>
                    <Text style={[styles.layersText]}>- Human Agency & Oversight:{' '} </Text>
                    <Text style={[styles.layersText, getBadgeColorStyle((principleScores['Human Agency & Oversight']?.avg * 10).toFixed(2))]}>
                        {principleScores['Human Agency & Oversight']?.avg.toFixed(2) * 10}{' '} out of 100
                        {getPerformanceLabel(principleScores['Human Agency & Oversight']?.avg.toFixed(2) * 10)}
                    </Text>
                </View>
                <View style={[styles.overall]}>
                    <Text style={[styles.layersText]}>- Open Access:{' '} </Text>
                    <Text style={[styles.layersText, getBadgeColorStyle((principleScores['Open Access']?.avg * 10).toFixed(2))]}>
                        {principleScores['Open Access']?.avg.toFixed(2) * 10}{' '} out of 100
                        {getPerformanceLabel(principleScores['Open Access']?.avg.toFixed(2) * 10)}
                    </Text>
                </View>


                {/* Questions and Responses */}
                <View style={styles.textSection}>
                    <Text style={styles.sectionTitle}>4. Questions and Responses </Text>
                </View>

                {surveyData.map((item, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={styles.question}>{index + 1}. {item.question}</Text>
                        {generateAnswerElement(item.answer)}
                    </View>
                ))}



                {/* Description Section */}
                <View style={styles.textSection}>
                    <Text style={styles.sectionTitle}>5. Description of the Framework</Text>
                </View>
                <View style={styles.descriptionSection}>
                    {/* <Text style={styles.descriptionText}>
                        RRI is a policy-driven concept focused on inclusive and sustainable research and innovation.
                        While prevalent in the Global North as a technology-driven approach, in sub-Saharan Africa,
                        it demands a community-based and livelihood-oriented perspective.
                    </Text> */}
                    <Text style={styles.descriptionText}>
                        Our RRI index consists of 3 layers each with a corresponding weight:
                    </Text>
                    <Text style={styles.descriptionText}>- Layer 1: Privacy, Security (0.346 weight)</Text>
                    <Text style={styles.descriptionText}>- Layer 2: Transparency, Gender equity (0.331 weight)</Text>
                    <Text style={styles.descriptionText}>- Layer 3: Human Agency, Oversight (0.323 weight)</Text>
                    {/* <Text style={styles.descriptionText}>You can read more on the RRI index here.</Text> */}
                </View>

                {/* Score Explanation */}
                <View style={styles.scoreSection}>
                    <Text style={styles.titleText}>Score and Severity Explanation:</Text>

                    <View style={styles.scoreLegend}>
                        <View style={[styles.scoreBox, styles.scoreBoxRed]} />
                        <Text style={styles.legendText}>
                            <Text style={styles.severityText}>Red </Text>
                            {'(Requires Attention)'}: <Text style={styles.percentageRange}>0-49%</Text>
                        </Text>
                    </View>

                    <View style={styles.scoreLegend}>
                        <View style={[styles.scoreBox, styles.scoreBoxOrange]} />
                        <Text style={styles.legendText}>
                            <Text style={styles.severityText}>Amber </Text>
                            {'(Needs Improvement)'}: <Text style={styles.percentageRange}>50-70%</Text>
                        </Text>
                    </View>

                    <View style={styles.scoreLegend}>
                        <View style={[styles.scoreBox, styles.scoreBoxGreen]} />
                        <Text style={styles.legendText}>
                            <Text style={styles.severityText}>Green </Text>
                            {'(Excellent)'}: <Text style={styles.percentageRange}>70-100%</Text>
                        </Text>
                    </View>
                </View>

                {/* Results Section */}
                {/* <Text style={styles.resultsTitle}>Questions and Responses</Text>
                {surveyData.map((item, index) => (
                    <View key={index} style={[styles.section]}>
                        <Text style={styles.question}>{index + 1}. {item.question}</Text>
                        <Text>
                        {generateAnswerElement(item.answer)}
                        </Text>
                        
                    </View>
                ))} */}

                {/* Summary Section */}
                {/* <View style={styles.summary}>
                    <View style={[styles.badge, getBadgeStyle(generalScore.toFixed(1))]}>
                        <Text>Overall Score: {generalScore.toFixed(1)}{' '} out of 100</Text>
                    </View>
                </View> */}
            </View>
        </Page>
    </Document>
);

export { PDFDocument };
