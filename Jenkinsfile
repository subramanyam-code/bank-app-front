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
        stage('Push to ECR') {
    steps {
        bat '''
        aws ecr get-login-password --region ap-south-2 | ^
        docker login --username AWS --password-stdin 455982474789.dkr.ecr.ap-south-2.amazonaws.com
        
        docker tag bank-app:latest 455982474789.dkr.ecr.ap-south-2.amazonaws.com/bank-app:latest
        
        docker push 455982474789.dkr.ecr.ap-south-2.amazonaws.com/bank-app:latest
        '''
    }
}
    }
}
