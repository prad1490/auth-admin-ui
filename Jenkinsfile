pipeline{
  agent {
    kubernetes {
      label 'partner_ui'
      defaultContainer 'jnlp'
      yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    some-label: some-label-value
spec:
  containers:
  - name: python
    image: python:2-stretch
    command:
    - cat
    tty: true
  - name: nodejs
    image: node:8
    environment:
      - NODE_ENV=production
    command:
    - cat
    tty: true
  - name: kaniko
    image: gcr.io/kaniko-project/executor:debug
    imagePullPolicy: Always
    command:
    - /busybox/cat
    tty: true
    volumeMounts:
      - name: jenkins-docker-cfg
        mountPath: /kaniko/.docker
  volumes:
  - name: jenkins-docker-cfg
    projected:
      sources:
      - secret:
          name: k8smpf-docker
          items:
            - key: .dockerconfigjson
              path: config.json
"""
    }
  }
  environment{
    IMAGE_PREFIX="xaxiseng"
    IMAGE_NAME = "authorization-admin-ui"
    IMAGE_VERSION = "1.0-SNAPSHOT"
    PATH="/busybox:/kaniko:$PATH"
  }
  stages{

      stage("Build"){
       steps{
          withEnv(['CHROME_BIN=/opt/google/chrome/chrome']) {
            container(name: 'nodejs') {
                sh "yarn install"
                sh "yarn prod:build"
            }
          }
        }
      }

        stage("Docker"){
            steps{
                container(name: 'kaniko', shell: '/busybox/sh') {
                  sh """#!/busybox/sh
                        /kaniko/executor --context `pwd` --destination $IMAGE_PREFIX/$IMAGE_NAME:$IMAGE_VERSION
                     """
                }
            }
        }

    }

  }