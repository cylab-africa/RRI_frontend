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

// Function to calculate the general score
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
        textAlign: 'justify' // Justified text alignment
    },
    descriptionText: {
        marginTop: 12,
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'justify' // Justified text alignment
    },
    image: {
        width: '100%',
        height: 100,
        marginBottom: 20
    },
    resultsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 10,
        textDecoration: 'underline'
    },
    section: {
        marginBottom: 10
    },
    question: {
        marginBottom: 5,
        fontSize: 13
    },
    badge: {
        display: 'inline-block',
        padding: '5px 10px',
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        borderRadius: 4,
        marginLeft: 10
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
        marginBottom: 10
    },
    tableRow: {
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
    if (score >= 70) {
        return styles.badgeExcellent;
    } else if (score >= 50) {
        return styles.badgeAverage;
    } else {
        return styles.badgePoor;
    }
};

// Main PDF Document component
const PDFDocument = ({ surveyData, names, project, generalScore }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            
            {/* Add Image at the top of the page */}
            <Image style={styles.image} src={require('../images/Upanzi-Network-logo.png')} />
            
            <View style={styles.header}>
                <Text style={styles.title}>Responsible Research and Innovation Report</Text>
                <Text style={styles.subtitle}>Name: {names}</Text>
                <Text style={styles.subtitle}>Project Name: {project.name}</Text>
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

            <View style={styles.descriptionSection}>
                <Text style={styles.descriptionText}>
                    RRI is a policy-driven concept focused on inclusive and sustainable research and innovation. 
                    While prevalent in the Global North as a technology-driven approach, in sub-Saharan Africa, it demands a community-based and livelihood-oriented perspective. 
                    Our RRI index consists of 3 layers each with a corresponding weight:
                </Text>
                <Text style={styles.descriptionText}>  - Layer 1 focuses on Privacy, Security, and other aspects, weighing 0.346.</Text>
                <Text style={styles.descriptionText}>  - Layer 2 emphasizes Transparency, Gender equity, and Fairness, weighing 0.331.</Text>
                <Text style={styles.descriptionText}>  - Layer 3 focuses on Human Agency and Oversight, weighing 0.323.</Text>
                <Text style={styles.descriptionText}>You can read more on the RRI index here.</Text>
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
                    <Text style={styles.text}>Answer: {item.answer}</Text>
                </View>
            ))}

            <View style={styles.summary}>
                <View style={[styles.badge, getBadgeStyle(generalScore.toFixed(2))]}>
                    <Text>General Score: {generalScore.toFixed(2)}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export { PDFDocument };
