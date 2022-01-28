variable "target_region" {
  description = "デプロイするリージョン"
  type        = string
  default     = "us-central1"
}

# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_database
resource "google_sql_database_instance" "prisma-migrate" {
  name                = "prisma-migrate"
  database_version    = "POSTGRES_14"
  region              = var.target_region
  deletion_protection = true # 検証で作成するため、あとで消したい

  settings {
    tier              = "db-f1-micro"
    availability_type = "REGIONAL"
    disk_size         = "20"
    disk_type         = "PD_SSD"

    ip_configuration {
      ipv4_enabled = "true"
    }
  }
}

resource "google_sql_database" "google-cloud-prisma-migrate-db" {
  name     = "google_cloud_prisma_migrate_db"
  instance = google_sql_database_instance.prisma-migrate.name
}

# ref: https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_database_instance#attributes-reference
output "prisma_migrate_connection_name" {
  value = google_sql_database_instance.prisma-migrate.connection_name
}