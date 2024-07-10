import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
    section: {
        marginBottom: 10
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
        marginBottom: 5
    },

    resultsTitle:{
        fontSize:20,
        fontWeight:'bold',
        textTransform:'uppercase',
        marginBottom:10,
        textDecoration:'underline'
    },
    question: {
        marginBottom: 5,
        fontSize:14
    },
    summary: {
        marginTop: 20,
        fontSize: 12
    },
    badge: {
        display: 'inline-block',
        padding: '5px 10px',
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        borderRadius: 4,
        // marginLeft: 10
    },
    badgeExcellent: {
        backgroundColor: '#4CAF50'
    },
    badgeGood: {
        backgroundColor: '#2196F3'
    },
    badgeAverage: {
        backgroundColor: '#FFC107'
    },
    badgePoor: {
        backgroundColor: '#FF5722'
    },
    checkboxGroup: {
        flexDirection: 'column',
        marginTop: 5,
        marginLeft: 20
    },
    checkboxLabel: {
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
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
        backgroundColor:'red',
        marginRight: 5,
        position: 'relative'
    },
    cross: {
        position: 'absolute',
        left: 2,
        top: 0,
        fontSize: 14,
        lineHeight: 1,
        color: '#000'
    },
    table: {
        // display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginBottom: 10,
        textAlign:'left'
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row'
    },
    tableColHeader: {
        width: '50%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f3f3f3'
    },
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
        marginTop:12,
        fontSize: 12,
        marginBottom: 5
    },
    scoreSection: {
        marginTop: 20,
        marginBottom: 20
    },
    scoreText: {
        fontSize: 12,
        marginBottom: 5
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
    }
});

const getBadgeStyle = (score) => {
    if (score >= 8.5) {
        return styles.badgeExcellent;
    } else if (score >= 7) {
        return styles.badgeGood;
    } else if (score >= 5) {
        return styles.badgeAverage;
    } else {
        return styles.badgePoor;
    }
};

const Checkbox = ({ checked }) => (
    <View style={checked ? styles.checkedSquare : styles.square}>
        {/* {checked && <Text style={styles.cross}>x</Text>} */}
    </View>
);

const generateAnswerElement = (answer) => {
    if (typeof answer === 'number' && answer >= 1 && answer <= 10) {
        return <Text style={styles.text}>Score: {answer}</Text>;
    } else {
        return (
            <View style={styles.checkboxGroup}>
                <View style={styles.checkboxLabel}><Checkbox checked={answer === 'Strongly agree'} /> <Text style={styles.text}>Strongly agree</Text></View>
                <View style={styles.checkboxLabel}><Checkbox checked={answer === 'Agree'} /> <Text style={styles.text}>Agree</Text></View>
                <View style={styles.checkboxLabel}><Checkbox checked={answer === 'Neutral'} /> <Text style={styles.text}>Neutral</Text></View>
                <View style={styles.checkboxLabel}><Checkbox checked={answer === 'Disagree'} /> <Text style={styles.text}>Disagree</Text></View>
                <View style={styles.checkboxLabel}><Checkbox checked={answer === 'Strongly disagree'} /> <Text style={styles.text}>Strongly disagree</Text></View>
            </View>
        );
    }
};

const PDFDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>Responsible Research and Innovation Report</Text>
                <Text style={styles.subtitle}>Name: John Doe</Text>
                <Text style={styles.subtitle}>Project Name: Mira Project</Text>
                <Text style={styles.subtitle}>Date Downloaded: {new Date().toLocaleDateString()}</Text>
            </View>

            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCell}>Field</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCell}>Value</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Name</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>John Doe</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Project Name</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Mira Project</Text>
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
           

            <View style={styles.descriptionSection}>
                <Text style={styles.descriptionText}>RRI is a policy-driven concept focused on inclusive and sustainable research and innovation. While prevalent in the Global North as a technology-driven approach, in sub-Saharan Africa, it demands a community-based and livelihood-oriented perspective.  Layer 1 focuses on topics such as Privacy, Security, and various other aspects and weighs 0.346, Layer 2 focuses on topics such as Transparency and accountability, Gender equity and inclusion, Fairness and weighs 0.331, Layer 3 focuses on topics like Human Agency and Oversight, and weighs 0.323.</Text>
                <Text></Text>
                <Text></Text>
                <Text style={styles.descriptionText}>Our RRI index consists of 3 layers each with a corresponding weight: </Text>
                <Text></Text>
                <Text style={styles.descriptionText}>  - Layer 1 focuses on topics such as Privacy, Security, and various other aspects and weighs 0.346. </Text>
                <Text></Text>
                <Text style={styles.descriptionText}>  - Layer 2 focuses on topics such as Transparency and accountability, Gender equity and inclusion, Fairness and weighs 0.331.</Text>
                <Text></Text>
                <Text style={styles.descriptionText}>  - Layer 3 focuses on topics like Human Agency and Oversight, and weighs 0.323.</Text>
                <Text></Text>
                <Text style={styles.descriptionText}>You can read more on the RRI index here</Text>
            </View>

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
            <Text style={styles.resultsTitle}>Your results</Text>
            {surveyData.map((item, index) => (
                <View key={index} style={styles.section}>
                    <Text style={styles.question}>{index + 1}. {item.question}</Text>
                    {generateAnswerElement(item.answer)}
                </View>
            ))}

            

            <View style={styles.summary}>
                <Text style={styles.text}>Project Name: Mira Project</Text>
                <View style={[styles.badge, getBadgeStyle(generalScore)]}>
                    <Text>General Score: {generalScore.toFixed(2)}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export { PDFDocument };
