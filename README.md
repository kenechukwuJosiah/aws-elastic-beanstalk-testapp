# Deploy Nodelyapp to AWS Elastic Beanstalk

This repository demonstrates deploying a Node.js application to AWS Elastic Beanstalk using GitHub Actions for CI/CD.

---

## Features

- **Node.js Application:** Backend logic built with Node.js.
- **AWS Elastic Beanstalk Hosting:** Leverages Elastic Beanstalk for scalable deployment.
- **GitHub Actions CI/CD Workflow:** Automates build and deployment processes upon pushing to the `main` branch.

---

## Prerequisites

1. **AWS Elastic Beanstalk Setup:**
   - Create an Elastic Beanstalk environment for your Node.js application.
   - Note the `Application Name`, `Environment Name`, and `Region`.

2. **AWS Access Keys:**
   - Generate an AWS access key and secret key from the AWS Management Console.

3. **GitHub Secrets:**
   - Add the following secrets to your GitHub repository:
     - `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
     - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.

---

## Workflow File

The repository contains a GitHub Actions workflow defined in `.github/workflows/deploy.yml`:

```yaml
name: Deploy Nodelyapp to Elastic Beanstalk
on:
  workflow_dispatch:
  push:
    branches:
      - main

jobs:
  Build_And_Deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Echo build number
        run: echo $GITHUB_RUN_NUMBER

      - name: Checkout source code
        uses: actions/checkout@v2

      - name: Generate deployment package
        run: zip -r deploy.zip . -x '*.git*'

      - name: Deploy to EB
        uses: einaregilsson/beanstalk-deploy@v21
        with:
          aws_access_key: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws_secret_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          application_name: appxy
          environment_name: Appxy-env
          version_label: ${{ github.run_number }}
          region: us-east-1
          deployment_package: deploy.zip
