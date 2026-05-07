pipeline {
    agent any

    environment {
        BASE_URL    = credentials('BASE_URL')
        EMPRESA_URL = credentials('EMPRESA_URL')
    }

    options {
        timeout(time: 60, unit: 'MINUTES')
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install deps') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Tests Sauce Demo') {
            steps {
                bat 'npx playwright test --project=saucedemo-chrome --project=saucedemo-firefox --project=saucedemo-safari --project=saucedemo-edge'
            }
        }

        stage('Tests Mi Empresa') {
            steps {
                bat 'npx playwright test --project=mi-empresa-chrome --project=mi-empresa-firefox --project=mi-empresa-safari --project=mi-empresa-edge'
            }
        }

    }

    post {
        always {
            archiveArtifacts(
                artifacts   : 'playwright-report/**',
                fingerprint : true
            )
            publishHTML(target: [
                reportDir            : 'playwright-report',
                reportFiles          : 'index.html',
                reportName           : 'Playwright Report',
                keepAll              : true,
                allowMissing         : false,
                alwaysLinkToLastBuild: true
            ])
            junit(
                allowEmptyResults : true,
                testResults       : 'test-results/junit.xml'
            )
        }
        success  { echo '✅ Pipeline ejecutado correctamente' }
        failure  { echo '❌ El pipeline falló, revisa los logs' }
        unstable { echo '⚠️ Hay tests fallidos' }
    }

}