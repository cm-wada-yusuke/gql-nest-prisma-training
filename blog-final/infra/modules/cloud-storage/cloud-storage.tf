variable "gcp_project_id" {}

resource "google_storage_bucket" "contents" {
  name          = "${var.gcp_project_id}-training-contents"
  uniform_bucket_level_access = true
  location      = "US"
  force_destroy = true
  storage_class = "STANDARD"
}

resource "google_storage_bucket_iam_binding" "viewer" {
  bucket = "${google_storage_bucket.contents.name}"
    role = "roles/storage.objectViewer"
    members = [
        "allUsers",
    ] 
}

output "contents_bucket_name" {
  value = google_storage_bucket.contents.name
}
output "contents_bucket_url" {
  value = google_storage_bucket.contents.url
}
