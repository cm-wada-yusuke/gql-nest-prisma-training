variable "github_owner" {}
variable "github_app_repo_name" {}
variable "github_contents_repo_name" {}
variable "region" {}
variable "gcp_project_id" {}
variable "backend_app_name" {}
variable "frontend_app_name" {}
variable "cloudsql_instance_full_name" {}
variable "cloud_run_service_account" {}
variable "contents_bucket_name" {}
variable "contents_bucket_url" {}
variable "ifttt_url" {}

resource "google_cloudbuild_trigger" "deploy-backend-training-app" {
  name        = "deploy-backend-training-app"
  description = "NestJSアプリを Cloud Run へdeployする"
  github {
    owner = var.github_owner
    name  = var.github_app_repo_name
    push {
      branch = "^main$"
    }
  }
  included_files = ["blog-final/backend/**"]
  filename       = "blog-final/backend/cloudbuild.yml"
  substitutions = {
    _REGION                         = var.region
    _SERVICE_ACCOUNT                = var.cloud_run_service_account
    _CLOUDSQL_INSTANCE_FULL_NAME    = var.cloudsql_instance_full_name
    _ARTIFACT_REPOSITORY_IMAGE_NAME = "${var.region}-docker.pkg.dev/${var.gcp_project_id}/${var.backend_app_name}/blog-backend"
    _CONTENTS_BUCKET_NAME           = var.contents_bucket_name
  }
}


resource "google_cloudbuild_trigger" "deploy-frontend-training-app" {
  name        = "deploy-frontend-training-app"
  description = "Next.jsアプリを Cloud Run へdeployする"
  github {
    owner = var.github_owner
    name  = var.github_app_repo_name
    push {
      branch = "^main$"
    }
  }
  included_files = ["blog-final/frontend/**"]
  filename       = "blog-final/frontend/cloudbuild.yml"
  substitutions = {
    _REGION                         = var.region
    _SERVICE_ACCOUNT                = var.cloud_run_service_account
    _ARTIFACT_REPOSITORY_IMAGE_NAME = "${var.region}-docker.pkg.dev/${var.gcp_project_id}/${var.frontend_app_name}/blog-frontend"
  }
}

resource "google_cloudbuild_trigger" "deploy-training-contents" {
  name        = "deploy-training-contents"
  description = "mainブランチに追従してブログソースをCloudStorageへデプロイする"
  github {
    owner = var.github_owner
    name  = var.github_contents_repo_name
    push {
      branch = "^main$"
    }
  }
  included_files = ["blog-markdown-samples/**"]
  filename       = "cloudbuild.yml"
  substitutions = {
    _REGION              = var.region
    _IFTTT_URL           = var.ifttt_url
    _CONTENTS_BUCKET_URL = var.contents_bucket_url
  }
}
