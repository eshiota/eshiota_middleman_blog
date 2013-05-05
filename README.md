# oslobabygear.com

## Deployment process

First, be sure to have your production credentials for AWS available
on your environment, either using [awsenv](https://github.com/mv/awsenv)
or exporting then by yourself.

```
export AWS_ACCESS_KEY_ID=<your access key>
export AWS_SECRET_ACCESS_KEY=<your secret key>
```

Then, build a fresh version of the website with `middleman build`
(so you won't upload an outdated version of the website) and upload
the build output with `middleman sync`.

```
# Build the static site into `./build`.
middleman build
# Upload everything in `./build` to S3.
middleman sync
```
