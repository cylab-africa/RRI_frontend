import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

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
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 20,
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
        fontSize: 24,
        margin: 0
    },
    subtitle: {
        fontSize: 12,
        marginBottom: 5
    },
    text: {
        fontSize: 11,
        marginBottom: 5,
        textAlign: 'justify' // Text justification
    },
    resultsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 10,
        textDecoration: 'underline',
        textAlign: 'center'
    },
    question: {
        marginBottom: 5,
        fontSize: 13,
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
        margin: 'auto',
        marginTop: 5,
        fontSize: 10,
        padding: 3
    },
    descriptionSection: {
        marginBottom: 20
    },
    descriptionText: {
        marginTop: 12,
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'justify' // Text justification for descriptions
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
    checkedSquare: {
        width: 10,
        height: 10,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor:'grey',
        marginRight: 5,
        position: 'relative'
    }
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

const PDFDocument = ({ surveyData, names, project, generalScore, logoUrl }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Image style={styles.image} src={require('../images/Upanzi-Network-logo.png')} />
            <View style={styles.header}>
                <Text style={styles.title}>Responsible Research and Innovation Report</Text>
                {/* <Text style={styles.subtitle}>Name: {names}</Text>
                <Text style={styles.subtitle}>Project Name: {project.name}</Text>
                <Text style={styles.subtitle}>Date Downloaded: {new Date().toLocaleDateString()}</Text> */}
            </View>

            Table for project details
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

            {/* Description Section */}
            <View style={styles.descriptionSection}>
                <Text style={styles.descriptionText}>
                    RRI is a policy-driven concept focused on inclusive and sustainable research and innovation.
                    While prevalent in the Global North as a technology-driven approach, in sub-Saharan Africa,
                    it demands a community-based and livelihood-oriented perspective.
                </Text>
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
                <Text style={styles.scoreText}>Score Explanation:</Text>
                <View style={styles.scoreLegend}>
                    <View style={[styles.scoreBox, styles.scoreBoxRed]}></View>
                    <Text style={styles.scoreText}>Red: 0-49%</Text>
                </View>
                <View style={styles.scoreLegend}>
                    <View style={[styles.scoreBox, styles.scoreBoxOrange]}></View>
                    <Text style={styles.scoreText}>Orange: 50-70%</Text>
                </View>
                <View style={styles.scoreLegend}>
                    <View style={[styles.scoreBox, styles.scoreBoxGreen]}></View>
                    <Text style={styles.scoreText}>Green: 70-100%</Text>
                </View>
            </View>

            {/* Results Section */}
            <Text style={styles.resultsTitle}>Your results</Text>
            {surveyData.map((item, index) => (
                <View key={index} style={styles.section}>
                    <Text style={styles.question}>{index + 1}. {item.question}</Text>
                    {generateAnswerElement(item.answer)}
                </View>
            ))}

            {/* Summary Section */}
            <View style={styles.summary}>
                <View style={[styles.badge, getBadgeStyle(generalScore.toFixed(2))]}>
                    <Text>Overall Score: {generalScore.toFixed(2)}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export { PDFDocument };
