pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                echo "Building app..."
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                bat 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t bank-app .'
            }
        }
    }
}
