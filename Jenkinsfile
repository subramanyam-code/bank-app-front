pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-2"
        ECR_REPO = "455982474789.dkr.ecr.ap-south-2.amazonaws.com/bank-app-front"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Clone Code') {
            steps {
                git 'https://github.com/your-username/bank-app-front.git'
            }
        }

        stage('Build') {
            steps {
                echo "Building app..."
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                sh 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t bank-app-front .'
            }
        }

        stage('Push to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION | \
                docker login --username AWS --password-stdin $ECR_REPO
                docker tag bank-app-front:latest $ECR_REPO:$IMAGE_TAG
                docker push $ECR_REPO:$IMAGE_TAG
                '''
            }
        }

        stage('Deploy ECS') {
            steps {
                sh '''
                aws ecs update-service \
                --cluster your-cluster-name \
                --service your-service-name \
                --force-new-deployment \
                --region $AWS_REGION
                '''
            }
        }
    }
}