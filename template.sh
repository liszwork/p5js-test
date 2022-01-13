#!/bin/bash

if [ "$1" == "" ]; then
    echo bad argment: enter Mini Project Name
    exit
fi

# mini project link add to index.html
sed -i "s/    <\/ul>/        <li><a href=\".\/$1\/$1.html\">$1<\/a><\/li>\n    <\/ul>/" index.html

# create template to new mini project
cp -rp ./template/ $1
cd $1
sed -i "s/@template@/$1/g" template.html
mv template.html $1.html
mv template.js $1.js

