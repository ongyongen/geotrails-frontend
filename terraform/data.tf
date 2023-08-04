# S3 bucket IAM policy 
data "aws_iam_policy_document" "geotrails_frontend_iam_policy" {
  statement {
    
    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.geotrails_frontend_oai.iam_arn]
    }

    actions = [
      "s3:GetObject",
      "s3:ListBucket",
      "s3:PutObject",
      "s3:DeleteObject",
      "s3:PutBucketPolicy",
      "s3:PutBucketPublicAccessBlock",
      "s3:GetBucketAcl",
      "s3:PutBucketAcl"
    ]
    
    resources = [
      aws_s3_bucket.geotrails_frontend.arn,
      "${aws_s3_bucket.geotrails_frontend.arn}/*",
    ]
  }
}