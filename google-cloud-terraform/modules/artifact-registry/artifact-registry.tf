variable "gcp_project_id" {}
variable "artifact_registry_location" {
  type = string
  # https://cloud.google.com/storage/docs/locations
  description = "Artifact Registry のロケーションをどこにするか"
}

# バックエンドアプリケーション用の Artifact Registry リポジトリ
resource "google_artifact_registry_repository" "backend-app" {
  provider = google-beta

  project       = var.gcp_project_id
  location      = var.artifact_registry_location
  repository_id = "backend-app"
  description   = "バックエンドアプリケーション"
  format        = "DOCKER"
}
