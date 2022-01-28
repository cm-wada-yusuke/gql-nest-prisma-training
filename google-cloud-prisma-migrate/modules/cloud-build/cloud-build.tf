variable "github_owner" {}
variable "github_app_repo_name" {}
variable "region" {}
variable "gcp_project_id" {}
variable "app_name" {}
variable "cloudsql_instance_full_name" {}

resource "google_cloudbuild_trigger" "deploy-migrate" {
  name        = "deploy-migrate"
  description = "prisma deployを実行する"
  github {
    owner = var.github_owner
    name  = var.github_app_repo_name
    push {
      branch = "^main$"
    }
  }
  included_files = ["google-cloud-prisma-training/**"]
  filename       = "google-cloud-prisma-training/cloudbuild.yml"
  substitutions = {
    _CLOUDSQL_INSTANCE_FULL_NAME    = var.cloudsql_instance_full_name
    _ARTIFACT_REPOSITORY_IMAGE_NAME = "${var.region}-docker.pkg.dev/${var.gcp_project_id}/backend/${var.app_name}"
  }
}
