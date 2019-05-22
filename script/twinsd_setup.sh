#!/bin/bash
# Download latest node and install.
dogeclink=`curl -s https://api.github.com/repos/NewCapital/TWINS-Core/releases/latest | grep browser_download_url | grep TWINS-Core.zip | cut -d '"' -f 4`
mkdir -p /tmp/TWINS-Core
cd /tmp/TWINS-Core
curl -Lo TWINS-Core.zip $dogeclink
apt install zip unzip

unzip TWINS-Core.zip
cd TWINS-Core

sudo mv .* /usr/local/bin
cd
rm -rf /tmp/TWINS-Core
mkdir ~/.TWINS-Core

# Setup configuration for node.
rpcuser=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 13 ; echo '')
rpcpassword=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32 ; echo '')
cat >~/.NewCapital/TWINS-Core.conf <<EOL
rpcuser=$rpcuser
rpcpassword=$rpcpassword
daemon=1
txindex=1
EOL

# Start node.
twinsd
