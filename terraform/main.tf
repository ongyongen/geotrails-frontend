# Create an S3 bucket
resource "aws_s3_bucket" "geotrails_frontend" {
  bucket = "geotrails-frontend"
}

# Configure S3 bucket to allow allow access via cloudfront
resource "aws_s3_bucket_public_access_block" "geotrails_frontend" {
  bucket = aws_s3_bucket.geotrails_frontend.id

  block_public_acls = true
  block_public_policy = true
  ignore_public_acls = true
  restrict_public_buckets = false
}

# Configure ownership control for S3 bucket
resource "aws_s3_bucket_ownership_controls" "geotrails_frontend_ownership_control" {
  bucket = aws_s3_bucket.geotrails_frontend.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# Configure S3 bucket IAM policy 
resource "aws_s3_bucket_policy" "geotrails_frontend_iam_policy" {
  bucket = aws_s3_bucket.geotrails_frontend.id
  policy = data.aws_iam_policy_document.geotrails_frontend_iam_policy.json
}

# Configure S3 buckets default and error routes 
resource "aws_s3_bucket_website_configuration" "geotrails_frontend_config" {
  bucket = aws_s3_bucket.geotrails_frontend.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# Configure S3 bucket CORS 
resource "aws_s3_bucket_cors_configuration" "geotrails_frontend" {
  bucket = aws_s3_bucket.geotrails_frontend.bucket

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "HEAD"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }
}

# Create a cloudfront distribution for S3 bucket using Origin Access Identity (OAI) for origin access control
resource "aws_cloudfront_origin_access_identity" "geotrails_frontend_oai" {
  comment = "Geotrails Frontend Origin Access Identity"
}

resource "aws_cloudfront_distribution" "geotrails_frontend_distribution" {
  origin {
    domain_name = aws_s3_bucket.geotrails_frontend.bucket_regional_domain_name
    origin_id   = "my_s3_origin"
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.geotrails_frontend_oai.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "my_s3_origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
  }

  default_root_object = "index.html"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true  
    ssl_support_method  = "sni-only"
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code = 403
    response_code = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code = 404
    response_code = 200
    response_page_path = "/index.html"
  }

  enabled = true

}