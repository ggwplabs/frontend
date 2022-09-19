set -e
case $1 in
-master)
  echo "Pull and build mater"
  git switch master
  git pull
  npm i
  npm run build
  sudo cp -r ./build/* /var/www/ggwp/
  ;;
-devnet)
  echo "Pull and build devnet"
  git switch devnet
  git pull
  npm i
  npm run build
  sudo cp -r ./build/* /var/www/ggwp/
  ;;
*) echo "Branch must have been choose. Now there are two branches: master and devnet" ;;
esac