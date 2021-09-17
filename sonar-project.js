import sonarqubeScanner from 'sonarqube-scanner';
sonarqubeScanner(
    {
        serverUrl: 'https://sonarqube.albertsons.com',
        options: {
            'sonar.sources': './src',
            'sonar.exclusions':
                // eslint-disable-next-line max-len
                'node_modules/**, coverage/**, public/**, build/**, **/__tests__/**,src/mocks/**,src/constants/authConfig.ts,src/index.ts,src/utils/interceptor.ts,src/utils/getAccessToken.ts,src/interfaces,src/constants',
            'sonar.tests': './src/**/__tests__/',
            'sonar.test.inclusions': '**/__tests__/**',
            'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
            'sonar.testExecutionReportPaths': 'reports/test-report.xml',
            //"sonar.testExecutionReportPaths": "build/reports/jacoco/test/jacocoTestReport.xml",
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {}
);
