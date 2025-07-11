const fs = require('fs');
const path = require('path');

// Simple test to check if HTML file exists and contains essential elements
function testHTML() {
    console.log('Running HTML validation tests...');
    
    const htmlPath = path.join(__dirname, 'index.html');
    
    // Check if file exists
    if (!fs.existsSync(htmlPath)) {
        console.error('❌ index.html does not exist!');
        process.exit(1);
    }
    
    const content = fs.readFileSync(htmlPath, 'utf8');
    
    // Check for essential HTML elements
    const tests = [
        { name: 'DOCTYPE declaration', regex: /<!DOCTYPE html>/i },
        { name: 'html tag', regex: /<html.*>/i },
        { name: 'head tag', regex: /<head>.*<\/head>/s },
        { name: 'body tag', regex: /<body>.*<\/body>/s },
        { name: 'title tag', regex: /<title>.*<\/title>/s }
    ];
    
    let failedTests = 0;
    
    tests.forEach(test => {
        if (test.regex.test(content)) {
            console.log(`✅ Found ${test.name}`);
        } else {
            console.error(`❌ Missing ${test.name}`);
            failedTests++;
        }
    });
    
    if (failedTests > 0) {
        console.error(`Failed ${failedTests} tests.`);
        process.exit(1);
    } else {
        console.log('All HTML validation tests passed!');
    }
}

testHTML();