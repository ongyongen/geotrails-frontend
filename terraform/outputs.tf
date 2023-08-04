output "app_url" {
  value = aws_cloudfront_distribution.geotrails_frontend_distribution.domain_name
}
