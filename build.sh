# Generates a .zip bundle ready to be setup as a AWS Lambda function
mkdir build
cp ./src/* build

mkdir build/node_modules
cp -r ./node_modules build

cd build
zip -r ../alexa-madrid-emt.zip *
