@Library('jenkins-shared-library') _

pipeline {

  options {
    ansiColor('xterm')
  }

  environment {
    registry             = "escoacrprod01.azurecr.io"
    registryCredential   = 'acr_creds_esco_prod'
    dockerfile           = 'Dockerfile'
    registryRepo         = '/irwo/irwo-ui-react'
    CommitId             = 'False'
    ImageURI        = "${registry}${registryRepo}:${env.branch_name}-${env.GIT_COMMIT.take(7)}-${env.BUILD_NUMBER}"
    VeraAppid            = "irwo-ui-react-${env.BUILD_NUMBER}"
    VeraAppName          = "Shipping Order (IRWO)"
    AbortOnFail          = false
    CompliancePolicy     = 'warn'
    VulnerabilityPolicy  = 'warn'
    RemoveImageOnPublish = false
    BRANCH_NAME         = "${env.branch_name}"
    BuildNo              = "${env.BUILD_NUMBER}"
  }

  agent { 
    label 'platform-ff'
  }

  /*triggers {
    pollSCM 'H/5 * * * *'
  }*/

  stages { 

    stage('Build, Test, Coverage and sonar') {
      when { allOf { environment name: 'application_type', value: 'nodejs' } }
      steps {
        script {  
          sh 'npm config set fund false'
	  //albBuild.npm() 
          sh 'npm run build && npm run buildsrv'
        } 
      }
    }


    stage('Veracode Scan') {
    when { allOf { environment name: 'application_type', value: 'nodejs' } }
      steps {
        script {
          sh """tar -czvf build.tar.gz build"""
          albBuild.veraCodeScannj(VeraAppid, AbortOnFail, VeraAppName)
        }
      }
    }

    stage('Docker build image') {
      steps{
        script {
          dockerImage = albBuild.buildDockerImagewithCommitId(Registry, RegistryRepo, Dockerfile, CommitId, BuildNo)
        }
      }
    }

    stage('Twistlock Analysis') {
      steps {
        script {
          albBuild.twistscanDockerImage(imageURI, logLevel='debug')
        }
      }
    }

    stage('Twistlock Publish') {
	  steps {
	    script {
		albBuild.twistscanPublish()
		addShortText(text: GIT_BRANCH, borderColor: 'BLUE', color: 'GREEN')
	    }
	  }
	}

    stage('Docker push image to ACR') {
      steps{
        script {
          albBuild.publishDockerImage(registry, registryCredential, dockerImage, imageURI, removeAfterPublish = RemoveImageOnPublish)
        }
      }
    }

  }

  post {
    failure {
      script {
        albNotify.emailNotify()
      }
    }
    cleanup {
      script {
        albBuild.removeDockerImage(imageURI)
      }
    }
  }

}