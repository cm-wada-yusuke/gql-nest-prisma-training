terraform {
  required_version = "~> 1.0.0"
  backend "gcs" {
    prefix = "tfstate/google-cloud-prisma-migrate"
  }
}

variable "primary_region" {}
variable "gcp_project_id" {}

## project ##
provider "google" {
  project = var.gcp_project_id
  region  = var.primary_region
}

# イメージを保存する Artifact Registry のリポジトリ
module "artifact-registry" {
  source                     = "./modules/artifact-registry"
  gcp_project_id             = var.gcp_project_id
  artifact_registry_location = var.primary_region
}

# Cloud SQL
module "cloud-sql" {
  source        = "./modules/cloud-sql"
  target_region = var.primary_region
}

# マイグレーションを実行する Cloud Build
module "cloud-build" {
  source                      = "./modules/cloud-build"
  gcp_project_id              = var.gcp_project_id
  region                      = var.primary_region
  cloudsql_instance_full_name = module.cloud-sql.prisma_migrate_connection_name
  app_name                    = "google-cloud-prisma-migrte"
  github_owner                = "cm-wada-yusuke"
  github_app_repo_name        = "gql-nest-prisma-training"
}
