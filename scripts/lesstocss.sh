for lessfile in $(find './src/' -name "*.less");
do
  cssfile=$(echo $lessfile | sed 's/\.less$/.css/i')
  echo "Comiling $lessfile to $cssfile";
  rm -f $cssfile;
  lessc $lessfile > $cssfile;
done;