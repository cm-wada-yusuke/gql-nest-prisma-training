terraform {
  required_version = "~> 1.0.0"
  backend "gcs" {
    prefix = "tfstate/blog-training-app"
  }
}

## project ##
provider "google" {
  project = var.gcp_project_id
  region  = var.primary_region
}

locals {
  backend_app_name  = "blog-training-backend-app"
  frontend_app_name = "blog-training-frontend-app"
}

# Cloud Run のデプロイで利用するArtifact Registry のリポジトリ
module "artifact-registry" {
  source                     = "./modules/artifact-registry"
  gcp_project_id             = var.gcp_project_id
  artifact_registry_location = var.primary_region
  backend_app_name           = local.backend_app_name
  frontend_app_name          = local.frontend_app_name
}

# Cloud Run Service Account
module "cloud-run" {
  source         = "./modules/cloud-run"
  gcp_project_id = var.gcp_project_id
}

## Cloud Storage ##
module "cloud-storage" {
  source         = "./modules/cloud-storage"
  gcp_project_id = var.gcp_project_id
}

# Cloud SQL
module "cloud-sql" {
  source        = "./modules/cloud-sql"
  target_region = var.primary_region
}

# Cloud Build
# マイグレーション＋バックエンドデプロイ
# フロントエンドデプロイ
module "cloud-build" {
  source                      = "./modules/cloud-build"
  gcp_project_id              = var.gcp_project_id
  region                      = var.primary_region
  cloud_run_service_account   = module.cloud-run.blog_training_app_runner_service_account
  cloudsql_instance_full_name = module.cloud-sql.blog_training_db_connection_name
  backend_app_name            = local.backend_app_name
  frontend_app_name           = local.frontend_app_name
  github_owner                = "cm-wada-yusuke"
  github_app_repo_name        = "gql-nest-prisma-training"
  github_contents_repo_name   = "gql-nest-prisma-training"
  contents_bucket_name        = module.cloud-storage.contents_bucket_name
  contents_bucket_url         = module.cloud-storage.contents_bucket_url
  ifttt_url                   = var.ifttt_url
}
