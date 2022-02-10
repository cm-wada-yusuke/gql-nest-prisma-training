variable "target_region" {
  description = "デプロイするリージョン"
  type        = string
  default     = "us-central1"
}

# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_database
resource "google_sql_database_instance" "blog-training-db" {
  name                = "blog-training-db"
  database_version    = "POSTGRES_14"
  region              = var.target_region
  deletion_protection = false # 検証で作成するため、あとで消したい

  settings {
    tier              = "db-f1-micro"
    availability_type = "ZONAL"
    disk_size         = "20"
    disk_type         = "PD_SSD"

    ip_configuration {
      ipv4_enabled = "true"
    }
  }
}

resource "google_sql_database" "blog-training-db" {
  name     = "blog_training_db"
  instance = google_sql_database_instance.blog-training-db.name
}

# ref: https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_database_instance#attributes-reference
output "blog_training_db_connection_name" {
  value = google_sql_database_instance.blog-training-db.connection_name
}